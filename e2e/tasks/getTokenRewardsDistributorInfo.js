#!/usr/bin/env node

const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getTokenRewardsDistributorInfo({ distributorAddress }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const RewardsDistributor = new ethers.Contract(
    distributorAddress,
    [
      'function name() view returns (string)',
      'function poolId() view returns (uint128)',
      'function collateralType() view returns (address)',
      'function payoutToken() view returns (address)',
      'function precision() view returns (uint256)',
      'function token() view returns (address)',
      'function rewardManager() view returns (address)',
      'function shouldFailPayout() view returns (bool)',
    ],
    provider
  );
  const [
    name,
    poolId,
    collateralType,
    payoutToken,
    precision,
    token,
    rewardManager,
    shouldFailPayout,
  ] = await Promise.all([
    RewardsDistributor.name().catch(() => null),
    RewardsDistributor.poolId().catch(() => null),
    RewardsDistributor.collateralType().catch(() => null),
    RewardsDistributor.payoutToken().catch(() => null),
    RewardsDistributor.precision().catch(() => null),
    RewardsDistributor.token().catch(() => null),
    RewardsDistributor.rewardManager().catch(() => null),
    RewardsDistributor.shouldFailPayout().catch(() => null),
  ]);

  log({
    name,
    poolId,
    collateralType,
    payoutToken,
    precision,
    token,
    rewardManager,
    shouldFailPayout,
  });

  return {
    name,
    poolId,
    collateralType,
    payoutToken,
    precision,
    token,
    rewardManager,
    shouldFailPayout,
  };
}

module.exports = {
  getTokenRewardsDistributorInfo,
};

if (require.main === module) {
  require('../inspect');
  const [distributorAddress] = process.argv.slice(2);
  getTokenRewardsDistributorInfo({ distributorAddress }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
