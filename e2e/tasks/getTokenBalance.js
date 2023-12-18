#!/usr/bin/env node

const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getTokenBalance({ walletAddress, tokenAddress }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const Token = new ethers.Contract(
    tokenAddress,
    [
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address account) view returns (uint256)',
    ],
    provider
  );
  const decimals = await Token.decimals();
  const symbol = await Token.symbol();
  const balance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(walletAddress), decimals)
  );
  log({ symbol, tokenAddress, balance });
  return balance;
}

module.exports = {
  getTokenBalance,
};

if (require.main === module) {
  const [walletAddress, tokenAddress] = process.argv.slice(2);
  getTokenBalance({ walletAddress, tokenAddress }).then(console.log);
}
