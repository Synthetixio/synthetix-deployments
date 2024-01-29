#!/usr/bin/env node

const { ethers } = require('ethers');
// const crypto = require('crypto');
const { getPerpsAccountOwner } = require('./getPerpsAccountOwner');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function createPerpsAccount({ wallet, accountId }) {
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    wallet
  );

  const currentAccountOwner = await getPerpsAccountOwner({ accountId });
  log({ accountId, currentAccountOwner });

  if (currentAccountOwner === wallet.address) {
    log({ accountId, result: 'SKIP' });
    return accountId;
  }

  const tx = await PerpsMarketProxy['createAccount(uint128)'](
    //
    accountId,
    { gasLimit: 10_000_000 }
  ).catch(parseError);

  await tx
    .wait()
    .then((txn) => log(txn) || txn, parseError)
    .then(gasLog({ action: 'PerpsMarketProxy.createAccount(uint128)', log }));

  const newAccountOwner = await getPerpsAccountOwner({ accountId });
  log({ accountId, newAccountOwner });

  return accountId;
}

module.exports = {
  createPerpsAccount,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  createPerpsAccount({ wallet, accountId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
