#!/usr/bin/env node

const { ethers } = require('ethers');
const CoreProxyDeployment = require('../deployments/CoreProxy.json');

async function getCollateralConfiguration(address) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    provider
  );
  const config = await CoreProxy.getCollateralConfiguration(address);
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

  return collateralConfig;
}

module.exports = {
  getCollateralConfiguration,
};

if (require.main === module) {
  require('../inspect');
  const [address] = process.argv.slice(2);
  getCollateralConfiguration(address).then(console.log);
}
