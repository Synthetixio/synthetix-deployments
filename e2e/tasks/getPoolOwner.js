#!/usr/bin/env node

const { ethers } = require('ethers');

async function getPoolOwner({ poolId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );

  const poolOwner = await CoreProxy.getPoolOwner(poolId);

  return poolOwner;
}

module.exports = {
  getPoolOwner,
};

if (require.main === module) {
  require('../inspect');
  const [poolId] = process.argv.slice(2);
  getPoolOwner({ poolId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
