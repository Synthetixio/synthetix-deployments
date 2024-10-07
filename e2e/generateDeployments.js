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

async function fetchOracleInfo({ nodeId, OracleManagerProxy }) {
  if (!fetchOracleInfo.cache) {
    fetchOracleInfo.cache = {};
  }
  if (!fetchOracleInfo.cache[nodeId]) {
    const oracle = {};
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_URL || 'http://127.0.0.1:8545'
    );
    const OracleContract = new ethers.Contract(
      OracleManagerProxy.address,
      OracleManagerProxy.abi,
      provider
    );
    const oracleInfo = await OracleContract.getNode(nodeId);
    if (oracleInfo.nodeType === 8) {
      [oracle.constPrice] = ethers.utils.defaultAbiCoder.decode(['uint256'], oracleInfo.parameters);
      oracle.constPrice = `${oracle.constPrice}`;
    }
    if (oracleInfo.nodeType === 2) {
      [oracle.externalContract] = ethers.utils.defaultAbiCoder.decode(
        ['address'],
        oracleInfo.parameters
      );
    }
    if (oracleInfo.nodeType === 7 && oracleInfo.parents?.[0]) {
      // staleness circuit breaker
      [oracle.stalenessTolerance] = ethers.utils.defaultAbiCoder.decode(
        ['uint256'],
        oracleInfo.parameters
      );
      oracle.stalenessTolerance = `${oracle.stalenessTolerance}`;
      for (const parentOracleId of oracleInfo.parents) {
        const parentOracleInfo = await OracleContract.getNode(parentOracleId).catch(() => {});
        if (parentOracleInfo && parentOracleInfo.nodeType === 5) {
          // pyth aggregator type
          [_, oracle.pythFeedId] = ethers.utils.defaultAbiCoder.decode(
            ['address', 'bytes32', 'bool'],
            parentOracleInfo.parameters
          );
          break;
        }
      }
    }
    fetchOracleInfo.cache[nodeId] = oracle;
  }
  return fetchOracleInfo.cache[nodeId];
}

