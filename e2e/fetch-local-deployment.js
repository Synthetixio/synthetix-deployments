#!/usr/bin/env node

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
  console.error(`Usage: ${fgGreen}node e2e/fetch-local-deployment.js ${fgCyan}buildLog${fgReset}`);
  console.error(
    `Example: ${fgGreen}node e2e/fetch-local-deployment.js ${fgCyan}e2e/cannon-build.log${fgReset}`
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

  const deployments = JSON.parse(
    await fs.readFile(`${CANNON_DIRECTORY}/ipfs_cache/${CliLoader.getCacheHash(url)}.json`, 'utf8')
  );

  await fs.mkdir(`${__dirname}/deployments`, { recursive: true });

  const meta = {
    chainId: deployments.chainId,
    name: deployments.def.name,
    version: deployments.def.version,
    generator: deployments.generator,
    timestamp: deployments.timestamp,
    miscUrl: deployments.miscUrl,
  };
  console.log('Generating deployments info for', meta);

  const system = deployments.state['provision.system'].artifacts.imports.system;
  console.log('Writing', 'deployments/CoreProxy.json', {
    address: system.contracts.CoreProxy.address,
  });
  await fs.writeFile(
    `${__dirname}/deployments/CoreProxy.json`,
    JSON.stringify(
      {
        ...meta,
        address: system.contracts.CoreProxy.address,
        abi: readableAbi(system.contracts.CoreProxy.abi),
      },
      null,
      2
    )
  );

  async function mintableToken(provisionStep) {
    const fakeCollateral =
      deployments?.state?.[`provision.${provisionStep}`]?.artifacts?.imports?.[provisionStep];
    if (fakeCollateral) {
      const [, ticker] = fakeCollateral.contracts.MintableToken.constructorArgs;
      console.log('Writing', `deployments/FakeCollateral${ticker}.json`, {
        address: fakeCollateral.contracts.MintableToken.address,
      });
      await fs.writeFile(
        `${__dirname}/deployments/FakeCollateral${ticker}.json`,
        JSON.stringify(
          {
            ...meta,
            address: fakeCollateral.contracts.MintableToken.address,
            abi: readableAbi(fakeCollateral.contracts.MintableToken.abi),
          },
          null,
          2
        )
      );
    }
  }
  await mintableToken('usdc_mock_collateral');
  await mintableToken('mintableToken');
}

run();
