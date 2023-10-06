const { ethers } = require('ethers');

const log = require('debug')(`tasks:${require('path').basename(__filename, '.js')}`);

async function getEthBalance({ address }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const balance = parseFloat(ethers.utils.formatUnits(await provider.getBalance(address)));
  log({ wallet: address, balance });

  return balance;
}

module.exports = {
  getEthBalance,
};
