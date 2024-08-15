#!/usr/bin/env node

const { ethers } = require('ethers');

async function getAvailableMargin({ accountId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );

  return parseFloat(ethers.utils.formatUnits(await PerpsMarketProxy.getAvailableMargin(accountId)));
}

module.exports = {
  getAvailableMargin,
};

if (require.main === module) {
  require('../inspect');
  const [accountId] = process.argv.slice(2);
  getAvailableMargin({ accountId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
