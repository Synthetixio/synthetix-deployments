const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');

async function poolsOwnership() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { name, version, preset, chainId } = require('../deployments/meta.json');
  log({ name, version, preset, chainId });

  const out = [];
  const table = [];
  table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="400">Pool</th>
            <th width="500">Owner</th>
            <th width="500">Nominated owner</th>
          </tr>
        </thead>
        <tbody>
    `);

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
    table.push(`
      <tr>
        <td><code>${poolId}</code> ${name} ${isPreferred ? '<i>* preferred</i>' : ''}</td>
        <td>${owner === ethers.constants.AddressZero ? 'n/a' : addrHtmlLink(chainId, owner)}</td>
        <td>${nominatedOwner === ethers.constants.AddressZero ? 'n/a' : addrHtmlLink(chainId, nominatedOwner)}</td>
      </tr>
    `);
  }

  table.push(`
        </tbody>
      </table>
    `);

  out.push(await prettyHtml(table.join('\n')));

  out.push('');
  out.push('');

  return out.join('\n');
}

module.exports = {
  poolsOwnership,
};

if (require.main === module) {
  require('../inspect');
  poolsOwnership().then(prettyMd).then(console.log);
}