async function extractRewardsDistributors(deployments) {
  const items = [];
  const contracts = {};
  const duplicates = {};
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('provision.')) {
      const [, artifactName] = key.split('.');
      const rewardsDistributor =
        value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributor ||
        // RewardsDistributorExternal is a wrapper over RewardsDistributor with identical functionality
        value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributorExternal;
      if (rewardsDistributor) {
        log({
          RewardsDistributor: {
            address: rewardsDistributor.address,
            constructorArgs: rewardsDistributor.constructorArgs,
            deployTxnHash: rewardsDistributor.deployTxnHash,
          },
        });

        let rewardManager;
        let poolId;
        let collateralTypeAddress;
        let payoutTokenAddress;
        let _payoutTokenDecimals;
        let name;
        let authorisedDistributor;
        if (
          value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributor &&
          rewardsDistributor.constructorArgs.length === 6
        ) {
          [
            //
            rewardManager,
            poolId,
            collateralTypeAddress,
            payoutTokenAddress,
            _payoutTokenDecimals,
            name,
          ] = rewardsDistributor.constructorArgs;
        }

        if (
          value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributor &&
          rewardsDistributor.constructorArgs.length === 5
        ) {
          [
            // new version has 5 arguments, without collateralTypeAddress
            rewardManager,
            poolId,
            payoutTokenAddress,
            _payoutTokenDecimals,
            name,
          ] = rewardsDistributor.constructorArgs;
        }

        if (
          value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributorExternal &&
          rewardsDistributor.constructorArgs.length === 7
        ) {
          [
            rewardManager,
            poolId,
            collateralTypeAddress,
            payoutTokenAddress,
            _payoutTokenDecimals,
            name,
            authorisedDistributor,
          ] = rewardsDistributor.constructorArgs;
        }

        if (
          value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributorExternal &&
          rewardsDistributor.constructorArgs.length === 6
        ) {
          [
            // new version has 6 arguments, without collateralTypeAddress
            rewardManager,
            poolId,
            payoutTokenAddress,
            _payoutTokenDecimals,
            name,
            authorisedDistributor,
          ] = rewardsDistributor.constructorArgs;
        }

        const collateralType = collateralTypeAddress
          ? await fetchTokenInfo(collateralTypeAddress)
          : undefined;
        const payoutToken = await fetchTokenInfo(payoutTokenAddress);

        const contractName = collateralTypeAddress
          ? `RewardsDistributor_${poolId}_${collateralType.symbol}_${payoutToken.symbol}`
          : `RewardsDistributor_${poolId}_${payoutToken.symbol}`;
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

  // walk over all the setWrapper invokes and find wrapped token info for each synth
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.WrapperSet;
      if (events && events.length === 1) {
        // can only have one RewardsDistributorRegistered event
        log({ WrapperSet: events[0] });
        const [synthMarketId, wrapCollateralType, maxWrappableAmount] = events[0].args;
        for (const synth of items) {
          if (`${synth.synthMarketId}` === `${synthMarketId}`) {
            synth.token = await fetchTokenInfo(wrapCollateralType);
            synth.maxWrappableAmount = maxWrappableAmount;
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

async function extractPythFeeds(deployments) {
  const items = [];
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.NodeRegistered;
      if (events && events.length === 1) {
        // can only have one NodeRegistered event
        log({ NodeRegistered: events[0] });
        const [_oracleNodeId, nodeType, parameters] = events[0].args;
        if (nodeType === 5) {
          // pyth aggregator type
          const [_priceVerificationAddress, feedId] = ethers.utils.defaultAbiCoder.decode(
            ['address', 'bytes32', 'bool'],
            parameters
          );
          items.push(feedId);
        }
      }
    }
  }

  return items;
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
  log('Generating deployments info for', meta);
  const extras = {};
  const contracts = {};

  const system = deployments?.state?.['provision.system']?.artifacts?.imports?.system;
  if (system) {
    contracts.CoreProxy = system.contracts.CoreProxy;
    contracts.AccountProxy = system.contracts.AccountProxy;
    contracts.USDProxy = system.contracts.USDProxy;
    contracts.OracleManagerProxy = system.imports.oracle_manager.contracts.Proxy;
  }

  const legacyMarket =
    deployments?.state?.['provision.legacyMarket']?.artifacts?.imports?.legacyMarket;
  if (legacyMarket) {
    contracts.LegacyMarketProxy = legacyMarket.contracts.Proxy;
    contracts.V2x = legacyMarket.imports.v2x.contracts.Synthetix;
    contracts.V2xUsd = legacyMarket.imports.v2x.contracts.SynthsUSD;
    Object.assign(extras, {
      legacy_market_id: legacyMarket?.extras?.marketId,
    });
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
    Object.assign(extras, {
      perps_super_market_id: perpsFactory?.extras?.superMarketId,
    });
  }

  const bfp_market_factory =
    deployments?.state?.['provision.bfp_market_factory']?.artifacts?.imports?.bfp_market_factory;
  if (bfp_market_factory) {
    contracts.BfpMarketProxy = bfp_market_factory.contracts.BfpMarketProxy;
    contracts.BfpAccountProxy = bfp_market_factory.contracts.PerpAccountProxy;
    contracts.BfpRewardDistributor = bfp_market_factory.contracts.PerpRewardDistributor;
  }

  const pyth_erc7412_wrapper =
    deployments?.state?.['provision.pyth_erc7412_wrapper']?.artifacts?.imports
      ?.pyth_erc7412_wrapper;
  if (pyth_erc7412_wrapper) {
    contracts.PythERC7412Wrapper = pyth_erc7412_wrapper.contracts.PythERC7412Wrapper;
  }

  if (contracts.USDProxy) {
    const systemToken = await fetchTokenInfo(contracts.USDProxy.address);
    log('Writing', `deployments/systemToken.json`);
    await fs.writeFile(
      `${__dirname}/deployments/systemToken.json`,
      JSON.stringify(systemToken, null, 2)
    );
  }

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
  for (const collateralToken of collateralTokens) {
    collateralToken.oracle = await fetchOracleInfo({
      nodeId: collateralToken.oracleNodeId,
      OracleManagerProxy: contracts.OracleManagerProxy,
    });
  }
  log('Writing', `deployments/collateralTokens.json`);
  await fs.writeFile(
    `${__dirname}/deployments/collateralTokens.json`,
    JSON.stringify(collateralTokens, null, 2)
  );
  Object.assign(contracts, collateralTokenContracts);

  // Extract all Pyth Feeds
  const pythFeeds = await extractPythFeeds(deployments);
  await fs.writeFile(`${__dirname}/deployments/pythFeeds.json`, JSON.stringify(pythFeeds, null, 2));

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
