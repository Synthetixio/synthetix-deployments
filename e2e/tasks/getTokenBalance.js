const { ethers } = require('ethers');
const log = require('debug')(`tasks:${require('path').basename(__filename, '.js')}`);

async function getTokenBalance({ walletAddress, tokenAddress }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const Token = new ethers.Contract(
    tokenAddress,
    [
      'function symbol() view returns (string)',
      'function balanceOf(address account) view returns (uint256)',
    ],
    provider
  );
  const symbol = await Token.symbol();
  const balance = parseFloat(ethers.utils.formatUnits(await Token.balanceOf(walletAddress)));
  log({ symbol, tokenAddress, balance });
  return balance;
}

module.exports = {
  getTokenBalance,
};
