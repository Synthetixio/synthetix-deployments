#!/usr/bin/env node

const { ethers } = require('ethers');

async function getAccountOwner({ accountId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );

  return await CoreProxy.getAccountOwner(accountId);
}

module.exports = {
  getAccountOwner,
};

if (require.main === module) {
  require('../inspect');
  const [accountId] = process.argv.slice(2);
  getAccountOwner({ accountId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
