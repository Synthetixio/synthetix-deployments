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
  const rewardsDistributors = [];
  const rewardsDistributorsContracts = {};
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
        const [rewardManager, poolId, collateralTypeAddress, payoutTokenAddress, name] =
          rewardsDistributor.constructorArgs;

        const collateralType = await fetchTokenInfo(collateralTypeAddress);
        const payoutToken = await fetchTokenInfo(payoutTokenAddress);

        rewardsDistributorsContracts[
          `RewardsDistributor_${poolId}_${collateralType.symbol}_${payoutToken.symbol}`
        ] = rewardsDistributor;

        rewardsDistributors.push({
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
        for (const rewardDistributor of rewardsDistributors) {
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
  return { rewardsDistributors, rewardsDistributorsContracts };
}

async function extractSynths(deployments) {
  const synths = [];
  const synthsContracts = {};
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.SynthRegistered;
      if (events && events.length === 1) {
        // can only have one SynthRegistered event
        log({ SynthRegistered: events[0] });
        const [synthMarketId, address] = events[0].args;
        const token = await fetchTokenInfo(address);
        synths.push({ synthMarketId, ...token });
        synthsContracts[`SynthToken_${token.symbol}`] = {
          address,
          abi: require('./SynthTokenModule.json'),
        };
      }
    }
  }
  return { synths, synthsContracts };
}

async function extractMintableTokens(deployments) {
  const mintableTokens = [];
  const mintableTokensContracts = {};
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
        mintableTokensContracts[`MintableToken_${token.symbol}`] = mintableToken;
        mintableTokens.push(token);
      }
    }
  }

  return {
    mintableTokens,
    mintableTokensContracts,
  };
}

async function run() {
  const deployments = require(path.resolve(cannonState));

  await fs.rm(`${__dirname}/deployments`, { recursive: true, force: true });
  await fs.mkdir(`${__dirname}/deployments`, { recursive: true });
  await fs.mkdir(`${__dirname}/deployments/abi`, { recursive: true });

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

  const { mintableTokens, mintableTokensContracts } = await extractMintableTokens(deployments);
  log('Writing', `deployments/mintableTokens.json`);
  await fs.writeFile(
    `${__dirname}/deployments/mintableTokens.json`,
    JSON.stringify(mintableTokens, null, 2)
  );
  Object.assign(contracts, mintableTokensContracts);

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

  const { synths, synthsContracts } = await extractSynths(deployments);
  log('Writing', `deployments/synthTokens.json`);
  await fs.writeFile(`${__dirname}/deployments/synthTokens.json`, JSON.stringify(synths, null, 2));
  Object.assign(contracts, synthsContracts);

  Object.assign(meta, {
    contracts: Object.fromEntries(
      Object.entries(contracts).map(([name, { address }]) => [name, address])
    ),
  });

  contracts.AllErrors = {
    address: ethers.constants.AddressZero,
    abi: Array.from(
      new Set(
        Object.values(contracts)
          .flatMap(({ abi }) => abi.filter((item) => item.type === 'error'))
          .map((item) => JSON.stringify(item))
      )
    ).map((item) => JSON.parse(item)),
  };

  const { rewardsDistributors, rewardsDistributorsContracts } =
    await extractRewardsDistributors(deployments);
  log('Writing', `deployments/rewardsDistributors.json`);
  await fs.writeFile(
    `${__dirname}/deployments/rewardsDistributors.json`,
    JSON.stringify(rewardsDistributors, null, 2)
  );
  Object.assign(contracts, rewardsDistributorsContracts);

  log('Writing', `deployments/meta.json`);
  await fs.writeFile(`${__dirname}/deployments/meta.json`, JSON.stringify(meta, null, 2));

  log('Writing', `deployments/extras.json`);
  await fs.writeFile(`${__dirname}/deployments/extras.json`, JSON.stringify(extras, null, 2));

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

  for (const [name, { address, abi }] of Object.entries(contracts)) {
    log('Writing', `deployments/${name}.json`, { address });
    await fs.writeFile(
      `${__dirname}/deployments/${name}.json`,
      JSON.stringify({ address, abi: readableAbi(abi) }, null, 2)
    );
  }

  for (const [name, { abi }] of Object.entries(contracts)) {
    log('Writing', `deployments/abi/${name}.json`);
    await fs.writeFile(
      `${__dirname}/deployments/abi/${name}.json`,
      JSON.stringify(jsonAbi(abi), null, 2)
    );
    log('Writing', `deployments/abi/${name}.readable.json`);
    await fs.writeFile(
      `${__dirname}/deployments/abi/${name}.readable.json`,
      JSON.stringify(readableAbi(abi), null, 2)
    );
  }
}

run();
