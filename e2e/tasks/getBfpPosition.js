#!/usr/bin/env node

const { ethers } = require('ethers');

async function getBfpPosition({ accountId, marketId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const BfpMarketProxy = new ethers.Contract(
    require('../deployments/BfpMarketProxy.json').address,
    require('../deployments/BfpMarketProxy.json').abi,
    provider
  );

  const { pnl, accruedFunding, size } = await BfpMarketProxy.getPositionDigest(accountId, marketId);

  return {
    pnl: parseFloat(ethers.utils.formatUnits(pnl)),
    accruedFunding: parseFloat(ethers.utils.formatUnits(accruedFunding)),
    positionSize: parseFloat(ethers.utils.formatUnits(size)),
  };
}

module.exports = {
  getBfpPosition,
};

if (require.main === module) {
  require('../inspect');
  const [accountId, marketId] = process.argv.slice(2);
  getBfpPosition({ accountId, marketId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
