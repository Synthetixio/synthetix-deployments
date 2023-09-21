const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');

async function getCollateralBalance({ address, symbol }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const erc20 = new ethers.Contract(
    config.tokenAddress,
    ['function balanceOf(address account) view returns (uint256)'],
    provider
  );
  const balance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(address)));

  return balance;
}

module.exports = {
  getCollateralBalance,
};
