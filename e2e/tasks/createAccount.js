#!/usr/bin/env node

const { ethers } = require('ethers');
const { getAccountOwner } = require('./getAccountOwner');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function createAccount({ wallet, accountId }) {
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    wallet
  );

  const currentAccountOwner = await getAccountOwner({ accountId });
  log({ accountId, currentAccountOwner });

  if (currentAccountOwner === wallet.address) {
    log({ accountId, result: 'SKIP' });
    return accountId;
  }
  const gasLimit = await CoreProxy.estimateGas['createAccount(uint128)'](accountId);
  const tx = await CoreProxy['createAccount(uint128)'](accountId, {
    gasLimit: gasLimit.mul(2),
  }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn) || txn, parseError)
    .then(gasLog({ action: 'CoreProxy.createAccount(uint128)', log }));

  const newAccountOwner = await getAccountOwner({ accountId });
  log({ accountId, newAccountOwner });

  return accountId;
}

module.exports = {
  createAccount,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  createAccount({ wallet, accountId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
