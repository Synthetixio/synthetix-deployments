const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');
const { readableBigWei, readableWei, readableNumber, rawValue } = require('./lib/numbers');

function sortBySymbol(c1, c2) {
  return c1.symbol.localeCompare(c2.symbol);
}

async function renderCollateralConfig(config) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const network = await provider.getNetwork();
  const { name, version, preset, chainId = network.chainId } = require('../deployments/meta.json');
  log({ name, version, preset, chainId });

  const out = [];

  out.push(`Token address: ${addrHtmlLink(chainId, config.tokenAddress)}`);
  out.push('');

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
      <td>depositingEnabled</td>
      <td>${config.depositingEnabled === true ? '✅ Enabled' : config.depositingEnabled === false ? '🚫 Disabled' : 'n/a'}</td>
      <td>${rawValue(config.depositingEnabled)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>decimals</td>
      <td>${readableNumber(config.decimals)}</td>
      <td>${rawValue(config.decimals)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>issuanceRatioD18</td>
      <td>${readableBigWei(config.issuanceRatioD18)}</td>
      <td>${rawValue(config.issuanceRatioD18)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>liquidationRatioD18</td>
      <td>${readableWei(config.liquidationRatioD18)}</td>
      <td>${rawValue(config.liquidationRatioD18)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>liquidationRewardD18</td>
      <td>${readableWei(config.liquidationRewardD18)}</td>
      <td>${rawValue(config.liquidationRewardD18)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>oracleNodeId</td>
      <td></td>
      <td>${rawValue(config.oracleNodeId)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>minDelegationD18</td>
      <td>${readableBigWei(config.minDelegationD18)}</td>
      <td>${rawValue(config.minDelegationD18)}</td>
    </tr>
  `);

  table.push(`
      </tbody>
    </table>
  `);

  out.push(await prettyHtml(table.join('\n')));

  return out.join('\n');
}

async function collateralConfigurations() {
  const out = [];

  const { getCollateralConfigurations } = require('../tasks/getCollateralConfigurations');
  const allConfigs = await getCollateralConfigurations();
  const { deprecated, configs } = allConfigs.reverse().reduce(
    (result, config) => {
      if (config.symbol in result.configs) {
        result.deprecated.unshift(config);
      } else {
        Object.assign(result.configs, { [config.symbol]: config });
      }
      return result;
    },
    { deprecated: [], configs: {} }
  );
  log({ deprecated });

  for (const config of Object.values(configs).sort(sortBySymbol)) {
    out.push(`# Collateral \`${config.symbol}\` ${config.name}`);
    out.push(await renderCollateralConfig(config));
  }

  for (const config of deprecated) {
    out.push(`# Deprecated Collateral (DO NOT USE!) \`${config.symbol}\` ${config.name}`);
    out.push(await renderCollateralConfig(config));
  }

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
