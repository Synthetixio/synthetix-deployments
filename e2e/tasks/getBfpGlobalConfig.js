#!/usr/bin/env node

const { ethers } = require('ethers');

async function getBfpGlobalConfig() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const BfpMarketProxy = new ethers.Contract(
    require('../deployments/BfpMarketProxy.json').address,
    require('../deployments/BfpMarketProxy.json').abi,
    provider
  );

  const rawConfig = await BfpMarketProxy.getMarketConfiguration();
  return {
    pyth: rawConfig.pyth,
    ethOracleNodeId: rawConfig.ethOracleNodeId,
    rewardDistributorImplementation: rawConfig.rewardDistributorImplementation,
    pythPublishTimeMin: rawConfig.pythPublishTimeMin.toNumber(),
    pythPublishTimeMax: rawConfig.pythPublishTimeMax.toNumber(),
    minOrderAge: rawConfig.minOrderAge.toNumber(),
    maxOrderAge: rawConfig.maxOrderAge.toNumber(),
    minKeeperFeeUsd: ethers.utils.formatUnits(rawConfig.minKeeperFeeUsd),
    maxKeeperFeeUsd: ethers.utils.formatUnits(rawConfig.maxKeeperFeeUsd),
    keeperProfitMarginUsd: ethers.utils.formatUnits(rawConfig.keeperProfitMarginUsd),
    keeperProfitMarginPercent: ethers.utils.formatUnits(rawConfig.keeperProfitMarginPercent),
    keeperSettlementGasUnits: rawConfig.keeperSettlementGasUnits.toNumber(),
    keeperCancellationGasUnits: rawConfig.keeperCancellationGasUnits.toNumber(),
    keeperLiquidationGasUnits: rawConfig.keeperLiquidationGasUnits.toNumber(),
    keeperFlagGasUnits: rawConfig.keeperFlagGasUnits.toNumber(),
    keeperLiquidateMarginGasUnits: rawConfig.keeperLiquidateMarginGasUnits.toNumber(),
    keeperLiquidationEndorsed: rawConfig.keeperLiquidationEndorsed,
    collateralDiscountScalar: ethers.utils.formatUnits(rawConfig.collateralDiscountScalar),
    minCollateralDiscount: ethers.utils.formatUnits(rawConfig.minCollateralDiscount),
    maxCollateralDiscount: ethers.utils.formatUnits(rawConfig.maxCollateralDiscount),
    utilizationBreakpointPercent: ethers.utils.formatUnits(rawConfig.utilizationBreakpointPercent),
    lowUtilizationSlopePercent: ethers.utils.formatUnits(rawConfig.lowUtilizationSlopePercent),
    highUtilizationSlopePercent: ethers.utils.formatUnits(rawConfig.highUtilizationSlopePercent),
  };
}

module.exports = {
  getBfpGlobalConfig,
};

if (require.main === module) {
  require('../inspect');
  getBfpGlobalConfig().then((data) => console.log(JSON.stringify(data, null, 2)));
}
