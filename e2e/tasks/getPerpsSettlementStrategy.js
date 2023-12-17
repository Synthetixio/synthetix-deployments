#!/usr/bin/env node

const { ethers } = require('ethers');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');

async function getPerpsSettlementStrategy({ marketId, settlementStrategyId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    provider
  );

  const [
    strategyType,
    settlementDelay,
    settlementWindowDuration,
    priceVerificationContract,
    feedId,
    settlementReward,
    disabled,
    commitmentPriceDelay,
  ] = await PerpsMarketProxy.getSettlementStrategy(marketId, settlementStrategyId);

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
  const [marketId, settlementStrategyId] = process.argv.slice(2);
  getPerpsSettlementStrategy({ marketId, settlementStrategyId }).then(console.log);
}
