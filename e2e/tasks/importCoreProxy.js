const ethers = require('ethers');

async function importCoreProxy() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  return require(`../deployments/${network.chainId}/CoreProxy.json`);
}

module.exports = {
  importCoreProxy,
};
