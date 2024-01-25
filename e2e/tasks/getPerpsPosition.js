#!/usr/bin/env node

const { ethers } = require('ethers');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');

async function getPerpsPosition({ accountId, marketId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    provider
  );

  const [totalPnl, accruedFunding, positionSize] = await PerpsMarketProxy.getOpenPosition(
    accountId,
    marketId
  );

  return {
    totalPnl: parseFloat(ethers.utils.formatUnits(totalPnl)),
    accruedFunding: parseFloat(ethers.utils.formatUnits(accruedFunding)),
    positionSize: parseFloat(ethers.utils.formatUnits(positionSize)),
  };
}

module.exports = {
  getPerpsPosition,
};

if (require.main === module) {
  require('../inspect');
  const [accountId, marketId] = process.argv.slice(2);
  getPerpsPosition({ accountId, marketId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
