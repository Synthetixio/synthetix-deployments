#!/usr/bin/env node

const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getTokenRewardsDistributorRewardsAmount({ distributorAddress }) {
  log({ distributorAddress });
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const RewardsDistributor = new ethers.Contract(
    distributorAddress,
    [
      'function payoutToken() view returns (address)',
      'function rewardsAmount() view returns (uint256)',
      'function rewardedAmount() view returns (uint256)',
    ],
    provider
  );
  const [payoutToken, rewardsAmount, rewardedAmount] = await Promise.all([
    RewardsDistributor.payoutToken().catch(() => null),
    RewardsDistributor.rewardsAmount().catch(() => null),
    RewardsDistributor.rewardedAmount().catch(() => null),
  ]);
  log({ payoutToken, rewardsAmount, rewardedAmount });

  const Token = new ethers.Contract(
    payoutToken,
    ['function decimals() view returns (uint8)'],
    provider
  );
  const decimals = await Token.decimals().catch(() => null);

  return parseFloat(ethers.utils.formatUnits(rewardsAmount || rewardedAmount, decimals));
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
