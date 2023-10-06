const { ethers } = require('ethers');
const { importCoreProxy } = require('./importCoreProxy');

async function getAccountOwner({ accountId }) {
  const CoreProxy = await importCoreProxy();
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);

  return await coreProxy.getAccountOwner(accountId);
}

module.exports = {
  getAccountOwner,
};
