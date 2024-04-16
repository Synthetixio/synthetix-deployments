#!/usr/bin/env node

const { ethers } = require('ethers');
const { doPriceUpdate } = require('./doPriceUpdate');
const { syncTime } = require('./syncTime');

async function doAllPriceUpdates({ wallet }) {
  // We must sync timestamp of the fork before making price updates
  await syncTime();

  // delegating collateral and views requiring price will fail if there's no price update within the last hour,
  // so we send off a price update just to be safe
  await doPriceUpdate({
    wallet,
    marketId: 100,
    settlementStrategyId: require('../deployments/extras.json').eth_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 200,
    settlementStrategyId: require('../deployments/extras.json').btc_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 300,
    settlementStrategyId: require('../deployments/extras.json').snx_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 400,
    settlementStrategyId: require('../deployments/extras.json').sol_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 500,
    settlementStrategyId: require('../deployments/extras.json').wif_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 600,
    settlementStrategyId: require('../deployments/extras.json').w_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 700,
    settlementStrategyId: require('../deployments/extras.json').ena_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 800,
    settlementStrategyId: require('../deployments/extras.json').doge_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 900,
    settlementStrategyId: require('../deployments/extras.json').avax_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 1000,
    settlementStrategyId: require('../deployments/extras.json').op_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 1100,
    settlementStrategyId: require('../deployments/extras.json').ordi_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 1200,
    settlementStrategyId: require('../deployments/extras.json').pepe_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 1300,
    settlementStrategyId: require('../deployments/extras.json').rune_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 1400,
    settlementStrategyId: require('../deployments/extras.json').bonk_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 1500,
    settlementStrategyId: require('../deployments/extras.json').ftm_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 1600,
    settlementStrategyId: require('../deployments/extras.json').arb_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 1700,
    settlementStrategyId: require('../deployments/extras.json').matic_pyth_settlement_strategy,
  });
  await doPriceUpdate({
    wallet,
    marketId: 1800,
    settlementStrategyId: require('../deployments/extras.json').bnb_pyth_settlement_strategy,
  });
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
