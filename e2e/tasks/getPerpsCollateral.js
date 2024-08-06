#!/usr/bin/env node

const { ethers } = require('ethers');

async function getPerpsCollateral({ accountId, marketId }) {
  marketId = marketId || 0;

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );

  return parseFloat(
    ethers.utils.formatUnits(await PerpsMarketProxy.getCollateralAmount(accountId, marketId))
  );
}

module.exports = {
  getPerpsCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [accountId] = process.argv.slice(2);
  getPerpsCollateral({ accountId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
