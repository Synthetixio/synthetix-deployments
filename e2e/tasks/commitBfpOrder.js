#!/usr/bin/env node

const { ethers } = require('ethers');
const { getPythPrice } = require('./getPythPrice');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { getBfpPosition } = require('./getBfpPosition');
const { getBfpMarketConfig } = require('./getBfpMarketConfig');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function commitBfpOrder({
  wallet,
  accountId,
  marketId,
  sizeDelta,
  keeperFeeBufferUsd = 0,
  hooks = [],
}) {
  log({ address: wallet.address, accountId, marketId, sizeDelta, hooks });

  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/BfpMarketProxy.json').address,
    require('../deployments/BfpMarketProxy.json').abi,
    wallet
  );

  const oldOpenPosition = await getBfpPosition({ accountId, marketId });
  log({ oldOpenPosition });

  const marketConfig = await getBfpMarketConfig({ marketId });

  const pythPrice = await getPythPrice({ feedId: marketConfig.pythPriceFeedId });
  log({ pythPrice });
  const params = {
    accountId,
    marketId,
    sizeDelta: ethers.utils.parseEther(`${sizeDelta}`),
    limitPrice: ethers.utils.parseEther(
      Math.floor(pythPrice * (sizeDelta > 0 ? 1.05 : 0.95)).toString()
    ),
    keeperFeeBufferUsd: keeperFeeBufferUsd,
    hooks: hooks,
  };
  const gasLimit = await PerpsMarketProxy.estimateGas
    .commitOrder(...Object.values(params))
    .catch(parseError);
  const tx = await PerpsMarketProxy.commitOrder(...Object.values(params), {
    gasLimit: gasLimit.mul(2),
  }).catch(parseError);
  const commitReceipt = await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'BfpMarketProxy.commitOrder', log }));

  const block = await wallet.provider.getBlock(commitReceipt.blockNumber);
  const commitmentTime = block.timestamp;
  log({ commitmentTime: new Date(commitmentTime * 1000) });

  return { commitmentTime };
}

module.exports = {
  commitBfpOrder,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId, marketId, sizeDelta] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  commitBfpOrder({ wallet, accountId, marketId, sizeDelta }).then(console.log);
}
