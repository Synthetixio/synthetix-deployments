#!/usr/bin/env node

const { ethers } = require('ethers');
const { getPerpsCollateral } = require('./getPerpsCollateral');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function modifyPerpsCollateral({ wallet, accountId, deltaAmount, marketId }) {
  marketId = marketId || 0;
  const oldAmount = await getPerpsCollateral({ accountId });

  log({ address: wallet.address, accountId, deltaAmount, oldAmount });

  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    wallet
  );

  const args = [
    //
    accountId,
    marketId,
    ethers.utils.parseEther(`${deltaAmount}`),
  ];
  const gasLimit = await PerpsMarketProxy.estimateGas
    .modifyCollateral(...args)
    .catch(parseError)
    .catch(() => ethers.BigNumber.from(10_000_000));
  const tx = await PerpsMarketProxy.modifyCollateral(...args, {
    gasLimit: gasLimit.mul(2),
  }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'PerpsMarketProxy.modifyCollateral', log }));

  const currentAmount = await getPerpsCollateral({ accountId });
  log({ address: wallet.address, accountId, deltaAmount, currentAmount });
  return currentAmount;
}

module.exports = {
  modifyPerpsCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId, deltaAmount] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  modifyPerpsCollateral({ wallet, accountId, deltaAmount }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
