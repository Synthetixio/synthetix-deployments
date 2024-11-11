const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');
const { readableBigWei, readableWei, readableNumber, rawValue } = require('./lib/numbers');

function catcher(value = undefined) {
  return (error) => {
    log({ error: error });
    console.error(error);
    return value;
  };
}

async function perpsMarkets() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const network = await provider.getNetwork();
  const { name, version, preset, chainId = network.chainId } = require('../deployments/meta.json');
  log({ name, version, preset, chainId });

  const out = [];
  const table = [];

  const perpsMarkets = require('../deployments/perpsMarkets.json');

  const marketIds = Object.keys(perpsMarkets.markets)
    .map((marketId) => Number(marketId))
    .sort();
  log({ marketIds });

  out.push(`# Perps Markets`);
  out.push('');

  table.push(`
    <table data-full-width="true">
      <thead>
        <tr>
          <th width="400">Interest rate parameters</th>
          <th width="100">Value</th>
          <th width="800">Raw value</th>
        </tr>
      </thead>
      <tbody>
  `);
  table.push(`
    <tr>
      <td>lowUtilizationInterestRateGradient</td>
      <td>${readableBigWei(perpsMarkets.interestRateParameters.lowUtilizationInterestRateGradient)}</td>
      <td>${rawValue(perpsMarkets.interestRateParameters.lowUtilizationInterestRateGradient)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>interestRateGradientBreakpoint</td>
      <td>${readableBigWei(perpsMarkets.interestRateParameters.interestRateGradientBreakpoint)}</td>
      <td>${rawValue(perpsMarkets.interestRateParameters.interestRateGradientBreakpoint)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>highUtilizationInterestRateGradient</td>
      <td>${readableBigWei(perpsMarkets.interestRateParameters.highUtilizationInterestRateGradient)}</td>
      <td>${rawValue(perpsMarkets.interestRateParameters.highUtilizationInterestRateGradient)}</td>
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
          <th width="400">Keeper reward guards</th>
          <th width="100">Value</th>
          <th width="800">Raw value</th>
        </tr>
      </thead>
      <tbody>
  `);
  table.push(`
    <tr>
      <td>minKeeperRewardUsd</td>
      <td>${readableBigWei(perpsMarkets.keeperRewardGuards.minKeeperRewardUsd)}</td>
      <td>${rawValue(perpsMarkets.keeperRewardGuards.minKeeperRewardUsd)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>minKeeperProfitRatioD18</td>
      <td>${readableBigWei(perpsMarkets.keeperRewardGuards.minKeeperProfitRatioD18)}</td>
      <td>${rawValue(perpsMarkets.keeperRewardGuards.minKeeperProfitRatioD18)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>maxKeeperRewardUsd</td>
      <td>${readableBigWei(perpsMarkets.keeperRewardGuards.maxKeeperRewardUsd)}</td>
      <td>${rawValue(perpsMarkets.keeperRewardGuards.maxKeeperRewardUsd)}</td>
    </tr>
  `);
  table.push(`
    <tr>
      <td>maxKeeperScalingRatioD18</td>
      <td>${readableBigWei(perpsMarkets.keeperRewardGuards.maxKeeperScalingRatioD18)}</td>
      <td>${rawValue(perpsMarkets.keeperRewardGuards.maxKeeperScalingRatioD18)}</td>
    </tr>
  `);
  table.push(`
      </tbody>
    </table>
  `);
  out.push(await prettyHtml(table.splice(0).join('\n')));

  for (const marketId of marketIds) {
    const market = perpsMarkets.markets[`${marketId}`];
    out.push(`# Perps Market ${market.symbol} / ${market.name}`);

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
        <td>ID:</td>
        <td>${market.id}</td>
        <td>${rawValue(market.id)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxMarketSize</td>
        <td>${readableBigWei(market.maxMarketSize)}</td>
        <td>${rawValue(market.maxMarketSize)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxMarketValue</td>
        <td>${readableBigWei(market.maxMarketValue)}</td>
        <td>${rawValue(market.maxMarketValue)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>lockedOiRatio</td>
        <td>${readableBigWei(market.lockedOiRatio)}</td>
        <td>${rawValue(market.lockedOiRatio)}</td>
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
          <th width="400">Funding parameters</th>
          <th width="100">Value</th>
          <th width="800">Raw value</th>
        </tr>
      </thead>
      <tbody>
  `);
    table.push(`
      <tr>
        <td>skewScale</td>
        <td>${readableBigWei(market.fundingParameters.skewScale)}</td>
        <td>${rawValue(market.fundingParameters.skewScale)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxFundingVelocity</td>
        <td>${readableBigWei(market.fundingParameters.maxFundingVelocity)}</td>
        <td>${rawValue(market.fundingParameters.maxFundingVelocity)}</td>
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
            <th width="400">Order fees</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);
    table.push(`
      <tr>
        <td>makerFee</td>
        <td>${readableBigWei(market.orderFees.makerFee)}</td>
        <td>${rawValue(market.orderFees.makerFee)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>takerFee</td>
        <td>${readableBigWei(market.orderFees.takerFee)}</td>
        <td>${rawValue(market.orderFees.takerFee)}</td>
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
            <th width="400">Liquidation parameters</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);
    table.push(`
      <tr>
        <td>initialMarginRatioD18</td>
        <td>${readableBigWei(market.liquidationParameters.initialMarginRatioD18)}</td>
        <td>${rawValue(market.liquidationParameters.initialMarginRatioD18)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>minimumInitialMarginRatioD18</td>
        <td>${readableBigWei(market.liquidationParameters.minimumInitialMarginRatioD18)}</td>
        <td>${rawValue(market.liquidationParameters.minimumInitialMarginRatioD18)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maintenanceMarginScalarD18</td>
        <td>${readableBigWei(market.liquidationParameters.maintenanceMarginScalarD18)}</td>
        <td>${rawValue(market.liquidationParameters.maintenanceMarginScalarD18)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>flagRewardRatioD18</td>
        <td>${readableBigWei(market.liquidationParameters.flagRewardRatioD18)}</td>
        <td>${rawValue(market.liquidationParameters.flagRewardRatioD18)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>minimumPositionMargin</td>
        <td>${readableBigWei(market.liquidationParameters.minimumPositionMargin)}</td>
        <td>${rawValue(market.liquidationParameters.minimumPositionMargin)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxLiquidationLimitAccumulationMultiplier</td>
        <td>${readableBigWei(market.maxLiquidationParameters.maxLiquidationLimitAccumulationMultiplier)}</td>
        <td>${rawValue(market.maxLiquidationParameters.maxLiquidationLimitAccumulationMultiplier)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxLiquidationPd</td>
        <td>${readableBigWei(market.maxLiquidationParameters.maxLiquidationPd)}</td>
        <td>${rawValue(market.maxLiquidationParameters.maxLiquidationPd)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxSecondsInLiquidationWindow</td>
        <td>${market.maxLiquidationParameters.maxSecondsInLiquidationWindow}</td>
        <td>${rawValue(market.maxLiquidationParameters.maxSecondsInLiquidationWindow)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>endorsedLiquidator</td>
        <td></td>
        <td>${addrHtmlLink(chainId, market.maxLiquidationParameters.endorsedLiquidator)}</td>
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
            <th width="400">Settlement strategy parameters</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);
    table.push(`
      <tr>
        <td>strategyId</td>
        <td>${readableNumber(market.settlementStrategyId)}</td>
        <td>${rawValue(market.settlementStrategyId)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>strategyType</td>
        <td>${
          [
            'PYTH', // 0
          ][market.settlementStrategy.strategyType] || 'Unknown'
        }</td>
        <td>${rawValue(market.settlementStrategy.strategyType)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementDelay</td>
        <td>${readableNumber(market.settlementStrategy.settlementDelay)}</td>
        <td>${rawValue(market.settlementStrategy.settlementDelay)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementWindowDuration</td>
        <td>${readableNumber(market.settlementStrategy.settlementWindowDuration)}</td>
        <td>${rawValue(market.settlementStrategy.settlementWindowDuration)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>priceVerificationContract</td>
        <td></td>
        <td>${addrHtmlLink(chainId, market.settlementStrategy.priceVerificationContract)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>feedId</td>
        <td></td>
        <td>${rawValue(market.settlementStrategy.feedId)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementReward</td>
        <td>${readableBigWei(market.settlementStrategy.settlementReward)}</td>
        <td>${rawValue(market.settlementStrategy.settlementReward)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>disabled</td>
        <td>${market.settlementStrategy.disabled === true ? '🚫 Disabled' : market.settlementStrategy.disabled === false ? '✅ Enabled' : 'n/a'}</td>
        <td>${rawValue(market.settlementStrategy.disabled)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>commitmentPriceDelay</td>
        <td>${readableNumber(market.settlementStrategy.commitmentPriceDelay)}</td>
        <td>${rawValue(market.settlementStrategy.commitmentPriceDelay)}</td>
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
  perpsMarkets,
};

if (require.main === module) {
  require('../inspect');
  perpsMarkets().then(prettyMd).then(console.log);
}
