#!/usr/bin/env node

const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

let cachedConfigs = [];

async function getCollateralConfigurations() {
  if (cachedConfigs.length > 0) {
    return cachedConfigs;
  }
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );
  const collateralConfigs = await CoreProxy.getCollateralConfigurations(false);
  for (const config of collateralConfigs) {
    try {
      const contract = new ethers.Contract(
        config.tokenAddress,
        [
          'function symbol() view returns (string)',
          'function name() view returns (string)',
          'function decimals() view returns (uint8)',
        ],
        provider
      );
      const [symbol, name, decimals] = await Promise.all([
        contract.symbol(),
        contract.name(),
        contract.decimals(),
      ]);
      const collateralConfig = {
        symbol,
        name,
        decimals,
        tokenAddress: config.tokenAddress,
        depositingEnabled: config.depositingEnabled,
        issuanceRatioD18: config.issuanceRatioD18,
        liquidationRatioD18: config.liquidationRatioD18,
        liquidationRewardD18: config.liquidationRewardD18,
        oracleNodeId: config.oracleNodeId,
        minDelegationD18: config.minDelegationD18,
      };
      log(collateralConfig);
      cachedConfigs.push(collateralConfig);
    } catch (e) {
      // nevermind
    }
  }
  return cachedConfigs;
}

module.exports = {
  getCollateralConfigurations,
};

if (require.main === module) {
  require('../inspect');
  getCollateralConfigurations().then((data) => console.log(JSON.stringify(data, null, 2)));
}
