const ethers = require('ethers');
const { getPreset } = require('./getPreset');

async function importSnx() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  const preset = await getPreset();
  return require(`../deployments/${network.chainId}-${preset}/snx.json`);
}

module.exports = {
  importSnx,
};
