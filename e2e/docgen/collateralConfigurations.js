const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');
const { readableBigWei, readableWei, readableBigNumber, readableNumber } = require('./lib/numbers');

async function collateralConfigurations() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { chainId } = await provider.getNetwork();

  const out = [];

  const { getCollateralConfigurations } = require('../tasks/getCollateralConfigurations');
  const allConfigs = await getCollateralConfigurations();
  const configs = Object.values(
    allConfigs.reverse().reduce((result, config) => {
      if (config.symbol in result) {
        return result;
      }
      return Object.assign(result, { [config.symbol]: config });
    }, {})
  ).sort((c1, c2) => c1.symbol.localeCompare(c2.symbol));

  out.push(`# Collaterals`);
  out.push('');

  const table = [];
  table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="100">Symbol</th>
            <th width="100">Deposit Enabled</th>
            <th width="100">Name</th>
            <th width="100">Decimals</th>
            <th width="500">Token address</th>
            <th width="100">Issuance Ratio</th>
            <th width="100">Liquidation Ratio</th>
            <th width="100">Liquidation Reward</th>
            <th width="800">Oracle Node</th>
            <th width="100">Min Delegation</th>
          </tr>
        </thead>
        <tbody>
    `);

  for (const config of configs) {
    table.push(`
      <tr>
        <td><b>${config.symbol}</b></td>
        <td>${config.depositingEnabled ? '✅' : ''}</td>
        <td>${config.name}</td>
        <td>${readableNumber(config.decimals)}</td>
        <td>${addrHtmlLink(chainId, config.tokenAddress)}</td>
        <td>${readableBigWei(config.issuanceRatioD18)}</td>
        <td>${readableWei(config.liquidationRatioD18)}</td>
        <td>${readableWei(config.liquidationRewardD18)}</td>
        <td><code>${config.oracleNodeId}</code></td>
        <td>${readableBigWei(config.minDelegationD18)}</td>
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
  collateralConfigurations,
};

if (require.main === module) {
  require('../inspect');
  collateralConfigurations().then(prettyMd).then(console.log);
}
