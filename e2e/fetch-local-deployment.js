#!/usr/bin/env node

const os = require('os');
const path = require('path');
const fs = require('fs/promises');
const toml = require('@iarna/toml');
const { ethers } = require('ethers');
const { LocalRegistry } = require('@usecannon/cli/dist/src/registry');
const { CliLoader } = require('@usecannon/cli/dist/src/loader');
const CANNON_DIRECTORY = path.join(os.homedir(), '.local', 'share', 'cannon');

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgYellow = '\x1b[33m';
const fgCyan = '\x1b[36m';

const [chainId, deploymentFile] = process.argv.slice(2);
if (!chainId || !deploymentFile) {
  console.error(`${fgRed}ERROR: Expected 2 arguments${fgReset}`);
  console.error(
    `Usage: ${fgGreen}node e2e/fetch-local-deployment.js ${fgYellow}chainId ${fgCyan}deploymentFile${fgReset}`
  );
  console.error(
    `Example: ${fgGreen}node e2e/fetch-local-deployment.js ${fgYellow}84531 ${fgCyan}omnibus-base-goerli-andromeda.toml${fgReset}`
  );
  process.exit(1);
}

function readableAbi(abi) {
  return new ethers.utils.Interface(abi).format(ethers.utils.FormatTypes.full);
}

async function run() {
  const config = await fs.readFile(deploymentFile, 'utf8');
  const { name, version, setting } = toml.parse(config);
  const preset = setting?.target_preset?.defaultValue ?? 'main';

  console.log('Resolving URL', {
    packageRef: `${name}:${version}`,
    variant: `${chainId}-${preset}`,
  });
  const localRegistry = new LocalRegistry(CANNON_DIRECTORY);
  const url = await await localRegistry.getUrl(`${name}:${version}`, `${chainId}-${preset}`);
  console.log(`Resolved URL:`, { url });

  console.log('Fetching deployment state', { url });
  const deployments = JSON.parse(
    await fs.readFile(`${CANNON_DIRECTORY}/ipfs_cache/${CliLoader.getCacheHash(url)}.json`, 'utf8')
  );

  await fs.mkdir(`${__dirname}/deployments`, { recursive: true });

  const snxAddress = setting?.snx_address?.defaultValue ?? ethers.constants.AddressZero;
  await fs.writeFile(
    `${__dirname}/deployments/snx.json`,
    JSON.stringify({ address: snxAddress }, null, 2)
  );

  const system = deployments.state['provision.system'].artifacts.imports.system;
  await fs.writeFile(
    `${__dirname}/deployments/CoreProxy.json`,
    JSON.stringify(
      {
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
      await fs.writeFile(
        `${__dirname}/deployments/FakeCollateral${ticker}.json`,
        JSON.stringify(
          {
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
