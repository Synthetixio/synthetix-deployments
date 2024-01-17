const { ethers } = require('ethers');
const { addrLink } = require('./lib/addrLink');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function poolsOwnership() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { chainId } = await provider.getNetwork();

  const out = [];
  out.push('## Pools ownership');
  out.push('');

  out.push('| Pool ID | Pool name | Preferred | Owner | Nominated owner |');
  out.push('| --- | --- | --- | --- | --- |');

  const CoreProxyDeployment = require('../deployments/CoreProxy.json');

  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
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
        const [name, owner, nominatedOwner] = await Promise.all([
          CoreProxy.getPoolName(poolId),
          CoreProxy.getPoolOwner(poolId),
          CoreProxy.getNominatedPoolOwner(poolId),
        ]);
        return { poolId, name, isPreferred, owner, nominatedOwner };
      })
  );
  log({ pools });
  for (const { poolId, name, isPreferred, owner, nominatedOwner } of pools) {
    out.push(
      `| ${[
        poolId,
        name,
        isPreferred ? '✅' : '',
        owner === ethers.constants.AddressZero ? 'n/a' : addrLink(chainId, owner),
        nominatedOwner === ethers.constants.AddressZero ? 'n/a' : addrLink(chainId, nominatedOwner),
      ].join(' | ')} |`
    );
  }

  out.push('');
  out.push('');

  return out.join('\n');
}

module.exports = {
  poolsOwnership,
};
