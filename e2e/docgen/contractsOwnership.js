const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');

async function contractsOwnership() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { name, version, preset, chainId, contracts } = require('../deployments/meta.json');
  log({ name, version, preset, chainId });

  const out = [];
  const table = [];
  table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="400">System</th>
            <th width="500">Owner</th>
            <th width="500">Nominated owner</th>
          </tr>
        </thead>
        <tbody>
    `);

  const abi = [
    'function owner() view returns (address)',
    'function nominatedOwner() view returns (address)',
  ];
  for (const [name, address] of Object.entries(contracts)) {
    const Contract = new ethers.Contract(address, abi, provider);
    const [owner, nominatedOwner] = await Promise.all([
      Contract.owner().catch(() => ethers.constants.AddressZero),
      Contract.nominatedOwner().catch(() => ethers.constants.AddressZero),
    ]);
    log({ name, address, owner, nominatedOwner });

    table.push(`
      <tr>
        <td>${name}</td>
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
  contractsOwnership,
};

if (require.main === module) {
  require('../inspect');
  contractsOwnership().then(prettyMd).then(console.log);
}
