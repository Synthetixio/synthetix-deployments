const { ethers } = require('ethers');
const CoreProxyDeployment = require('../deployments/CoreProxy.json');

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
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    provider
  );
  const collateralConfigs = await CoreProxy.getCollateralConfigurations(false);
  for (const config of collateralConfigs) {
    try {
      const contract = new ethers.Contract(
        config.tokenAddress,
        ['function symbol() view returns (string)'],
        provider
      );
      const symbol = await contract.symbol();
      const collateralConfig = {
        symbol,
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
