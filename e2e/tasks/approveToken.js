#!/usr/bin/env node

const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { traceTxn } = require('../traceTxn');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

async function approveToken({ privateKey, tokenAddress, spenderAddress }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  const Token = new ethers.Contract(
    tokenAddress,
    [
      'function symbol() view returns (string)',
      'function allowance(address owner, address spender) view returns (uint256)',
      'function approve(address spender, uint256 amount) returns (bool)',
    ],
    wallet
  );
  const symbol = await Token.symbol();
  log({ symbol, tokenAddress, spenderAddress });

  const args = [
    //
    spenderAddress,
    ethers.constants.MaxUint256,
  ];
  const gasLimit = await Token.estimateGas
    .approve(...args)
    .catch(parseError)
    .catch(() => 10_000_000);
  const tx = await Token.approve(...args, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, traceTxn(tx))
    .then(gasLog({ action: 'Token.approve', log }));
  return null;
}

module.exports = {
  approveToken,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, tokenAddress, spenderAddress] = process.argv.slice(2);
  approveToken({ privateKey, tokenAddress, spenderAddress }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
