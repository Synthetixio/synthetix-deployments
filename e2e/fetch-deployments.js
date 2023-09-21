#!/usr/bin/env node

const path = require('path');
const fs = require('fs/promises');
const toml = require('@iarna/toml');
const { ethers } = require('ethers');
const { OnChainRegistry, IPFSLoader } = require('@usecannon/builder');

const DEFAULT_REGISTRY_ADDRESS = '0x8E5C7EFC9636A6A0408A46BB7F617094B81e5dba';
const CURRENT_DIR = __dirname;
const ROOT = path.resolve(`${CURRENT_DIR}/..`);

async function fetchDeployment({ chainId, deploymentFile, registry, loader }) {
  await fs.mkdir(`${CURRENT_DIR}/deployments/${chainId}`, { recursive: true });

  const config = await fs.readFile(deploymentFile, 'utf8');
  const { name, version, setting } = toml.parse(config);
  const preset = setting?.target_preset?.defaultValue ?? 'main';

  const snxAddress = setting?.snx_address?.defaultValue ?? ethers.constants.AddressZero;
  await fs.writeFile(
    `${CURRENT_DIR}/deployments/${chainId}/snx.json`,
    JSON.stringify({ address: snxAddress }, null, 2)
  );

  const ipfs = await registry.getUrl(`${name}:${version}`, `${chainId}-${preset}`);

  const meta = {
    name,
    version,
    preset,
    ipfs,
    chainId,
    deploymentFile: path.relative(ROOT, deploymentFile),
  };
  await fs.writeFile(
    `${CURRENT_DIR}/deployments/${chainId}/meta.json`,
    JSON.stringify(meta, null, 2)
  );

  const deployments = await loader.read(ipfs);

  const system = deployments.state['provision.system'].artifacts.imports.system;

  // TODO: extract other contracts as necessary
  // See https://github.com/Synthetixio/synthetix-v3/blob/main/utils/docgen/abis.js for details

  const address = system.contracts.CoreProxy.address;
  const abi = new ethers.utils.Interface(system.contracts.CoreProxy.abi).format(
    ethers.utils.FormatTypes.full
  );
  await fs.writeFile(
    `${CURRENT_DIR}/deployments/${chainId}/CoreProxy.json`,
    JSON.stringify({ address, abi }, null, 2)
  );
}

async function run() {
  const registry = new OnChainRegistry({
    signerOrProvider: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    address: DEFAULT_REGISTRY_ADDRESS,
  });
  const loader = new IPFSLoader('http://127.0.0.1:5001');

  const [chainId, deploymentFile] = process.argv.slice(2);
  if (chainId && deploymentFile) {
    await fetchDeployment({ registry, loader, chainId, deploymentFile });
    return;
  }

  await Promise.all([
    fetchDeployment({
      registry,
      loader,
      chainId: 1,
      deploymentFile: `${ROOT}/omnibus-mainnet.toml`,
    }),
    fetchDeployment({
      registry,
      loader,
      chainId: 10,
      deploymentFile: `${ROOT}/omnibus-optimism-mainnet.toml`,
    }),
    fetchDeployment({
      registry,
      loader,
      chainId: 5,
      deploymentFile: `${ROOT}/omnibus-goerli.toml`,
    }),
    fetchDeployment({
      registry,
      loader,
      chainId: 420,
      deploymentFile: `${ROOT}/omnibus-optimism-goerli.toml`,
    }),
    fetchDeployment({
      registry,
      loader,
      chainId: 84531,
      deploymentFile: `${ROOT}/omnibus-base-goerli.toml`,
    }),
    fetchDeployment({
      registry,
      loader,
      chainId: 84531,
      deploymentFile: `${ROOT}/omnibus-base-goerli-competition.toml`,
    }),
    fetchDeployment({
      registry,
      loader,
      chainId: 11155111,
      deploymentFile: `${ROOT}/omnibus-sepolia.toml`,
    }),
    fetchDeployment({
      registry,
      loader,
      chainId: 80001,
      deploymentFile: `${ROOT}/omnibus-polygon-mumbai.toml`,
    }),
    fetchDeployment({
      registry,
      loader,
      chainId: 421613,
      deploymentFile: `${ROOT}/omnibus-arbitrum-goerli.toml`,
    }),
  ]);
}

run();
