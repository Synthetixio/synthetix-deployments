const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

function extractRewardsDistributors() {
  const cannon = require('../../deployments/cannon.json');

  const rewardDistributors = [];
  for (const [key, value] of Object.entries(cannon.state)) {
    if (key.startsWith('provision.')) {
      const [, artifactName] = key.split('.');
      const rewardsDistributor =
        value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributor;
      if (rewardsDistributor) {
        log({
          RewardsDistributor: {
            address: rewardsDistributor.address,
            constructorArgs: rewardsDistributor.constructorArgs,
            deployTxnHash: rewardsDistributor.deployTxnHash,
          },
        });
        const [rewardManager, poolId, collateralType, payoutToken, payoutTokenDecimals, name] =
          rewardsDistributor.constructorArgs;
        rewardDistributors.push({
          address: rewardsDistributor.address,
          name,
          poolId,
          collateralType,
          payoutToken,
          rewardManager,
          payoutTokenDecimals,
          deployTxn: rewardsDistributor.deployTxnHash,
          isRegistered: false,
        });
      }
    }
  }

  // walk over all the registration invokes and set isRegistered flag for deployed distributors
  for (const [key, value] of Object.entries(cannon.state)) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.RewardsDistributorRegistered;
      if (events && events.length === 1) {
        log({ RewardsDistributorRegistered: events[0] });
        // can only have one RewardsDistributorRegistered event
        const [poolId, collateralType, address] = events[0].args;
        for (const rewardDistributor of rewardDistributors) {
          if (
            `${rewardDistributor.poolId}` === `${poolId}` &&
            `${rewardDistributor.collateralType}`.toLowerCase() ===
              `${collateralType}`.toLowerCase() &&
            `${rewardDistributor.address}`.toLowerCase() === `${address}`.toLowerCase()
          ) {
            rewardDistributor.isRegistered = true;
          }
        }
      }
    }
  }
  return rewardDistributors;
}

module.exports = {
  extractRewardsDistributors,
};
