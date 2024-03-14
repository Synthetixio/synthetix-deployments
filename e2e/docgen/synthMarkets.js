const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { addrHtmlLink } = require('./lib/addrLink');
const { prettyMd, prettyHtml } = require('./lib/pretty');
const { readableBigWei, readableWei, readableNumber, rawValue } = require('./lib/numbers');
const { getSynthMarketIds, getSettlementStrategyId } = require('./lib/getSynthMarketIds');

function catcher(value = undefined) {
  return (error) => {
    log({ error: error });
    console.error(error);
    return value;
  };
}

async function synthMarkets() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const network = await provider.getNetwork();
  const { name, version, preset, chainId = network.chainId } = require('../deployments/meta.json');
  log({ name, version, preset, chainId });

  const synthMarketIds = await getSynthMarketIds();
  log({ synthMarketIds });
  if (synthMarketIds.length < 1) {
    return '';
  }

  const out = [];

  const SpotMarketProxyDeployment = require('../deployments/SpotMarketProxy.json');
  const SpotMarketProxy = new ethers.Contract(
    SpotMarketProxyDeployment.address,
    SpotMarketProxyDeployment.abi,
    provider
  );

  for (const synthMarketId of synthMarketIds) {
    const name = await SpotMarketProxy.name(synthMarketId).catch(catcher());
    log({ synthMarketId, name });

    out.push(`# Synth market \`${synthMarketId}\` ${name}`);

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
        <td>synthMarketId</td>
        <td>${readableNumber(synthMarketId)}</td>
        <td>${rawValue(synthMarketId)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>name</td>
        <td></td>
        <td>${rawValue(name)}</td>
      </tr>
    `);

    const synthAddress = await SpotMarketProxy.getSynth(synthMarketId).catch(catcher());
    const contract = new ethers.Contract(
      synthAddress,
      [
        'function symbol() view returns (string)',
        'function name() view returns (string)',
        'function decimals() view returns (uint8)',
      ],
      provider
    );
    const [synthSymbol, synthName, synthDecimals] = await Promise.all([
      contract.symbol(),
      contract.name(),
      contract.decimals(),
    ]);
    log({ synthSymbol, synthName, synthDecimals, synthAddress });
    table.push(`
      <tr>
        <td>synthSymbol</td>
        <td></td>
        <td>${rawValue(synthSymbol)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>synthName</td>
        <td></td>
        <td>${rawValue(synthName)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>synthDecimals</td>
        <td>${synthDecimals}</td>
        <td>${rawValue(synthDecimals)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>synthAddress</td>
        <td></td>
        <td>${addrHtmlLink(chainId, synthAddress)}</td>
      </tr>
    `);

    const implAddress = await Promise.resolve()
      .then(() => SpotMarketProxy.getSynthImpl(synthMarketId))
      .catch(catcher());
    log({ implAddress });
    table.push(`
      <tr>
        <td>implementationAddress</td>
        <td></td>
        <td>${addrHtmlLink(chainId, implAddress)}</td>
      </tr>
    `);

    const collateralLeverage = await Promise.resolve()
      .then(() => SpotMarketProxy.getCollateralLeverage(synthMarketId))
      .catch(catcher());
    log({ collateralLeverage });
    table.push(`
      <tr>
        <td>collateralLeverage</td>
        <td>${readableWei(collateralLeverage)}</td>
        <td>${rawValue(collateralLeverage)}</td>
      </tr>
    `);

    // This is a dynamic value
    //const minimumCredit = await Promise.resolve()
    //  .then(() => SpotMarketProxy.minimumCredit(synthMarketId))
    //  .catch(catcher());
    //log({ minimumCredit });
    //table.push(`
    //  <tr>
    //    <td>minimumCredit</td>
    //    <td>${readableBigWei(minimumCredit)}</td>
    //    <td>${rawValue(minimumCredit)}</td>
    //  </tr>
    //`);

    const feeCollector = await Promise.resolve()
      .then(() => SpotMarketProxy.getFeeCollector(synthMarketId))
      .catch(catcher());
    log({ feeCollector });
    table.push(`
      <tr>
        <td>feeCollector</td>
        <td></td>
        <td>${addrHtmlLink(chainId, feeCollector)}</td>
      </tr>
    `);

    const { atomicFixedFee, asyncFixedFee, wrapFee, unwrapFee } = await Promise.resolve()
      .then(() => SpotMarketProxy.getMarketFees(synthMarketId))
      .catch(catcher({}));
    log({ atomicFixedFee, asyncFixedFee, wrapFee, unwrapFee });
    table.push(`
      <tr>
        <td>atomicFixedFee</td>
        <td>${readableWei(atomicFixedFee)}</td>
        <td>${rawValue(atomicFixedFee)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>asyncFixedFee</td>
        <td>${readableWei(asyncFixedFee)}</td>
        <td>${rawValue(asyncFixedFee)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>wrapFee</td>
        <td>${readableWei(wrapFee)}</td>
        <td>${rawValue(wrapFee)}</td>
      </tr>
    `);
    table.push(`
      <tr>
        <td>unwrapFee</td>
        <td>${readableWei(unwrapFee)}</td>
        <td>${rawValue(unwrapFee)}</td>
      </tr>
    `);

    const utilizationFeeRate = await Promise.resolve()
      .then(() => SpotMarketProxy.getMarketUtilizationFees(synthMarketId))
      .catch(catcher());
    log({ utilizationFeeRate });
    table.push(`
      <tr>
        <td>utilizationFeeRate</td>
        <td>${readableWei(utilizationFeeRate)}</td>
        <td>${rawValue(utilizationFeeRate)}</td>
      </tr>
    `);

    const skewScale = await Promise.resolve()
      .then(() => SpotMarketProxy.getMarketSkewScale(synthMarketId))
      .catch(catcher());
    log({ skewScale });
    table.push(`
      <tr>
        <td>skewScale</td>
        <td>${readableBigWei(skewScale)}</td>
        <td>${rawValue(skewScale)}</td>
      </tr>
    `);

    table.push(`
        </tbody>
      </table>
    `);

    const settlementStrategyId = getSettlementStrategyId(synthMarketId) || 0;
    if (settlementStrategyId !== undefined && settlementStrategyId !== null) {
      const { getSpotSettlementStrategy } = require('../tasks/getSpotSettlementStrategy');
      const settlementStrategy = await getSpotSettlementStrategy({
        synthMarketId,
        settlementStrategyId,
      }).catch(catcher());
      log({ settlementStrategy });

      if (settlementStrategy) {
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

        table.push(`
          <tr>
            <td>settlementStrategyId</td>
            <td>${readableNumber(settlementStrategyId)}</td>
            <td>${rawValue(settlementStrategyId)}</td>
          </tr>
        `);
        table.push(`
          <tr>
            <td>strategyType</td>
            <td>${
              [
                'ONCHAIN', // 0
                'PYTH', // 1
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
            <td>url</td>
            <td></td>
            <td>${rawValue(settlementStrategy.url)}</td>
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
            <td>priceDeviationTolerance</td>
            <td>${readableWei(settlementStrategy.priceDeviationTolerance)}</td>
            <td>${rawValue(settlementStrategy.priceDeviationTolerance)}</td>
          </tr>
        `);
        table.push(`
          <tr>
            <td>minimumUsdExchangeAmount</td>
            <td>${readableWei(settlementStrategy.minimumUsdExchangeAmount)}</td>
            <td>${rawValue(settlementStrategy.minimumUsdExchangeAmount)}</td>
          </tr>
        `);
        table.push(`
          <tr>
            <td>maxRoundingLoss</td>
            <td>${readableWei(settlementStrategy.maxRoundingLoss)}</td>
            <td>${rawValue(settlementStrategy.maxRoundingLoss)}</td>
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
            </tbody>
          </table>
        `);
      }
    }
    out.push(await prettyHtml(table.join('\n')));
  }

  out.push('');
  out.push('');
  return out.join('\n');
}

module.exports = {
  synthMarkets,
};

if (require.main === module) {
  require('../inspect');
  synthMarkets().then(prettyMd).then(console.log);
}
