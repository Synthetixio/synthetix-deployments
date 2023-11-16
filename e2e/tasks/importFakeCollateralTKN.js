const { ethers } = require('ethers');
const { getPreset } = require('./getPreset');

async function importFakeCollateralTKN() {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const network = await provider.getNetwork();
  const preset = await getPreset();
  return require(`../deployments/${network.chainId}-${preset}/FakeCollateralTKN.json`);
}

module.exports = {
  importFakeCollateralTKN,
};
