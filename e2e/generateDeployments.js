#!/usr/bin/env node

require('./inspect');

const path = require('path');
const fs = require('fs/promises');
const { ethers } = require('ethers');

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgCyan = '\x1b[36m';

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const [cannonState] = process.argv.slice(2);
if (!cannonState) {
  console.error(`${fgRed}ERROR: Expected 1 argument${fgReset}`);
  console.error(`Usage: ${fgGreen}node e2e/generateDeployments ${fgCyan}cannonState${fgReset}`);
  console.error(
    `Example: ${fgGreen}node e2e/generateDeployments ${fgCyan}/tmp/cannonState.json${fgReset}`
  );
  process.exit(1);
}

function readableAbi(abi) {
  return new ethers.utils.Interface(abi).format(ethers.utils.FormatTypes.full);
}

function jsonAbi(abi) {
  return JSON.parse(new ethers.utils.Interface(abi).format(ethers.utils.FormatTypes.json));
}

async function fetchTokenInfo(address) {
  if (!fetchTokenInfo.cache) {
    fetchTokenInfo.cache = {};
  }
  if (!fetchTokenInfo.cache[address]) {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_URL || 'http://127.0.0.1:8545'
    );
    const contract = new ethers.Contract(
      address,
      [
        'function symbol() view returns (string)',
        'function name() view returns (string)',
        'function decimals() view returns (uint8)',
      ],
      provider
    );
    const [symbol, name, decimals] = await Promise.all([
      contract.symbol(),
      contract.name(),
      contract.decimals(),
    ]);
    fetchTokenInfo.cache[address] = { address, symbol, name, decimals };
  }
  return fetchTokenInfo.cache[address];
}

async function extractRewardsDistributors(deployments) {
  const items = [];
  const contracts = {};
  const duplicates = {};
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('provision.')) {
      const [, artifactName] = key.split('.');
      const rewardsDistributor =
        value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributor;
      if (rewardsDistributor) {
        log({
          RewardsDistributor: {
            address: rewardsDistributor.address,
            constructorArgs: rewardsDistributor.constructorArgs,
            deployTxnHash: rewardsDistributor.deployTxnHash,
          },
        });
        const [
          rewardManager,
          poolId,
          collateralTypeAddress,
          payoutTokenAddress,
          _payoutTokenDecimals,
          name,
        ] = rewardsDistributor.constructorArgs;

        const collateralType = await fetchTokenInfo(collateralTypeAddress);
        const payoutToken = await fetchTokenInfo(payoutTokenAddress);

        const contractName = `RewardsDistributor_${poolId}_${collateralType.symbol}_${payoutToken.symbol}`;
        if (contractName in contracts) {
          duplicates[contractName] = contractName in duplicates ? duplicates[contractName] + 1 : 1;
          contracts[`${contractName}__${duplicates[contractName]}`] = rewardsDistributor;
        } else {
          contracts[`${contractName}`] = rewardsDistributor;
        }

        items.push({
          address: rewardsDistributor.address,
          name,
          poolId,
          collateralType,
          payoutToken,
          rewardManager,
          isRegistered: false,
        });
      }
    }
  }

  // walk over all the registration invokes and set isRegistered flag for deployed distributors
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.RewardsDistributorRegistered;
      if (events && events.length === 1) {
        // can only have one RewardsDistributorRegistered event
        log({ RewardsDistributorRegistered: events[0] });
        const [poolId, collateralType, address] = events[0].args;
        for (const rewardDistributor of items) {
          if (
            `${rewardDistributor.poolId}` === `${poolId}` &&
            `${rewardDistributor.collateralType.address}`.toLowerCase() ===
              `${collateralType}`.toLowerCase() &&
            `${rewardDistributor.address}`.toLowerCase() === `${address}`.toLowerCase()
          ) {
            rewardDistributor.isRegistered = true;
          }
        }
      }
    }
  }
  return {
    items,
    contracts,
  };
}

