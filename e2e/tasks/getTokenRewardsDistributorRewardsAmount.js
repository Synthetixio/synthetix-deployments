#!/usr/bin/env node

const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getTokenRewardsDistributorRewardsAmount({ distributorAddress }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const RewardsDistributor = new ethers.Contract(
    distributorAddress,
    ['function rewardsAmount() view returns (uint256)'],
    provider
  );
  const rewardsAmount = await RewardsDistributor.rewardsAmount().catch(() => null);
  log({ rewardsAmount });

  return parseFloat(ethers.utils.formatEther(rewardsAmount));
}

module.exports = {
  getTokenRewardsDistributorRewardsAmount,
};

if (require.main === module) {
  require('../inspect');
  const [distributorAddress] = process.argv.slice(2);
  getTokenRewardsDistributorRewardsAmount({ distributorAddress }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
