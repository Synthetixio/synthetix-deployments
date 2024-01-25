#!/usr/bin/env node

const { ethers } = require('ethers');

async function getSpotSettlementStrategy({ synthMarketId, settlementStrategyId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const SpotMarketProxy = new ethers.Contract(
    require('../deployments/SpotMarketProxy.json').address,
    require('../deployments/SpotMarketProxy.json').abi,
    provider
  );

  const strategy = await SpotMarketProxy.getSettlementStrategy(synthMarketId, settlementStrategyId);

  const {
    strategyType,
    settlementDelay,
    settlementWindowDuration,
    priceVerificationContract,
    feedId,
    url,
    settlementReward,
    priceDeviationTolerance,
    minimumUsdExchangeAmount,
    maxRoundingLoss,
    disabled,
  } = strategy;

  return {
    strategyType,
    settlementDelay,
    settlementWindowDuration,
    priceVerificationContract,
    feedId,
    url,
    settlementReward,
    priceDeviationTolerance,
    minimumUsdExchangeAmount,
    maxRoundingLoss,
    disabled,
  };
}

module.exports = {
  getSpotSettlementStrategy,
};

if (require.main === module) {
  require('../inspect');
  const [synthMarketId, settlementStrategyId] = process.argv.slice(2);
  getSpotSettlementStrategy({ synthMarketId, settlementStrategyId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
