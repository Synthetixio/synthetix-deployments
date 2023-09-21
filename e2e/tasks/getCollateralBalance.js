const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');

const log = require('debug')(`tasks:${require('path').basename(__filename, '.js')}`);

async function getCollateralBalance({ address, symbol }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const erc20 = new ethers.Contract(
    config.tokenAddress,
    ['function balanceOf(address account) view returns (uint256)'],
    provider
  );
  const balance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(address)));
  log({ wallet: address, symbol, balance });

  return balance;
}

module.exports = {
  getCollateralBalance,
};
