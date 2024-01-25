#!/usr/bin/env node

const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getPools() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );
  const [approvedPools, preferredPool] = await Promise.all([
    CoreProxy.getApprovedPools().then((ids) => ids.map((id) => id.toNumber())),
    CoreProxy.getPreferredPool().then((id) => id.toNumber()),
  ]);
  log({ approvedPools, preferredPool });
  const pools = await Promise.all(
    [{ poolId: preferredPool, isPreferred: true }]
      .concat(approvedPools.map((poolId) => ({ poolId, isPreferred: false })))
      .map(async ({ poolId, isPreferred }) => {
        const [name] = await Promise.all([CoreProxy.getPoolName(poolId)]);
        return { poolId, name, isPreferred };
      })
  );
  return pools;
}

module.exports = {
  getPools,
};

if (require.main === module) {
  require('../inspect');
  getPools().then((data) => console.log(JSON.stringify(data, null, 2)));
}
