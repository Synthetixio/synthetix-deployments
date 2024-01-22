#!/usr/bin/env node

require('./inspect');

const path = require('path');
const fs = require('fs/promises');
const { ethers } = require('ethers');

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgCyan = '\x1b[36m';

const ERC20Abi = [
  'constructor(string name, string symbol, uint256 initialSupply) payable',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)',
  'function increaseAllowance(address spender, uint256 addedValue) returns (bool)',
  'function mint(uint256 amount, address to)',
  'function name() view returns (string)',
  'function owner() view returns (address)',
  'function renounceOwnership()',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'function transferOwnership(address newOwner)',
];

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
    const fakeCollateralOptions = deployments?.def?.provision?.[provisionStep]?.options;
    if (fakeCollateral && fakeCollateralOptions) {
      contracts[`FakeCollateral${fakeCollateralOptions.symbol}`] =
        fakeCollateral.contracts.MintableToken;
    }
  }
  mintableToken('usdc_mock_collateral');
  mintableToken('mintableToken');

  const usdc = deployments?.def?.setting?.usdc_address?.defaultValue;
  if (usdc) {
    contracts['USDCToken'] = { address: usdc, abi: ERC20Abi };
  }

  const snx = deployments?.def?.setting?.snx_address?.defaultValue;
  if (snx) {
    contracts['SNXToken'] = { address: snx, abi: ERC20Abi };
  }

  // Extract all extras
  Object.values(deployments?.state).forEach((step) =>
    Object.assign(extras, step?.artifacts?.extras)
  );

  // Extract all oracle addresses
  // const oracles = {};
  // function oracleNode(invokeStep) {
  //   const oracleNodeArgs =
  //     deployments?.state?.[`invoke.${invokeStep}`]?.artifacts?.txns?.[invokeStep]?.events
  //       ?.NodeRegistered?.[0]?.args;
  //   if (oracleNodeArgs?.length === 4) {
  //     const [id, nodeType, data] = oracleNodeArgs;
  //     const [address, feedId, staleness] = ethers.utils.defaultAbiCoder.decode(
  //       ['address', 'bytes32', 'uint256'],
  //       data
  //     );
  //     return {
  //       id,
  //       address,
  //       nodeType: parseInt(nodeType.toString()),
  //       feedId,
  //       staleness: parseInt(staleness.toString()),
  //     };
  //   }
  // }
  // The event for node type 7 is different so need to figure out how to use it later
  // oracles.BTC = oracleNode('registerBtcOracleNode');
  // oracles.ETH = oracleNode('registerEthOracleNode');
  // return;

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

  log('Writing', `deployments/meta.json`);
  await fs.writeFile(`${__dirname}/deployments/meta.json`, JSON.stringify(meta, null, 2));

  //  log('Writing', `deployments/oracles.json`);
  //  await fs.writeFile(`${__dirname}/deployments/oracles.json`, JSON.stringify(oracles, null, 2));

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
