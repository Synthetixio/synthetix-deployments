const { ethers } = require('ethers');
const { importCoreProxy } = require('./importCoreProxy');

async function getConfigUint(key) {
  const CoreProxy = await importCoreProxy();
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);
  const value = await coreProxy.getConfigUint(ethers.utils.formatBytes32String(key));
  return value.toNumber();
}

module.exports = {
  getConfigUint,
};
