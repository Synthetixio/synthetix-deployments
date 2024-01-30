#!/usr/bin/env node

const { ethers } = require('ethers');

async function getPerpsSettlementStrategy({ marketId, settlementStrategyId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );

  const strategy = await PerpsMarketProxy.getSettlementStrategy(marketId, settlementStrategyId);

  const {
    strategyType,
    settlementDelay,
    settlementWindowDuration,
    priceVerificationContract,
    feedId,
    settlementReward,
    disabled,
    commitmentPriceDelay,
  } = strategy;

  return {
    strategyType,
    settlementDelay,
    settlementWindowDuration,
    priceVerificationContract,
    feedId,
    settlementReward,
    disabled,
    commitmentPriceDelay,
  };
}

module.exports = {
  getPerpsSettlementStrategy,
};

if (require.main === module) {
  require('../inspect');
  const [marketId, settlementStrategyId] = process.argv.slice(2);
  getPerpsSettlementStrategy({ marketId, settlementStrategyId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
