#!/usr/bin/env node

const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

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

  const tx = await Token.approve(spenderAddress, ethers.constants.MaxUint256);
  await tx.wait();
  return null;
}

module.exports = {
  approveToken,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, tokenAddress, spenderAddress] = process.argv.slice(2);
  approveToken({ privateKey, tokenAddress, spenderAddress }).then(console.log);
}
