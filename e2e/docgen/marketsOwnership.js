const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');

const MARKET_IDS = [
  // We cannot get the list of markets from contract, can only hardcode it
  1,
];

async function marketsOwnership() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { chainId } = await provider.getNetwork();

  const out = [];
  out.push('## Markets ownership');
  out.push('');

  const table = [];
  table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="100">Market ID</th>
            <th width="500">Market name</th>
            <th width="500">Owner</th>
            <th width="500">Nominated owner</th>
          </tr>
        </thead>
        <tbody>
    `);

  const SpotMarketProxyDeployment = require('../deployments/SpotMarketProxy.json');

  const SpotMarketProxy = new ethers.Contract(
    SpotMarketProxyDeployment.address,
    SpotMarketProxyDeployment.abi,
    provider
  );
  const markets = await Promise.all(
    MARKET_IDS.map(async (marketId) => {
      const [name, owner, nominatedOwner] = await Promise.all([
        SpotMarketProxy.name(marketId),
        SpotMarketProxy.getMarketOwner(marketId),
        // TODO: enable when we have contract view function
        // SpotMarketProxy.getNominatedMarketOwner(marketId),
        Promise.resolve(ethers.constants.AddressZero),
      ]);
      return { marketId, name, owner, nominatedOwner };
    })
  );
  log({ markets });
  for (const { marketId, name, owner, nominatedOwner } of markets) {
    table.push(`
      <tr>
        <td>${marketId}</td>
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
  marketsOwnership,
};

if (require.main === module) {
  require('../inspect');
  marketsOwnership().then(prettyMd).then(console.log);
}
