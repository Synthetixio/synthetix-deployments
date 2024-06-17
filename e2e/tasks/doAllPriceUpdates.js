#!/usr/bin/env node

const { ethers } = require('ethers');
const { doPriceUpdate } = require('./doPriceUpdate');
const { syncTime } = require('./syncTime');

async function doAllPriceUpdates({ wallet }) {
  const extras = require('../deployments/extras.json');

  // We must sync timestamp of the fork before making price updates
  await syncTime();

  // pull all the market ids and settlement strategies from extras.json
  const settlementStrategyKeys = Object.keys(extras).filter((key) =>
    key.endsWith('_pyth_settlement_strategy')
  );

  // iterate over all the markets and update their prices
  for (const settlementStrategyKey of settlementStrategyKeys) {
    const marketKey = settlementStrategyKey.replace('_pyth_settlement_strategy', '');
    const marketKeyCapitalized = marketKey.charAt(0).toUpperCase() + marketKey.slice(1);

    // get the market id and settlement strategy id from extras.json, there are two different naming conventions
    const marketId =
      extras[`${marketKey}PerpsMarketId`] || extras[`perps${marketKeyCapitalized}MarketId`];

    await doPriceUpdate({
      wallet,
      marketId,
      settlementStrategyId: extras[settlementStrategyKey],
    });
  }
}

module.exports = {
  doAllPriceUpdates,
};

if (require.main === module) {
  require('../inspect');
  const [pk] = process.argv.slice(2);
  if (!pk) {
    const bin = `./${require('path').basename(__filename)}`;
    throw new Error(
      [
        //
        'Usage:',
        `  ${bin} $PK`,
        '',
      ].join('\n')
    );
  }
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);
  doAllPriceUpdates({
    wallet,
  }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
