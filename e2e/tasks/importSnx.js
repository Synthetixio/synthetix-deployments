const ethers = require('ethers');

async function importSnx() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  return require(`../deployments/${network.chainId}/snx.json`);
}

module.exports = {
  importSnx,
};
