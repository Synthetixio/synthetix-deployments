#!/usr/bin/env node

const { ethers } = require('ethers');
const CoreProxy = require('../deployments/CoreProxy.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const erc20Abi = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
  'function deposit() payable',
];

async function wrapEth({ privateKey, amount }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, wallet);
  const collateralConfigs = await coreProxy.getCollateralConfigurations(true);
  const collaterals = await Promise.all(
    collateralConfigs.map(async (config) => {
      const contract = new ethers.Contract(config.tokenAddress, erc20Abi, wallet);
      const symbol = await contract.symbol();
      return { contract, symbol };
    })
  );
  const weth = collaterals.find(({ symbol }) => symbol === 'WETH').contract;
  const balance = parseFloat(ethers.utils.formatUnits(await weth.balanceOf(wallet.address)));
  log({ oldBalance: balance });

  if (balance >= amount) {
    log({ result: 'SKIP' });
    return balance;
  }

  const wrapTx = await weth.deposit({
    value: ethers.utils.hexValue(ethers.utils.parseEther(`${amount}`).toHexString()),
  });
  await wrapTx.wait();
  const newBalance = parseFloat(ethers.utils.formatUnits(await weth.balanceOf(wallet.address)));
  log({ newBalance: newBalance });
  return newBalance;
}

module.exports = {
  wrapEth,
};
