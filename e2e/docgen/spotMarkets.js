const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');
const { readableBigWei, readableWei, readableNumber, rawValue } = require('./lib/numbers');

async function spotMarkets() {
  const { name, version, preset, chainId } = require('../deployments/meta.json');
  log({ name, version, preset, chainId });

  const out = [];
  const table = [];

  const spotMarkets = require('../deployments/spotMarkets.json');
  const marketIds = Object.keys(spotMarkets.markets);
  log({ marketIds });

  out.push(`# Spot Markets`);
  out.push('');

  for (const marketId of marketIds) {
    const market = spotMarkets.markets[`${marketId}`];
    log({ market });
    out.push(`# Spot market ${market.synthToken.symbol} / ${market.synthToken.name}`);

    table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="400">Spot market parameters</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);
    table.push(`
      <tr>
        <td>ID:</td>
        <td>${market.id}</td>
        <td>${rawValue(market.id)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxWrappableAmount</td>
        <td>${readableBigWei(market.maxWrappableAmount)}</td>
        <td>${rawValue(market.maxWrappableAmount)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>atomicFixedFee</td>
        <td>${readableWei(market.atomicFixedFee)}</td>
        <td>${rawValue(market.atomicFixedFee)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>skewScale</td>
        <td>${readableBigWei(market.skewScale)}</td>
        <td>${rawValue(market.skewScale)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>collateralLeverage</td>
        <td>${readableWei(market.collateralLeverage)}</td>
        <td>${rawValue(market.collateralLeverage)}</td>
      </tr>
    `);
    table.push(`
        </tbody>
      </table>
    `);
    out.push(await prettyHtml(table.splice(0).join('\n')));

    table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="400">Synth token</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);
    table.push(`
      <tr>
        <td>symbol</td>
        <td></td>
        <td>${rawValue(market.synthToken.symbol)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>name</td>
        <td></td>
        <td>${rawValue(market.synthToken.name)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>address</td>
        <td></td>
        <td>${addrHtmlLink(chainId, market.synthToken.address)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>decimals</td>
        <td>${market.synthToken.decimals}</td>
        <td>${rawValue(market.synthToken.decimals)}</td>
      </tr>
    `);
    table.push(`
        </tbody>
      </table>
    `);
    out.push(await prettyHtml(table.splice(0).join('\n')));

    table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="400">Token</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);
    table.push(`
      <tr>
        <td>symbol</td>
        <td></td>
        <td>${rawValue(market.token?.symbol)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>name</td>
        <td></td>
        <td>${rawValue(market.token?.name)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>address</td>
        <td></td>
        <td>${market.token?.address ? addrHtmlLink(chainId, market.token?.address) : rawValue(market.token?.address)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>decimals</td>
        <td>${market.token?.decimals}</td>
        <td>${rawValue(market.token?.decimals)}</td>
      </tr>
    `);
    table.push(`
        </tbody>
      </table>
    `);
    out.push(await prettyHtml(table.splice(0).join('\n')));

    table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="400">Synth price data</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);
    table.push(`
      <tr>
        <td>buyFeedId</td>
        <td></td>
        <td>${rawValue(market.synthPriceData?.buyFeedId)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>sellFeedId</td>
        <td></td>
        <td>${rawValue(market.synthPriceData?.sellFeedId)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>strictStalenessTolerance</td>
        <td>${market.synthPriceData?.strictStalenessTolerance}</td>
        <td>${rawValue(market.synthPriceData?.strictStalenessTolerance)}</td>
      </tr>
    `);
    table.push(`
        </tbody>
      </table>
    `);
    out.push(await prettyHtml(table.splice(0).join('\n')));

    table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="400">Fees</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);
    table.push(`
      <tr>
        <td>atomicFixedFee</td>
        <td>${readableWei(market.fees.atomicFixedFee)}</td>
        <td>${rawValue(market.fees.atomicFixedFee)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>asyncFixedFee</td>
        <td>${readableWei(market.fees.asyncFixedFee)}</td>
        <td>${rawValue(market.fees.asyncFixedFee)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>wrapFee</td>
        <td>${readableWei(market.fees.wrapFee)}</td>
        <td>${rawValue(market.fees.wrapFee)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>unwrapFee</td>
        <td>${readableWei(market.fees.unwrapFee)}</td>
        <td>${rawValue(market.fees.unwrapFee)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>marketUtilizationFees</td>
        <td>${readableWei(market.fees.marketUtilizationFees)}</td>
        <td>${rawValue(market.fees.marketUtilizationFees)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>feeCollector</td>
        <td></td>
        <td>${addrHtmlLink(chainId, market.fees.feeCollector)}</td>
      </tr>
    `);
    table.push(`
        </tbody>
      </table>
    `);
    out.push(await prettyHtml(table.splice(0).join('\n')));

    table.push(`
      <table data-full-width="true">
        <thead>
          <tr>
            <th width="400">Settlement strategy</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);
    table.push(`
      <tr>
        <td>ID:</td>
        <td>${readableNumber(market.settlementStrategyId)}</td>
        <td>${rawValue(market.settlementStrategyId)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>strategyType</td>
        <td>${
          [
            'ONCHAIN', // 0
            'PYTH', // 1
          ][market.settlementStrategy?.strategyType] || 'Unknown'
        }</td>
        <td>${rawValue(market.settlementStrategy?.strategyType)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementDelay</td>
        <td>${readableNumber(market.settlementStrategy?.settlementDelay)}</td>
        <td>${rawValue(market.settlementStrategy?.settlementDelay)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementWindowDuration</td>
        <td>${readableNumber(market.settlementStrategy?.settlementWindowDuration)}</td>
        <td>${rawValue(market.settlementStrategy?.settlementWindowDuration)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>priceVerificationContract</td>
        <td></td>
        <td>${addrHtmlLink(chainId, market.settlementStrategy?.priceVerificationContract)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>feedId</td>
        <td></td>
        <td>${rawValue(market.settlementStrategy?.feedId)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>url</td>
        <td></td>
        <td>${rawValue(market.settlementStrategy?.url)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementReward</td>
        <td>${readableWei(market.settlementStrategy?.settlementReward)}</td>
        <td>${rawValue(market.settlementStrategy?.settlementReward)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>priceDeviationTolerance</td>
        <td>${readableWei(market.settlementStrategy?.priceDeviationTolerance)}</td>
        <td>${rawValue(market.settlementStrategy?.priceDeviationTolerance)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>minimumUsdExchangeAmount</td>
        <td>${readableWei(market.settlementStrategy?.minimumUsdExchangeAmount)}</td>
        <td>${rawValue(market.settlementStrategy?.minimumUsdExchangeAmount)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxRoundingLoss</td>
        <td>${readableWei(market.settlementStrategy?.maxRoundingLoss)}</td>
        <td>${rawValue(market.settlementStrategy?.maxRoundingLoss)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>disabled</td>
        <td>${market.settlementStrategy?.disabled === true ? '🚫 Disabled' : market.settlementStrategy?.disabled === false ? '✅ Enabled' : 'n/a'}</td>
        <td>${rawValue(market.settlementStrategy?.disabled)}</td>
      </tr>
    `);
    table.push(`
        </tbody>
      </table>
    `);
    out.push(await prettyHtml(table.splice(0).join('\n')));
  }

  out.push('');
  out.push('');
  return out.join('\n');
}

module.exports = {
  spotMarkets,
};

if (require.main === module) {
  require('../inspect');
  spotMarkets().then(prettyMd).then(console.log);
}
