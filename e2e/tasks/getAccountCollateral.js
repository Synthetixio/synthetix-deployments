#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');

async function getAccountCollateral({ accountId, symbol }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );

  const [totalDeposited, totalAssigned, totalLocked] = await CoreProxy.getAccountCollateral(
    accountId,
    config.tokenAddress
  );

  return {
    totalDeposited: parseFloat(ethers.utils.formatUnits(totalDeposited)),
    totalAssigned: parseFloat(ethers.utils.formatUnits(totalAssigned)),
    totalLocked: parseFloat(ethers.utils.formatUnits(totalLocked)),
  };
}

module.exports = {
  getAccountCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [accountId, symbol] = process.argv.slice(2);
  getAccountCollateral({ accountId, symbol }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
