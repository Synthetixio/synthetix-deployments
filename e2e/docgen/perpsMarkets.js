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

  const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');

  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    provider
  );

  const marketIds = await PerpsMarketProxy.getMarkets();
  log({ marketIds });
  const markets = await Promise.all(
    marketIds
      .map((marketId) => marketId.toNumber())
      .sort()
      .map((id) =>
        PerpsMarketProxy.metadata(id)
          .catch(catcher({}))
          .then(({ name, symbol }) => ({ id, name, symbol }))
      )
  );

  for (const market of markets) {
    out.push(`# Perps Market ${market.symbol} / ${market.name}`);
    out.push('');
    out.push(`Perps market ID: <code>${market.id}</code>`);
    const marketId = market.id;

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

    const SNXUSD_SYNTH_MARKET_ID = 0;
    const maxCollateralAmount = await Promise.resolve()
      .then(() => PerpsMarketProxy.getCollateralConfiguration(SNXUSD_SYNTH_MARKET_ID))
      .catch(catcher());
    log({ maxCollateralAmount });
    table.push(`
      <tr>
        <td>maxCollateralAmount of snxUSD (market <code>${SNXUSD_SYNTH_MARKET_ID}</code>)</td>
        <td>${readableBigWei(maxCollateralAmount)}</td>
        <td>${rawValue(maxCollateralAmount)}</td>
      </tr>
    `);

    const maxMarketSize = await Promise.resolve()
      .then(() => PerpsMarketProxy.getMaxMarketSize(marketId))
      .catch(catcher());
    log({ maxMarketSize });
    table.push(`
      <tr>
        <td>maxMarketSize</td>
        <td>${readableBigWei(maxMarketSize)}</td>
        <td>${rawValue(maxMarketSize)}</td>
      </tr>
    `);

    const maxOpenInterest = await Promise.resolve()
      .then(() => PerpsMarketProxy.maxOpenInterest(marketId))
      .catch(catcher());
    log({ maxOpenInterest });
    table.push(`
      <tr>
        <td>maxOpenInterest</td>
        <td>${readableBigWei(maxOpenInterest)}</td>
        <td>${rawValue(maxOpenInterest)}</td>
      </tr>
    `);

    table.push(`<tr> <td></td> <td></td> <td></td> </tr>`);

    const { skewScale, maxFundingVelocity } = await Promise.resolve()
      .then(() => PerpsMarketProxy.getFundingParameters(marketId))
      .catch(catcher({}));
    log({ skewScale, maxFundingVelocity });
    table.push(`
      <tr>
        <td>skewScale</td>
        <td>${readableBigWei(skewScale)}</td>
        <td>${rawValue(skewScale)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxFundingVelocity</td>
        <td>${readableWei(maxFundingVelocity)}</td>
        <td>${rawValue(maxFundingVelocity)}</td>
      </tr>
    `);

    table.push(`<tr> <td></td> <td></td> <td></td> </tr>`);

    const { makerFee, takerFee } = await Promise.resolve()
      .then(() => PerpsMarketProxy.getOrderFees(marketId))
      .catch(catcher({}));
    log({ makerFee, takerFee });
    table.push(`
      <tr>
        <td>makerFee</td>
        <td>${readableWei(makerFee)}</td>
        <td>${rawValue(makerFee)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>takerFee</td>
        <td>${readableWei(takerFee)}</td>
        <td>${rawValue(takerFee)}</td>
      </tr>
    `);

    table.push(`<tr> <td></td> <td></td> <td></td> </tr>`);

    const {
      initialMarginRatioD18,
      minimumInitialMarginRatioD18,
      maintenanceMarginScalarD18,
      flagRewardRatioD18,
      minimumPositionMargin,
    } = await Promise.resolve()
      .then(() => PerpsMarketProxy.getLiquidationParameters(marketId))
      .catch(catcher({}));
    log({
      initialMarginRatioD18,
      minimumInitialMarginRatioD18,
      maintenanceMarginScalarD18,
      flagRewardRatioD18,
      minimumPositionMargin,
    });
    table.push(`
      <tr>
        <td>initialMarginRatioD18</td>
        <td>${readableWei(initialMarginRatioD18)}</td>
        <td>${rawValue(initialMarginRatioD18)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>minimumInitialMarginRatioD18</td>
        <td>${readableWei(minimumInitialMarginRatioD18)}</td>
        <td>${rawValue(minimumInitialMarginRatioD18)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maintenanceMarginScalarD18</td>
        <td>${readableWei(maintenanceMarginScalarD18)}</td>
        <td>${rawValue(maintenanceMarginScalarD18)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>flagRewardRatioD18</td>
        <td>${readableWei(flagRewardRatioD18)}</td>
        <td>${rawValue(flagRewardRatioD18)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>minimumPositionMargin</td>
        <td>${readableWei(minimumPositionMargin)}</td>
        <td>${rawValue(minimumPositionMargin)}</td>
      </tr>
    `);

    table.push(`<tr> <td></td> <td></td> <td></td> </tr>`);

    const {
      maxLiquidationLimitAccumulationMultiplier,
      maxSecondsInLiquidationWindow,
      maxLiquidationPd,
      endorsedLiquidator,
    } = await Promise.resolve()
      .then(() => PerpsMarketProxy.getMaxLiquidationParameters(marketId))
      .catch(catcher({}));
    log({
      maxLiquidationLimitAccumulationMultiplier,
      maxSecondsInLiquidationWindow,
      maxLiquidationPd,
      endorsedLiquidator,
    });
    table.push(`
      <tr>
        <td>maxLiquidationLimitAccumulationMultiplier</td>
        <td>${readableWei(maxLiquidationLimitAccumulationMultiplier)}</td>
        <td>${rawValue(maxLiquidationLimitAccumulationMultiplier)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxSecondsInLiquidationWindow</td>
        <td>${readableNumber(maxSecondsInLiquidationWindow)}</td>
        <td>${rawValue(maxSecondsInLiquidationWindow)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxLiquidationPd</td>
        <td>${readableWei(maxLiquidationPd)}</td>
        <td>${rawValue(maxLiquidationPd)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>endorsedLiquidator</td>
        <td></td>
        <td>${addrHtmlLink(chainId, endorsedLiquidator)}</td>
      </tr>
    `);

    //      "function getKeeperRewardGuards() view returns (uint256 minKeeperRewardUsd, uint256 minKeeperProfitRatioD18, uint256 maxKeeperRewardUsd, uint256 maxKeeperScalingRatioD18)",

    const {
      minKeeperRewardUsd,
      minKeeperProfitRatioD18,
      maxKeeperRewardUsd,
      maxKeeperScalingRatioD18,
    } = await Promise.resolve()
      .then(() => PerpsMarketProxy.getKeeperRewardGuards())
      .catch(catcher({}));
    log({
      minKeeperRewardUsd,
      minKeeperProfitRatioD18,
      maxKeeperRewardUsd,
      maxKeeperScalingRatioD18,
    });
    table.push(`
      <tr>
        <td>minKeeperRewardUsd</td>
        <td>${readableWei(minKeeperRewardUsd)}</td>
        <td>${rawValue(minKeeperRewardUsd)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>minKeeperProfitRatioD18</td>
        <td>${readableWei(minKeeperProfitRatioD18)}</td>
        <td>${rawValue(minKeeperProfitRatioD18)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxKeeperRewardUsd</td>
        <td>${readableWei(maxKeeperRewardUsd)}</td>
        <td>${rawValue(maxKeeperRewardUsd)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxKeeperScalingRatioD18</td>
        <td>${readableWei(maxKeeperScalingRatioD18)}</td>
        <td>${rawValue(maxKeeperScalingRatioD18)}</td>
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
            <th width="400">Settlement strategy parameter</th>
            <th width="100">Value</th>
            <th width="800">Raw value</th>
          </tr>
        </thead>
        <tbody>
    `);

    const settlementStrategyId = 0;
    const { getPerpsSettlementStrategy } = require('../tasks/getPerpsSettlementStrategy');
    const settlementStrategy = await getPerpsSettlementStrategy({
      marketId,
      settlementStrategyId,
    }).catch(catcher({}));
    log({ settlementStrategy });
    table.push(`
      <tr>
        <td>strategyId</td>
        <td>${readableNumber(settlementStrategyId)}</td>
        <td>${rawValue(settlementStrategyId)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>strategyType</td>
        <td>${
          [
            'PYTH', // 0
          ][settlementStrategy.strategyType] || 'Unknown'
        }</td>
        <td>${rawValue(settlementStrategy.strategyType)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementDelay</td>
        <td>${readableNumber(settlementStrategy.settlementDelay)}</td>
        <td>${rawValue(settlementStrategy.settlementDelay)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementWindowDuration</td>
        <td>${readableNumber(settlementStrategy.settlementWindowDuration)}</td>
        <td>${rawValue(settlementStrategy.settlementWindowDuration)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>priceVerificationContract</td>
        <td></td>
        <td>${addrHtmlLink(chainId, settlementStrategy.priceVerificationContract)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>feedId</td>
        <td></td>
        <td>${rawValue(settlementStrategy.feedId)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementReward</td>
        <td>${readableWei(settlementStrategy.settlementReward)}</td>
        <td>${rawValue(settlementStrategy.settlementReward)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>disabled</td>
        <td>${settlementStrategy.disabled === true ? '🚫 Disabled' : settlementStrategy.disabled === false ? '✅ Enabled' : 'n/a'}</td>
        <td>${rawValue(settlementStrategy.disabled)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>commitmentPriceDelay</td>
        <td>${readableNumber(settlementStrategy.commitmentPriceDelay)}</td>
        <td>${rawValue(settlementStrategy.commitmentPriceDelay)}</td>
      </tr>
    `);

    table.push(`
        </tbody>
      </table>
    `);

    out.push(await prettyHtml(table.join('\n')));
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
