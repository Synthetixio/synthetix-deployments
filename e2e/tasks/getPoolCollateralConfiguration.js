#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');

async function getPoolCollateralConfiguration({ poolId, tokenAddress }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );

  const args = [
    //
    poolId,
    tokenAddress,
  ];
  const collateralConfig = await CoreProxy.getPoolCollateralConfiguration(...args).catch(
    parseError
  );
  return {
    collateralLimit: parseFloat(ethers.utils.formatUnits(collateralConfig.collateralLimitD18, 18)),
    issuanceRatio: parseFloat(ethers.utils.formatUnits(collateralConfig.issuanceRatioD18, 18)),
    collateralLimitD18: collateralConfig.collateralLimitD18,
    issuanceRatioD18: collateralConfig.issuanceRatioD18,
  };
}

module.exports = {
  getPoolCollateralConfiguration,
};

// getPoolCollateralConfiguration 1 0x7b356eEdABc1035834cd1f714658627fcb4820E3
if (require.main === module) {
  require('../inspect');
  const [poolId, tokenAddress] = process.argv.slice(2);
  getPoolCollateralConfiguration({ poolId, tokenAddress }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
