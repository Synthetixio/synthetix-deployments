#!/usr/bin/env node

const { ethers } = require('ethers');
const CoreProxyDeployment = require('../deployments/CoreProxy.json');

async function getAccountOwner({ accountId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    provider
  );

  return await CoreProxy.getAccountOwner(accountId);
}

module.exports = {
  getAccountOwner,
};

if (require.main === module) {
  const [accountId] = process.argv.slice(2);
  getAccountOwner({ accountId }).then(console.log);
}
