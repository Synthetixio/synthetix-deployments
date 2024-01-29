#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

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

  const config = await getCollateralConfig('WETH');
  const WethToken = new ethers.Contract(config.tokenAddress, erc20Abi, wallet);

  const balance = parseFloat(ethers.utils.formatUnits(await WethToken.balanceOf(wallet.address)));
  log({ oldBalance: balance });

  if (balance >= amount) {
    log({ result: 'SKIP' });
    return balance;
  }

  const tx = await WethToken.deposit({
    value: ethers.utils.hexValue(ethers.utils.parseEther(`${amount}`).toHexString()),
  });
  await tx
    .wait()
    .then((txn) => log(txn) || txn, parseError)
    .then(gasLog({ action: 'WethToken.deposit', log }));
  const newBalance = parseFloat(
    ethers.utils.formatUnits(await WethToken.balanceOf(wallet.address))
  );
  log({ newBalance: newBalance });
  return newBalance;
}

module.exports = {
  wrapEth,
};