async function getSynth(deployments, { synthMarketId }) {
  const spotFactory =
    deployments?.state?.['provision.spotFactory']?.artifacts?.imports?.spotFactory;
  if (spotFactory) {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_URL || 'http://127.0.0.1:8545'
    );
    const SpotMarketProxy = new ethers.Contract(
      spotFactory.contracts.SpotMarketProxy.address,
      spotFactory.contracts.SpotMarketProxy.abi,
      provider
    );
    return await SpotMarketProxy.getSynth(synthMarketId);
  }
}

async function extractSynths(deployments) {
  const items = [];
  const contracts = {};
  const duplicates = {};
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.SynthRegistered;
      if (events && events.length === 1) {
        // can only have one SynthRegistered event
        log({ SynthRegistered: events[0] });
        let [synthMarketId, address] = events[0].args;
        if (!address) {
          // For old spot market we did not emit token address and need to get it dynamically
          // TODO: remove after optimism-mainnet upgraded
          address = await getSynth(deployments, { synthMarketId }).catch((e) => log(e));
        }
        if (address) {
          const token = await fetchTokenInfo(address);
          items.push({
            // TODO: cleanup BigNumber decode after optimism-mainnet upgraded
            synthMarketId: ethers.BigNumber.from(synthMarketId).toString(),
            ...token,
          });
          const contractName = `SynthToken_${token.symbol}`;
          if (contractName in contracts) {
            duplicates[contractName] =
              contractName in duplicates ? duplicates[contractName] + 1 : 1;
            contracts[`${contractName}__${duplicates[contractName]}`] = {
              address,
              abi: require('./SynthTokenModule.json'),
            };
          } else {
            contracts[`${contractName}`] = {
              address,
              abi: require('./SynthTokenModule.json'),
            };
          }
        }
      }
    }
  }
  return {
    items,
    contracts,
  };
}

async function extractMintableTokens(deployments) {
  const items = [];
  const contracts = {};
  const duplicates = {};
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('provision.')) {
      const [, artifactName] = key.split('.');
      const mintableToken = value?.artifacts?.imports?.[artifactName]?.contracts?.MintableToken;
      if (mintableToken) {
        log({
          MintableToken: {
            address: mintableToken.address,
            constructorArgs: mintableToken.constructorArgs,
            deployTxnHash: mintableToken.deployTxnHash,
          },
        });
        const token = await fetchTokenInfo(mintableToken.address);

        const contractName = `MintableToken_${token.symbol}`;
        if (contractName in contracts) {
          duplicates[contractName] = contractName in duplicates ? duplicates[contractName] + 1 : 1;
          contracts[`${contractName}__${duplicates[contractName]}`] = mintableToken;
        } else {
          contracts[`${contractName}`] = mintableToken;
        }

        items.push(token);
      }
    }
  }

  return {
    items,
    contracts,
  };
}

async function extractCollaterals(deployments) {
  const items = [];
  const contracts = {};
  const duplicates = {};
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.CollateralConfigured;
      if (events && events.length === 1) {
        // can only have one CollateralConfigured event
        log({ CollateralConfigured: events[0] });
        const [address, params] = events[0].args;
        const token = await fetchTokenInfo(address);

        let depositingEnabled,
          issuanceRatioD18,
          liquidationRatioD18,
          liquidationRewardD18,
          oracleNodeId,
          tokenAddress,
          minDelegationD18;
        if (Array.isArray(params)) {
          // TODO: cleanup after optimism-mainnet upgraded
          [
            depositingEnabled,
            issuanceRatioD18,
            liquidationRatioD18,
            liquidationRewardD18,
            oracleNodeId,
            tokenAddress,
            minDelegationD18,
          ] = params;
          issuanceRatioD18 = ethers.BigNumber.from(issuanceRatioD18).toString();
          liquidationRatioD18 = ethers.BigNumber.from(liquidationRatioD18).toString();
          liquidationRewardD18 = ethers.BigNumber.from(liquidationRewardD18).toString();
          minDelegationD18 = ethers.BigNumber.from(minDelegationD18).toString();
        } else {
          ({
            depositingEnabled,
            issuanceRatioD18,
            liquidationRatioD18,
            liquidationRewardD18,
            oracleNodeId,
            tokenAddress,
            minDelegationD18,
          } = params);
        }

        const contractName = `CollateralToken_${token.symbol}`;
        if (contractName in contracts) {
          duplicates[contractName] = contractName in duplicates ? duplicates[contractName] + 1 : 1;
          contracts[`${contractName}__${duplicates[contractName]}`] = {
            address,
            abi: require('./ERC20.json'),
          };
        } else {
          contracts[`${contractName}`] = {
            address,
            abi: require('./ERC20.json'),
          };
        }

        items.push({
          ...token,
          depositingEnabled,
          issuanceRatioD18,
          liquidationRatioD18,
          liquidationRewardD18,
          oracleNodeId,
          tokenAddress,
          minDelegationD18,
        });
      }
    }
  }
  return {
    items,
    contracts,
  };
}

