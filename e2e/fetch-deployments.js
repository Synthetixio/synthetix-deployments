#!/usr/bin/env node

require('./inspect');

const os = require('os');
const path = require('path');
const fs = require('fs/promises');
const { ethers } = require('ethers');
const { CliLoader } = require('@usecannon/cli/dist/src/loader');
const CANNON_DIRECTORY = path.join(os.homedir(), '.local', 'share', 'cannon');

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgYellow = '\x1b[33m';
const fgCyan = '\x1b[36m';

const [buildLog] = process.argv.slice(2);
if (!buildLog) {
  console.error(`${fgRed}ERROR: Expected 1 argument${fgReset}`);
  console.error(`Usage: ${fgGreen}node e2e/fetch-deployments.js ${fgCyan}buildLog${fgReset}`);
  console.error(
    `Example: ${fgGreen}node e2e/fetch-deployments.js ${fgCyan}e2e/cannon-build.log${fgReset}`
  );
  process.exit(1);
}

function readableAbi(abi) {
  return new ethers.utils.Interface(abi).format(ethers.utils.FormatTypes.full);
}

async function run() {
  console.log('Resolving Deployment Data URL from log', { buildLog });
  const log = await fs.readFile(buildLog, 'utf8');

  const [, url] = log.match(/Deployment Data\s*│\s*(ipfs:\/\/Qm\S+)/im) || [];
  console.log(`Resolved URL:`, { url });

  const hash = CliLoader.getCacheHash(url);
  console.log(`Resolved FileName hash:`, { hash });

  const deploymentsFile = `${CANNON_DIRECTORY}/ipfs_cache/${CliLoader.getCacheHash(url)}.json`;
  console.log(`Deployments state file:`, { file: deploymentsFile.replace(os.homedir(), '~') });
  const deployments = JSON.parse(await fs.readFile(deploymentsFile, 'utf8'));

  await fs.mkdir(`${__dirname}/deployments`, { recursive: true });

  const meta = {
    chainId: deployments.chainId,
    name: deployments.def.name,
    version: deployments.def.version,
    generator: deployments.generator,
    timestamp: deployments.timestamp,
    miscUrl: deployments.miscUrl,
  };
  const extras = {};
  console.log('Generating deployments info for', meta);

  const system = deployments.state['provision.system'].artifacts.imports.system;
  const contracts = {};

  contracts.CoreProxy = system.contracts.CoreProxy;
  contracts.AccountProxy = system.contracts.AccountProxy;
  contracts.USDProxy = system.contracts.USDProxy;
  contracts.OracleManagerProxy = system.imports.oracle_manager.contracts.Proxy;

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

  function mintableToken(provisionStep) {
    const fakeCollateral =
      deployments?.state?.[`provision.${provisionStep}`]?.artifacts?.imports?.[provisionStep];
    if (fakeCollateral) {
      const [, ticker] = fakeCollateral.contracts.MintableToken.constructorArgs;
      contracts[`FakeCollateral${ticker}`] = fakeCollateral.contracts.MintableToken;
    }
  }
  mintableToken('usdc_mock_collateral');
  mintableToken('mintableToken');

  // Extract all extras
  Object.values(deployments?.state).forEach((step) =>
    Object.assign(extras, step?.artifacts?.extras)
  );

  // Extract all oracle addresses
  const oracles = {};
  function oracleNode(invokeStep) {
    const oracleNodeArgs =
      deployments?.state?.[`invoke.${invokeStep}`]?.artifacts?.txns?.[invokeStep]?.events
        ?.NodeRegistered?.[0]?.args;
    console.log(`oracleNodeArgs`, oracleNodeArgs?.length, oracleNodeArgs);
    if (oracleNodeArgs?.length === 4) {
      const [id, nodeType, data] = oracleNodeArgs;
      const [address, feedId, staleness] = ethers.utils.defaultAbiCoder.decode(
        ['address', 'bytes32', 'uint256'],
        data
      );
      oracles[invokeStep] = {
        id,
        address,
        nodeType: parseInt(nodeType.toString()),
        feedId,
        staleness: parseInt(staleness.toString()),
      };
    }
  }
  oracleNode('registerBtcOracleNode');
  oracleNode('registerEthOracleNode');
  oracleNode('registerLtcOracleNode');
  oracleNode('registerXrpOracleNode');

  Object.assign(meta, {
    contracts: Object.fromEntries(
      Object.entries(contracts).map(([name, { address }]) => [name, address])
    ),
  });

  contracts.AllErrors = {
    address: ethers.constants.AddressZero,
    abi: Object.values(contracts).flatMap(({ abi }) => abi.filter((item) => item.type === 'error')),
  };

  console.log('Writing', `deployments/meta.json`);
  await fs.writeFile(`${__dirname}/deployments/meta.json`, JSON.stringify(meta, null, 2));

  console.log('Writing', `deployments/oracles.json`);
  await fs.writeFile(`${__dirname}/deployments/oracles.json`, JSON.stringify(oracles, null, 2));

  console.log('Writing', `deployments/extras.json`);
  await fs.writeFile(`${__dirname}/deployments/extras.json`, JSON.stringify(extras, null, 2));

  for (const [name, { address, abi }] of Object.entries(contracts)) {
    console.log('Writing', `deployments/${name}.json`, { address });
    await fs.writeFile(
      `${__dirname}/deployments/${name}.json`,
      JSON.stringify({ address, abi: readableAbi(abi) }, null, 2)
    );
  }
}

run();
