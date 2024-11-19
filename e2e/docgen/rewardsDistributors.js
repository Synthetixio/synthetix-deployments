const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { txHtmlLink } = require('./lib/txLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');
const { rawValue } = require('./lib/numbers');

async function rewardsDistributors() {
  const { name, version, preset, chainId } = require('../deployments/meta.json');
  log({ name, version, preset, chainId });

  const rewardsDistributors = require('../deployments/rewardsDistributors.json');
  log({ rewardsDistributors });
  if (Object.values(rewardsDistributors).length < 1) {
    return '';
  }

  const out = [];

  for (const rewardsDistributor of rewardsDistributors) {
    out.push(`# Rewards Distributor: ${rewardsDistributor.name}`);

    const table = [];
    table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="400">Parameter name</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);

    table.push(`
      <tr>
        <td>name</td>
        <td></td>
        <td>${rawValue(name)}</td>
      </tr>
    `);

    table.push(`
      <tr>
        <td>address</td>
        <td></td>
        <td>${addrHtmlLink(chainId, rewardsDistributor.address)}</td>
      </tr>
    `);

    table.push(`
      <tr>
        <td>deployTxn</td>
        <td></td>
        <td>${txHtmlLink(chainId, rewardsDistributor.deployTxn)}</td>
      </tr>
    `);

    table.push(`
      <tr>
        <td>registered</td>
        <td>${rewardsDistributor.isRegistered ? '✅ Registered' : '🚫 Unregistered'}</td>
        <td></td>
      </tr>
    `);

    table.push(`
      <tr>
        <td>poolId</td>
        <td>${rewardsDistributor.poolId}</td>
        <td>${rawValue(rewardsDistributor.poolId)}</td>
      </tr>
    `);

    if (rewardsDistributor.collateralType) {
      table.push(`
        <tr>
          <td>collateralType</td>
          <td>${rewardsDistributor.collateralType.symbol} ${rawValue(rewardsDistributor.collateralType.decimals)}</td>
          <td>${addrHtmlLink(chainId, rewardsDistributor.collateralType.address)}</td>
        </tr>
      `);
    } else {
      table.push(`
        <tr>
          <td>collateralType</td>
          <td>n/a</td>
          <td>n/a</td>
        </tr>
      `);
    }

    table.push(`
      <tr>
        <td>payoutToken</td>
        <td>${rewardsDistributor.payoutToken.symbol} ${rawValue(rewardsDistributor.payoutToken.decimals)}</td>
        <td>${addrHtmlLink(chainId, rewardsDistributor.payoutToken.address)}</td>
      </tr>
    `);

    table.push(`
      <tr>
        <td>rewardManager</td>
        <td></td>
        <td>${addrHtmlLink(chainId, rewardsDistributor.rewardManager)}</td>
      </tr>
    `);

    out.push(await prettyHtml(table.join('\n')));
  }

  out.push('');
  out.push('');
  return out.join('\n');
}

module.exports = {
  rewardsDistributors,
};

if (require.main === module) {
  require('../inspect');
  rewardsDistributors().then(prettyMd).then(console.log);
}
