#!/usr/bin/env node

const { ethers } = require('ethers');

async function getMarketCollateralValue({ marketId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );

  const marketCollateral = parseFloat(
    ethers.utils.formatUnits(await CoreProxy.getMarketCollateralValue(marketId))
  );

  return marketCollateral;
}

module.exports = {
  getMarketCollateralValue,
};

if (require.main === module) {
  require('../inspect');
  const [marketId] = process.argv.slice(2);
  getMarketCollateralValue({ marketId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
