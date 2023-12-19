#!/usr/bin/env node

const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function isTokenApproved({ walletAddress, tokenAddress, spenderAddress }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const Token = new ethers.Contract(
    tokenAddress,
    [
      'function symbol() view returns (string)',
      'function allowance(address owner, address spender) view returns (uint256)',
      'function approve(address spender, uint256 amount) returns (bool)',
    ],
    provider
  );

  const symbol = await Token.symbol();
  const allowance = await Token.allowance(walletAddress, spenderAddress);
  log({ symbol, tokenAddress, spenderAddress, allowance });

  return allowance.gt(0);
}

module.exports = {
  isTokenApproved,
};

if (require.main === module) {
  const [walletAddress, tokenAddress, spenderAddress] = process.argv.slice(2);
  isTokenApproved({ walletAddress, tokenAddress, spenderAddress }).then(console.log);
}
