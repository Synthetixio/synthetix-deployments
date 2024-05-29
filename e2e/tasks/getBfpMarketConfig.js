#!/usr/bin/env node

const { ethers } = require('ethers');

async function getBfpMarketConfig({ marketId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const BfpMarketProxy = new ethers.Contract(
    require('../deployments/BfpMarketProxy.json').address,
    require('../deployments/BfpMarketProxy.json').abi,
    provider
  );

  const rawConfig = await BfpMarketProxy.getMarketConfigurationById(marketId);
  return {
    oracleNodeId: rawConfig.oracleNodeId.toString(),
    pythPriceFeedId: rawConfig.pythPriceFeedId.toString(),
    makerFee: parseFloat(ethers.utils.formatUnits(rawConfig.makerFee)),
    takerFee: parseFloat(ethers.utils.formatUnits(rawConfig.takerFee)),
    maxMarketSize: parseFloat(ethers.utils.formatUnits(rawConfig.maxMarketSize)),
    maxFundingVelocity: parseFloat(ethers.utils.formatUnits(rawConfig.maxFundingVelocity)),
    skewScale: parseFloat(ethers.utils.formatUnits(rawConfig.skewScale)),
    fundingVelocityClamp: parseFloat(ethers.utils.formatUnits(rawConfig.fundingVelocityClamp)),
    minCreditPercent: parseFloat(ethers.utils.formatUnits(rawConfig.minCreditPercent)),
    minMarginUsd: parseFloat(ethers.utils.formatUnits(rawConfig.minMarginUsd)),
    minMarginRatio: parseFloat(ethers.utils.formatUnits(rawConfig.minMarginRatio)),
    incrementalMarginScalar: parseFloat(
      ethers.utils.formatUnits(rawConfig.incrementalMarginScalar)
    ),
    maintenanceMarginScalar: parseFloat(
      ethers.utils.formatUnits(rawConfig.maintenanceMarginScalar)
    ),
    maxInitialMarginRatio: parseFloat(ethers.utils.formatUnits(rawConfig.maxInitialMarginRatio)),
    liquidationRewardPercent: parseFloat(
      ethers.utils.formatUnits(rawConfig.liquidationRewardPercent)
    ),
    liquidationLimitScalar: parseFloat(ethers.utils.formatUnits(rawConfig.liquidationLimitScalar)),
    liquidationWindowDuration: parseFloat(
      ethers.utils.formatUnits(rawConfig.liquidationWindowDuration)
    ),
    liquidationMaxPd: parseFloat(ethers.utils.formatUnits(rawConfig.liquidationMaxPd)),
  };
}

module.exports = {
  getBfpMarketConfig,
};

if (require.main === module) {
  require('../inspect');
  const [marketId] = process.argv.slice(2);
  getBfpMarketConfig({ marketId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
