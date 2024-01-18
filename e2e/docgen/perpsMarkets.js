const { ethers } = require('ethers');
const numbro = require('numbro');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const { addrHtmlLink } = require('./lib/addrLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');

function readableBigWei(bigNumber) {
  return numbro(Number(ethers.utils.formatEther(bigNumber))).format({
    trimMantissa: true,
    thousandSeparated: true,
    average: true,
    mantissa: 2,
    spaceSeparated: true,
  });
}

function readableWei(smallNumber) {
  return numbro(Number(ethers.utils.formatEther(smallNumber))).format({
    trimMantissa: true,
    thousandSeparated: true,
    spaceSeparated: true,
  });
}

function readableBigNumber(bigNumber) {
  return numbro(bigNumber).format({
    trimMantissa: true,
    thousandSeparated: true,
    average: true,
    mantissa: 2,
    spaceSeparated: true,
  });
}

function readableNumber(smallNumber) {
  return numbro(smallNumber).format({
    trimMantissa: true,
    thousandSeparated: true,
    spaceSeparated: true,
  });
}

async function perpsMarkets() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { chainId } = await provider.getNetwork();
  log({ chainId });

  const out = [];
  out.push('## Perps Markets');
  out.push('');

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
      .map((id) => PerpsMarketProxy.metadata(id).then(({ name, symbol }) => ({ id, name, symbol })))
  );

  for (const market of markets) {
    out.push(`### ${market.symbol} / ${market.name}`);
    out.push('');
    out.push(`Market ID: ${market.id}`);
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

    const maxMarketSize = await PerpsMarketProxy.getMaxMarketSize(marketId);
    log({ maxMarketSize });
    table.push(`
      <tr>
        <td>maxMarketSize</td>
        <td>${readableBigWei(maxMarketSize)}</td>
        <td><code>${maxMarketSize}</code></td>
      </tr>
    `);

    const maxOpenInterest = await PerpsMarketProxy.maxOpenInterest(marketId);
    log({ maxOpenInterest });
    table.push(`
      <tr>
        <td>maxOpenInterest</td>
        <td>${readableBigWei(maxOpenInterest)}</td>
        <td><code>${maxOpenInterest}</code></td>
      </tr>
    `);

    table.push(`<tr> <td></td> <td></td> <td></td> </tr>`);

    const { skewScale, maxFundingVelocity } = await PerpsMarketProxy.getFundingParameters(marketId);
    log({ skewScale, maxFundingVelocity });
    table.push(`
      <tr>
        <td>skewScale</td>
        <td>${readableBigWei(skewScale)}</td>
        <td><code>${skewScale}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxFundingVelocity</td>
        <td>${readableWei(maxFundingVelocity)}</td>
        <td><code>${maxFundingVelocity}</code></td>
      </tr>
    `);

    table.push(`<tr> <td></td> <td></td> <td></td> </tr>`);

    const { makerFee, takerFee } = await PerpsMarketProxy.getOrderFees(marketId);
    log({ makerFee, takerFee });
    table.push(`
      <tr>
        <td>makerFee</td>
        <td>${readableWei(makerFee)}</td>
        <td><code>${makerFee}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>takerFee</td>
        <td>${readableWei(takerFee)}</td>
        <td><code>${takerFee}</code></td>
      </tr>
    `);

    table.push(`<tr> <td></td> <td></td> <td></td> </tr>`);

    const {
      initialMarginRatioD18,
      minimumInitialMarginRatioD18,
      maintenanceMarginScalarD18,
      flagRewardRatioD18,
      minimumPositionMargin,
    } = await PerpsMarketProxy.getLiquidationParameters(marketId);
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
        <td><code>${initialMarginRatioD18}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>minimumInitialMarginRatioD18</td>
        <td>${readableWei(minimumInitialMarginRatioD18)}</td>
        <td><code>${minimumInitialMarginRatioD18}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maintenanceMarginScalarD18</td>
        <td>${readableWei(maintenanceMarginScalarD18)}</td>
        <td><code>${maintenanceMarginScalarD18}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>flagRewardRatioD18</td>
        <td>${readableWei(flagRewardRatioD18)}</td>
        <td><code>${flagRewardRatioD18}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>minimumPositionMargin</td>
        <td>${readableWei(minimumPositionMargin)}</td>
        <td><code>${minimumPositionMargin}</code></td>
      </tr>
    `);

    table.push(`<tr> <td></td> <td></td> <td></td> </tr>`);

    const {
      maxLiquidationLimitAccumulationMultiplier,
      maxSecondsInLiquidationWindow,
      maxLiquidationPd,
      endorsedLiquidator,
    } = await PerpsMarketProxy.getMaxLiquidationParameters(marketId);
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
        <td><code>${maxLiquidationLimitAccumulationMultiplier}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxSecondsInLiquidationWindow</td>
        <td>${readableNumber(maxSecondsInLiquidationWindow)}</td>
        <td><code>${maxSecondsInLiquidationWindow}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>maxLiquidationPd</td>
        <td>${readableWei(maxLiquidationPd)}</td>
        <td><code>${maxLiquidationPd}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>endorsedLiquidator</td>
        <td></td>
        <td>${addrHtmlLink(chainId, endorsedLiquidator)}</td>
      </tr>
    `);

    table.push(`<tr> <td></td> <td></td> <td></td> </tr>`);

    const settlementStrategyId = 0;
    const { getPerpsSettlementStrategy } = require('../tasks/getPerpsSettlementStrategy');
    const settlementStrategy = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
    log({ settlementStrategy });
    table.push(`
      <tr>
        <td>settlementStrategy.strategyType</td>
        <td>${readableWei(settlementStrategy.strategyType)}</td>
        <td><code>${settlementStrategy.strategyType}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementStrategy.settlementDelay</td>
        <td>${readableNumber(settlementStrategy.settlementDelay)}</td>
        <td><code>${settlementStrategy.settlementDelay}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementStrategy.settlementWindowDuration</td>
        <td>${readableNumber(settlementStrategy.settlementWindowDuration)}</td>
        <td><code>${settlementStrategy.settlementWindowDuration}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementStrategy.priceVerificationContract</td>
        <td></td>
        <td>${addrHtmlLink(chainId, settlementStrategy.priceVerificationContract)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementStrategy.feedId</td>
        <td></td>
        <td><code>${settlementStrategy.feedId}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementStrategy.settlementReward</td>
        <td>${readableWei(settlementStrategy.settlementReward)}</td>
        <td><code>${settlementStrategy.settlementReward}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementStrategy.feedId</td>
        <td>${settlementStrategy.disabled ? 'disabled' : ''}</td>
        <td><code>${JSON.stringify(settlementStrategy.disabled)}</code></td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>settlementStrategy.commitmentPriceDelay</td>
        <td>${readableNumber(settlementStrategy.commitmentPriceDelay)}</td>
        <td><code>${settlementStrategy.commitmentPriceDelay}</code></td>
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
