#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function migrateLegacyMarket({ account, toAccountId, wallet }) {
  log({ account, toAccountId });

  const LegacyMarketProxy = new ethers.Contract(
    require('../deployments/LegacyMarketProxy.json').address,
    require('../deployments/LegacyMarketProxy.json').abi,
    wallet
  );

  const tx = await LegacyMarketProxy.migrateOnBehalf(account, ethers.BigNumber.from(toAccountId), {
    gasLimit: 30_000_000,
  }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'LegacyMarketProxy.migrateOnBehalf', log }));
}

module.exports = {
  migrateLegacyMarket,
};

if (require.main === module) {
  (async function () {
    require('../inspect');
    const [account, toAccountId] = process.argv.slice(2);
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_URL || 'http://127.0.0.1:8545'
    );
    const LegacyMarketProxy = new ethers.Contract(
      require('../deployments/LegacyMarketProxy.json').address,
      require('../deployments/LegacyMarketProxy.json').abi,
      provider
    );
    const wallet = provider.getSigner(await LegacyMarketProxy.owner());
    migrateLegacyMarket({ wallet, account, toAccountId }).then((data) =>
      console.log(JSON.stringify(data, null, 2))
    );
  })();
}
