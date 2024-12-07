#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getAvailablePoolRewards({ distributorAddress, accountId, poolId, collateralType }) {
  log({ distributorAddress, accountId, poolId, collateralType });
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );

  const availableRewards = await CoreProxy.callStatic
    .getAvailablePoolRewards(accountId, poolId, collateralType, distributorAddress)
    .catch(parseError);
  log({ availableRewards });

  return parseFloat(ethers.utils.formatEther(availableRewards));
}

module.exports = {
  getAvailablePoolRewards,
};

if (require.main === module) {
  require('../inspect');
  const [distributorAddress, accountId, poolId, collateralType] = process.argv.slice(2);
  getAvailablePoolRewards({ distributorAddress, accountId, poolId, collateralType }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
