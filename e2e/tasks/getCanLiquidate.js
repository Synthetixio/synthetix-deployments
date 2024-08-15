#!/usr/bin/env node

const { ethers } = require('ethers');

async function getCanLiquidate({ accountId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );

  return await PerpsMarketProxy.canLiquidate(accountId);
}

module.exports = {
  getCanLiquidate,
};

if (require.main === module) {
  require('../inspect');
  const [accountId] = process.argv.slice(2);
  getCanLiquidate({ accountId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
