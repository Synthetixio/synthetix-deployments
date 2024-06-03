#!/usr/bin/env node

const { ethers } = require('ethers');

async function getBfpDebt({ accountId, marketId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const BfpMarketProxy = new ethers.Contract(
    require('../deployments/BfpMarketProxy.json').address,
    require('../deployments/BfpMarketProxy.json').abi,
    provider
  );

  const { debtUsd } = await BfpMarketProxy.getAccountDigest(accountId, marketId);

  return parseFloat(ethers.utils.formatUnits(debtUsd));
}

module.exports = {
  getBfpDebt,
};

if (require.main === module) {
  require('../inspect');
  const [accountId, marketId] = process.argv.slice(2);
  getBfpDebt({ accountId, marketId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
