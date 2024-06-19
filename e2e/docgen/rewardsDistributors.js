const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { txHtmlLink } = require('./lib/txLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');
const { readableBigWei, readableWei, readableNumber, rawValue } = require('./lib/numbers');
const { extractRewardsDistributors } = require('./lib/extractRewardsDistributors');

async function rewardsDistributors() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const network = await provider.getNetwork();
  const { name, version, preset, chainId = network.chainId } = require('../deployments/meta.json');
  log({ name, version, preset, chainId });

  const rewardsDistributors = extractRewardsDistributors();
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

    table.push(`
      <tr>
        <td>collateralType</td>
        <td></td>
        <td>${addrHtmlLink(chainId, rewardsDistributor.collateralType)}</td>
      </tr>
    `);

    table.push(`
      <tr>
        <td>payoutToken</td>
        <td></td>
        <td>${addrHtmlLink(chainId, rewardsDistributor.payoutToken)}</td>
      </tr>
    `);

    table.push(`
      <tr>
        <td>payoutTokenDecimals</td>
        <td>${rewardsDistributor.payoutTokenDecimals}</td>
        <td>${rawValue(rewardsDistributor.payoutTokenDecimals)}</td>
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
