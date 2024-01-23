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

async function synthMarkets() {
  const extras = require('../deployments/extras.json');
  const SYNTH_MARKET_IDS = [
    // We cannot get the list of markets from contract, can only hardcode it
    extras.synth_usdc_market_id,
    extras.synth_btc_market_id,
    extras.synth_eth_market_id,
    extras.synth_link_market_id,
  ].filter(Boolean);

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const network = await provider.getNetwork();
  const { name, version, preset, chainId = network.chainId } = require('../deployments/meta.json');
  log({ name, version, preset, chainId });

  const out = [];

  const SpotMarketProxyDeployment = require('../deployments/SpotMarketProxy.json');
  const SpotMarketProxy = new ethers.Contract(
    SpotMarketProxyDeployment.address,
    SpotMarketProxyDeployment.abi,
    provider
  );

  for (const synthMarketId of SYNTH_MARKET_IDS) {
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

    const minimumCredit = await Promise.resolve()
      .then(() => SpotMarketProxy.minimumCredit(synthMarketId))
      .catch(catcher());
    log({ minimumCredit });
    table.push(`
      <tr>
        <td>minimumCredit</td>
        <td>${readableWei(minimumCredit)}</td>
        <td>${rawValue(minimumCredit)}</td>
      </tr>
    `);

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
        <td>${readableWei(skewScale)}</td>
        <td>${rawValue(skewScale)}</td>
      </tr>
    `);

    table.push(`
        </tbody>
      </table>
    `);

    //        "function getSettlementStrategy(uint128 marketId, uint256 strategyId) view returns (tuple(uint8 strategyType, uint256 settlementDelay, uint256 settlementWindowDuration, address priceVerificationContract, bytes32 feedId, string url, uint256 settlementReward, uint256 priceDeviationTolerance, uint256 minimumUsdExchangeAmount, uint256 maxRoundingLoss, bool disabled) settlementStrategy)",

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
