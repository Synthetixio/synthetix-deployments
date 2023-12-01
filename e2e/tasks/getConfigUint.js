const { ethers } = require('ethers');
const CoreProxy = require('../deployments/CoreProxy.json');

async function getConfigUint(key) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);
  const value = await coreProxy.getConfigUint(ethers.utils.formatBytes32String(key));
  return value.toNumber();
}

module.exports = {
  getConfigUint,
};
