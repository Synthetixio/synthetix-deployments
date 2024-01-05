const { ethers } = require('ethers');
const CoreProxyDeployment = require('../deployments/CoreProxy.json');

async function getConfigUint(key) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    provider
  );
  const value = await CoreProxy.getConfigUint(ethers.utils.formatBytes32String(key));
  return value.toNumber();
}

module.exports = {
  getConfigUint,
};
