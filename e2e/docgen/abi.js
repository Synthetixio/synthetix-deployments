const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');

async function abi() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const network = await provider.getNetwork();
  const {
    name,
    version,
    preset = 'main',
    chainId = network.chainId,
    contracts,
  } = require('../deployments/meta.json');
  log({ name, version, preset, chainId });

  const out = [];
  out.push('# Contracts');
  out.push('');

  const table = [];
  table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="400">System</th>
            <th width="500">Address</th>
            <th width="500">ABI</th>
            <th width="500">Readable ABI</th>
          </tr>
        </thead>
        <tbody>
    `);

  for (const [name, address] of Object.entries(contracts)) {
    log({ name, address });
    table.push(`
      <tr>
        <td>${name}</td>
        <td>${addrHtmlLink(chainId, address)}</td>
        <td><a href="./${chainId}-${preset}/${name}.json"><code>${name}.json</code></a></td>
        <td><a href="./${chainId}-${preset}/${name}.readable.json"><code>${name}.readable.json</code></a></td>
      </tr>
    `);
  }
  table.push(`
    <tr>
      <td>AllErrors</td>
      <td>n/a</td>
      <td><a href="./${chainId}-${preset}/AllErrors.json"><code>AllErrors.json</code></a></td>
      <td><a href="./${chainId}-${preset}/AllErrors.readable.json"><code>AllErrors.readable.json</code></a></td>
    </tr>
  `);
  table.push(`
      </tbody>
    </table>
  `);

  table.push(`
    <table data-full-width="true">
      <thead>
        <tr>
          <th width="400"></th>
          <th width="500">JSON</th>
        </tr>
      </thead>
      <tbody>
  `);
  table.push(`
    <tr>
      <td>Deployment meta</td>
      <td><a href="./${chainId}-${preset}/meta.json"><code>meta.json</code></a></td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>Extra outputs</td>
      <td><a href="./${chainId}-${preset}/extras.json"><code>extras.json</code></a></td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>Cannon state</td>
      <td><a href="./${chainId}-${preset}/cannon.json"><code>cannon.json</code></a></td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>Collateral tokens</td>
      <td><a href="./${chainId}-${preset}/collateralTokens.json"><code>collateralTokens.json</code></a></td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>Collateral tokens</td>
      <td><a href="./${chainId}-${preset}/collateralTokens.json"><code>collateralTokens.json</code></a></td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>Synth tokens</td>
      <td><a href="./${chainId}-${preset}/synthTokens.json"><code>synthTokens.json</code></a></td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>System token</td>
      <td><a href="./${chainId}-${preset}/systemToken.json"><code>systemToken.json</code></a></td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>Rewards distributors</td>
      <td><a href="./${chainId}-${preset}/rewardsDistributors.json"><code>rewardsDistributors.json</code></a></td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>All utilised Pyth price feeds</td>
      <td><a href="./${chainId}-${preset}/pythFeeds.json"><code>pythFeeds.json</code></a></td>
    </tr>
  `);
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
  abi,
};

if (require.main === module) {
  require('../inspect');
  abi().then(prettyMd).then(console.log);
}
