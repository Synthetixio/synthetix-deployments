#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const CoreProxyDeployment = require('../deployments/CoreProxy.json');

async function getMaximumMarketCollateral({ marketId, symbol }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    provider
  );

  const config = await getCollateralConfig(symbol);

  const maximumMarketCollateral = parseFloat(
    ethers.utils.formatUnits(
      await CoreProxy.getMaximumMarketCollateral(marketId, config.tokenAddress)
    )
  );

  return maximumMarketCollateral;
}

module.exports = {
  getMaximumMarketCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [marketId, symbol] = process.argv.slice(2);
  getMaximumMarketCollateral({ marketId, symbol }).then(console.log);
}
