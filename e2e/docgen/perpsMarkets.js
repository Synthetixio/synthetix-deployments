const { ethers } = require('ethers');
const numbro = require('numbro');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const { addrLink } = require('./lib/addrLink');

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

function inlineCode(code) {
  return ['`', code, '`'].join('');
}

function blockCode(code) {
  return ['```', code, '```'].join('\n');
}

function rawNumber(bigNumber) {
  return inlineCode(bigNumber.toString());
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
    out.push(`### ${market.symbol} / ${market.name} (${market.id})`);
    out.push('');
    const marketId = market.id;

    out.push('| Parameter name | Value | Raw | Function');
    out.push('| --- | --- | --- | --- |');

    const maxMarketSize = await PerpsMarketProxy.getMaxMarketSize(marketId);
    log({ maxMarketSize });
    out.push(
      `| ${[
        'maxMarketSize',
        readableBigWei(maxMarketSize),
        rawNumber(maxMarketSize),
        inlineCode(`PerpsMarketProxy.getMaxMarketSize(${marketId})`),
      ].join(' | ')} |`
    );

    const maxOpenInterest = await PerpsMarketProxy.maxOpenInterest(marketId);
    log({ maxOpenInterest });
    out.push(
      `| ${[
        'maxOpenInterest',
        readableBigWei(maxOpenInterest),
        rawNumber(maxOpenInterest),
        inlineCode(`PerpsMarketProxy.maxOpenInterest(${marketId})`),
      ].join(' | ')} |`
    );
    out.push(`| ${['', '', '', ''].join(' | ')} |`);

    const { skewScale, maxFundingVelocity } = await PerpsMarketProxy.getFundingParameters(marketId);
    log({ skewScale, maxFundingVelocity });
    out.push(
      `| ${[
        'skewScale',
        readableBigWei(skewScale),
        rawNumber(skewScale),
        inlineCode(`PerpsMarketProxy.getFundingParameters(${marketId})`),
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'maxFundingVelocity',
        readableBigWei(maxFundingVelocity),
        rawNumber(maxFundingVelocity),
        '',
      ].join(' | ')} |`
    );

    out.push(`| ${['', '', '', ''].join(' | ')} |`);

    const { makerFee, takerFee } = await PerpsMarketProxy.getOrderFees(marketId);
    log({ makerFee, takerFee });
    out.push(
      `| ${[
        'makerFee',
        readableWei(makerFee),
        rawNumber(makerFee),
        inlineCode(`PerpsMarketProxy.getOrderFees(${marketId})`),
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'takerFee',
        readableWei(takerFee),
        rawNumber(takerFee),
        '', //
      ].join(' | ')} |`
    );

    out.push(`| ${['', '', '', ''].join(' | ')} |`);

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
    out.push(
      `| ${[
        'initialMarginRatioD18',
        readableWei(initialMarginRatioD18),
        rawNumber(initialMarginRatioD18),
        inlineCode(`PerpsMarketProxy.getLiquidationParameters(${marketId})`),
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'minimumInitialMarginRatioD18',
        readableWei(minimumInitialMarginRatioD18),
        rawNumber(minimumInitialMarginRatioD18),
        '', //
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'maintenanceMarginScalarD18',
        readableWei(maintenanceMarginScalarD18),
        rawNumber(maintenanceMarginScalarD18),
        '', //
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'flagRewardRatioD18',
        readableWei(flagRewardRatioD18),
        rawNumber(flagRewardRatioD18),
        '', //
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'minimumPositionMargin',
        readableWei(minimumPositionMargin),
        rawNumber(minimumPositionMargin),
        '', //
      ].join(' | ')} |`
    );

    out.push(`| ${['', '', '', ''].join(' | ')} |`);

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
    out.push(
      `| ${[
        'maxLiquidationLimitAccumulationMultiplier',
        readableWei(maxLiquidationLimitAccumulationMultiplier),
        rawNumber(maxLiquidationLimitAccumulationMultiplier),
        inlineCode(`PerpsMarketProxy.getMaxLiquidationParameters(${marketId})`),
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'maxSecondsInLiquidationWindow',
        readableNumber(maxSecondsInLiquidationWindow),
        rawNumber(maxSecondsInLiquidationWindow),
        '', //
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'maxLiquidationPd',
        readableWei(maxLiquidationPd),
        rawNumber(maxLiquidationPd),
        '', //
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'endorsedLiquidator',
        '',
        addrLink(chainId, endorsedLiquidator),
        '', //
      ].join(' | ')} |`
    );

    out.push(`| ${['', '', '', ''].join(' | ')} |`);

    const settlementStrategyId = 0;
    const { getPerpsSettlementStrategy } = require('../tasks/getPerpsSettlementStrategy');
    const settlementStrategy = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
    log({ settlementStrategy });
    out.push(
      `| ${[
        'settlementStrategy.strategyType',
        readableWei(settlementStrategy.strategyType),
        rawNumber(settlementStrategy.strategyType),
        inlineCode(`PerpsMarketProxy.getSettlementStrategy(${marketId}, ${settlementStrategyId})`),
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'settlementStrategy.settlementDelay',
        readableNumber(settlementStrategy.settlementDelay),
        rawNumber(settlementStrategy.settlementDelay),
        '',
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'settlementStrategy.settlementWindowDuration',
        readableNumber(settlementStrategy.settlementWindowDuration),
        rawNumber(settlementStrategy.settlementWindowDuration),
        '', //
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'settlementStrategy.priceVerificationContract',
        '',
        addrLink(chainId, settlementStrategy.priceVerificationContract),
        '', //
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'settlementStrategy.feedId',
        '',
        inlineCode(settlementStrategy.feedId),
        '', //
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'settlementStrategy.settlementReward',
        readableWei(settlementStrategy.settlementReward),
        rawNumber(settlementStrategy.settlementReward),
        '', //
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'settlementStrategy.disabled',
        settlementStrategy.disabled ? 'yes' : 'no',
        JSON.stringify(settlementStrategy.disabled),
        '', //
      ].join(' | ')} |`
    );
    out.push(
      `| ${[
        'settlementStrategy.commitmentPriceDelay',
        readableNumber(settlementStrategy.commitmentPriceDelay),
        rawNumber(settlementStrategy.commitmentPriceDelay),
        '', //
      ].join(' | ')} |`
    );

    //    // TODO: only first fo now
    //    return out.join('\n');
  }

  out.push('');
  out.push('');

  return out.join('\n');
}

module.exports = {
  perpsMarkets,
};
