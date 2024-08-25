#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function claimPoolRewards({ wallet, accountId, poolId, collateralType, distributorAddress }) {
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    wallet
  );

  const args = [
    //
    accountId,
    poolId,
    collateralType,
    distributorAddress,
  ];
  log({ accountId, poolId, collateralType, distributorAddress });

  const gasLimit = await CoreProxy.estimateGas.claimPoolRewards(...args).catch(parseError);
  const tx = await CoreProxy.claimPoolRewards(...args, { gasLimit: gasLimit.mul(2) }).catch(
    parseError
  );
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'CoreProxy.claimPoolRewards', log }));

  return null;
}

module.exports = {
  claimPoolRewards,
};

if (require.main === module) {
  require('../inspect');

  const [pk, accountId, poolId, collateralType, distributorAddress] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);

  claimPoolRewards({
    wallet,
    accountId,
    poolId,
    collateralType,
    distributorAddress,
  }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
