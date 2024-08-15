#!/usr/bin/env node

const { ethers } = require('ethers');

async function getLiquidationParameters({ marketId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );

  return await PerpsMarketProxy.getLiquidationParameters(marketId);
}

module.exports = {
  getLiquidationParameters,
};

if (require.main === module) {
  require('../inspect');
  const [marketId] = process.argv.slice(2);
  getLiquidationParameters({ marketId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
