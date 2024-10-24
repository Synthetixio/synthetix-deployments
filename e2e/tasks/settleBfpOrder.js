#!/usr/bin/env node

const { ethers } = require('ethers');

const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { wait } = require('../wait');
const { getPythVaa } = require('../getPythVaa');

const { getBfpPosition } = require('./getBfpPosition');
const { getBfpMarketConfig } = require('./getBfpMarketConfig');
const { getBfpGlobalConfig } = require('./getBfpGlobalConfig');
const { getTimes } = require('./syncTime');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function settleBfpOrder({ wallet, accountId, marketId }) {
  log({ address: wallet.address, accountId, marketId });
  const BfpMarketProxy = new ethers.Contract(
    require('../deployments/BfpMarketProxy.json').address,
    require('../deployments/BfpMarketProxy.json').abi,
    wallet
  );

  const oldOpenPosition = await getBfpPosition({ accountId, marketId });
  log({ oldOpenPosition });
  const marketConfig = await getBfpMarketConfig({ marketId });
  const { minOrderAge } = await getBfpGlobalConfig();

  const bufferSeconds = 2; // We add this to make sure there's a price update available from pyth.
  await wait((minOrderAge + bufferSeconds) * 1000);

  const orderDigest = await BfpMarketProxy.getOrderDigest(accountId, marketId);
  log({ orderDigest });
  const times = await getTimes(wallet.provider);
  log({ times });

  if (orderDigest.sizeDelta.eq(0)) {
    throw Error('Order does not exist.');
  }
  if (orderDigest.isReady) {
    throw Error('Order is not ready to settle.');
  }

  const priceUpdateData = await getPythVaa({
    pythPriceFeedId: marketConfig.pythPriceFeedId,
    timestamp: orderDigest.commitmentTime.toNumber() + minOrderAge,
  });

  const args = [accountId, marketId, priceUpdateData];
  const block = await wallet.provider.getBlock('latest');
  log({ block });

  const gasLimit = await BfpMarketProxy.estimateGas
    .settleOrder(...args, { value: ethers.BigNumber.from(1) })
    .catch(parseError);

  const tx = await BfpMarketProxy.settleOrder(...args, {
    gasLimit: gasLimit.mul(2),
    value: ethers.BigNumber.from(1),
  }).catch(parseError);

  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'BfpMarketProxy.settleOrder', log }));

  const newPosition = await getBfpPosition({ accountId, marketId });
  log({ newPosition });
  return newPosition;
}

module.exports = {
  settleBfpOrder,
};

if (require.main === module) {
  require('../inspect');
  const [pk, accountId, marketId] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);

  settleBfpOrder({ wallet, accountId, marketId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
