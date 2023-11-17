const { ethers } = require('ethers');
const FakeCollateralTKN = require('../deployments/FakeCollateralTKN.json');

const log = require('debug')(`tasks:${require('path').basename(__filename, '.js')}`);

async function getFakeCollateralTKNBalance({ address }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const erc20 = new ethers.Contract(FakeCollateralTKN.address, FakeCollateralTKN.abi, provider);
  const balance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(address)));
  return balance;
}

module.exports = {
  getFakeCollateralTKNBalance,
};
