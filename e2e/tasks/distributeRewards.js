#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function distributeRewards({
  wallet,
  distributorAddress,
  poolId,
  collateralType,
  amount,
  start,
  duration,
}) {
  const RewardsDistributor = new ethers.Contract(
    distributorAddress,
    [
      'function distributeRewards(uint128 poolId, address collateralType, uint256 amount, uint64 start, uint32 duration)',
    ],
    wallet
  );

  const args = [
    //
    poolId,
    collateralType,
    amount,
    start,
    duration,
  ];
  log({ poolId, collateralType, amount, start, duration });
  const gasLimit = await RewardsDistributor.estimateGas
    .distributeRewards(...args)
    .catch(parseError);
  const tx = await RewardsDistributor.distributeRewards(...args, {
    gasLimit: gasLimit.mul(2),
  }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'RewardsDistributor.distributeRewards', log }));

  return null;
}

module.exports = {
  distributeRewards,
};

if (require.main === module) {
  require('../inspect');

  const [pk, distributorAddress, poolId, collateralType, amount, start, duration] =
    process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);

  distributeRewards({
    wallet,
    distributorAddress,
    poolId,
    collateralType,
    amount,
    start,
    duration,
  }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
