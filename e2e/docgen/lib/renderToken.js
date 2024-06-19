const { ethers } = require('ethers');
const { rawValue } = require('./numbers');

const cache = {};

async function renderToken(addr) {
  if (!cache[addr]) {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_URL || 'http://127.0.0.1:8545'
    );
    const contract = new ethers.Contract(
      addr,
      ['function symbol() view returns (string)', 'function decimals() view returns (uint8)'],
      provider
    );
    const [symbol, decimals] = await Promise.all([contract.symbol(), contract.decimals()]);
    cache[addr] = `${symbol} ${rawValue(decimals)}`;
  }
  return cache[addr];
}

module.exports = {
  renderToken,
};