async function run() {
  const deployments = require(path.resolve(cannonState));

  await fs.rm(`${__dirname}/deployments`, { recursive: true, force: true });
  await fs.mkdir(`${__dirname}/deployments`, { recursive: true });
  await fs.mkdir(`${__dirname}/deployments/abi`, { recursive: true });

  log('Writing', `deployments/cannon.json`);
  await fs.writeFile(
    `${__dirname}/deployments/cannon.json`,
    JSON.stringify(
      deployments,
      (key, value) => {
        if (key === 'abi' && Array.isArray(value)) {
          return readableAbi(value);
        }
        if (key === 'depends' && Array.isArray(value)) {
          return Array.from(new Set(value)).sort();
        }
        return value;
      },
      2
    )
  );

  const meta = {
    chainId: deployments.chainId,
    name: deployments.def.name,
    preset: deployments.def.preset ?? 'main',
    version: deployments.def.version,
    generator: deployments.generator,
    timestamp: deployments.timestamp,
    miscUrl: deployments.miscUrl,
  };
  const extras = {};
  log('Generating deployments info for', meta);

  const system = deployments.state['provision.system'].artifacts.imports.system;
  const contracts = {};
  contracts.CoreProxy = system.contracts.CoreProxy;
  contracts.AccountProxy = system.contracts.AccountProxy;
  contracts.USDProxy = system.contracts.USDProxy;
  contracts.OracleManagerProxy = system.imports.oracle_manager.contracts.Proxy;

  if (deployments.state['provision.legacyMarket']) {
    contracts.LegacyMarketProxy =
      deployments.state['provision.legacyMarket'].artifacts.imports.legacyMarket.contracts.Proxy;
    contracts.V2x =
      deployments.state[
        'provision.legacyMarket'
      ].artifacts.imports.legacyMarket.imports.v2x.contracts.Synthetix;

    contracts.V2xUsd =
      deployments.state[
        'provision.legacyMarket'
      ].artifacts.imports.legacyMarket.imports.v2x.contracts.SynthsUSD;
  }

  const trustedMulticallForwarder = system?.imports?.trusted_multicall_forwarder;
  if (trustedMulticallForwarder) {
    contracts.TrustedMulticallForwarder =
      trustedMulticallForwarder.contracts.TrustedMulticallForwarder;
  }

  const spotFactory =
    deployments?.state?.['provision.spotFactory']?.artifacts?.imports?.spotFactory;
  if (spotFactory) {
    contracts.SpotMarketProxy = spotFactory.contracts.SpotMarketProxy;
  }

  const perpsFactory =
    deployments?.state?.['provision.perpsFactory']?.artifacts?.imports?.perpsFactory;
  if (perpsFactory) {
    contracts.PerpsMarketProxy = perpsFactory.contracts.PerpsMarketProxy;
    contracts.PerpsAccountProxy =
      perpsFactory.contracts.PerpsAccountProxy ?? perpsFactory.contracts.AccountProxy;
  }

  const bfp_market_factory =
    deployments?.state?.['provision.bfp_market_factory']?.artifacts?.imports?.bfp_market_factory;
  if (bfp_market_factory) {
    contracts.BfpMarketProxy = bfp_market_factory.contracts.BfpMarketProxy;
    contracts.PerpAccountProxy = bfp_market_factory.contracts.PerpAccountProxy;
    contracts.PerpRewardDistributor = bfp_market_factory.contracts.PerpRewardDistributor;
  }

  const pyth_erc7412_wrapper =
    deployments?.state?.['provision.pyth_erc7412_wrapper']?.artifacts?.imports
      ?.pyth_erc7412_wrapper;
  if (pyth_erc7412_wrapper) {
    contracts.PythERC7412Wrapper = pyth_erc7412_wrapper.contracts.PythERC7412Wrapper;
  }

  const systemToken = await fetchTokenInfo(contracts.USDProxy.address);
  log('Writing', `deployments/systemToken.json`);
  await fs.writeFile(
    `${__dirname}/deployments/systemToken.json`,
    JSON.stringify(systemToken, null, 2)
  );

  const { items: mintableTokens, contracts: mintableTokenContracts } =
    await extractMintableTokens(deployments);
  log('Writing', `deployments/mintableTokens.json`);
  await fs.writeFile(
    `${__dirname}/deployments/mintableTokens.json`,
    JSON.stringify(mintableTokens, null, 2)
  );
  Object.assign(contracts, mintableTokenContracts);

  const { items: collateralTokens, contracts: collateralTokenContracts } =
    await extractCollaterals(deployments);
  log('Writing', `deployments/collateralTokens.json`);
  await fs.writeFile(
    `${__dirname}/deployments/collateralTokens.json`,
    JSON.stringify(collateralTokens, null, 2)
  );
  Object.assign(contracts, collateralTokenContracts);

  // Extract all extras
  Object.values(deployments?.state).forEach((step) => {
    Object.assign(extras, step?.artifacts?.settings);
    Object.assign(extras, step?.artifacts?.extras);
  });

  // Fixes for older deployments
  Object.assign(extras, {
    usdc_address: extras?.usdc_address ?? deployments?.def?.setting?.usdc_address?.defaultValue,
    snx_address: extras?.snx_address ?? deployments?.def?.setting?.snx_address?.defaultValue,
  });

  const { items: synthTokens, contracts: synthTokenContracts } = await extractSynths(deployments);
  log('Writing', `deployments/synthTokens.json`);
  await fs.writeFile(
    `${__dirname}/deployments/synthTokens.json`,
    JSON.stringify(synthTokens, null, 2)
  );
  Object.assign(contracts, synthTokenContracts);

  const { items: rewardsDistributors, contracts: rewardsDistributorContracts } =
    await extractRewardsDistributors(deployments);
  log('Writing', `deployments/rewardsDistributors.json`);
  await fs.writeFile(
    `${__dirname}/deployments/rewardsDistributors.json`,
    JSON.stringify(rewardsDistributors, null, 2)
  );
  Object.assign(contracts, rewardsDistributorContracts);

  Object.assign(meta, {
    contracts: Object.fromEntries(
      Object.entries(contracts).map(([name, { address }]) => [name, address])
    ),
  });

  contracts.AllErrors = {
    address: ethers.constants.AddressZero,
    abi: Object.values(contracts).flatMap(({ abi }) => abi.filter((item) => item.type === 'error')),
  };

  log('Writing', `deployments/meta.json`);
  await fs.writeFile(`${__dirname}/deployments/meta.json`, JSON.stringify(meta, null, 2));

  log('Writing', `deployments/extras.json`);
  await fs.writeFile(`${__dirname}/deployments/extras.json`, JSON.stringify(extras, null, 2));

  for (const [name, { address, abi }] of Object.entries(contracts)) {
    const dedupedAbi = Array.from(new Set(readableAbi(abi)));
    log('Writing', `deployments/${name}.json`, { address });
    await fs.writeFile(
      `${__dirname}/deployments/${name}.json`,
      JSON.stringify({ address, abi: dedupedAbi }, null, 2)
    );
    log('Writing', `deployments/abi/${name}.json`);
    await fs.writeFile(
      `${__dirname}/deployments/abi/${name}.json`,
      JSON.stringify(jsonAbi(dedupedAbi), null, 2)
    );
    log('Writing', `deployments/abi/${name}.readable.json`);
    await fs.writeFile(
      `${__dirname}/deployments/abi/${name}.readable.json`,
      JSON.stringify(dedupedAbi, null, 2)
    );
  }
}

run();
