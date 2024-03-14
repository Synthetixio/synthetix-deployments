#!/usr/bin/env node

const { ethers } = require('ethers');
const { getPythPrice } = require('./getPythPrice');
const { getPerpsSettlementStrategy } = require('./getPerpsSettlementStrategy');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { getPerpsPosition } = require('./getPerpsPosition');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function commitPerpsOrder({ wallet, accountId, marketId, sizeDelta, settlementStrategyId }) {
  log({ address: wallet.address, accountId, marketId, sizeDelta, settlementStrategyId });

  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    wallet
  );

  const oldOpenPosition = await getPerpsPosition({ accountId, marketId });
  log({ oldOpenPosition });

  const { feedId } = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
  log({ feedId });

  const pythPrice = await getPythPrice({ feedId });
  log({ pythPrice });
  const params = {
    marketId,
    accountId,
    sizeDelta: ethers.utils.parseEther(`${sizeDelta}`),
    settlementStrategyId,
    acceptablePrice: ethers.utils.parseEther(
      Math.floor(pythPrice * (sizeDelta > 0 ? 1.05 : 0.95)).toString()
    ),
    referrer: ethers.constants.AddressZero,
    trackingCode: ethers.utils.formatBytes32String('SNX_CLI'),
  };
  const gasLimit = await PerpsMarketProxy.estimateGas.commitOrder(params).catch(parseError);
  const tx = await PerpsMarketProxy.commitOrder(params, { gasLimit: gasLimit.mul(2) }).catch(
    parseError
  );
  const commitReceipt = await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'PerpsMarketProxy.commitOrder', log }));

  const block = await wallet.provider.getBlock(commitReceipt.blockNumber);
  const commitmentTime = block.timestamp;
  log({ commitmentTime: new Date(commitmentTime * 1000) });

  return { commitmentTime };
}

module.exports = {
  commitPerpsOrder,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId, marketId, sizeDelta, settlementStrategyId] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  commitPerpsOrder({ wallet, accountId, marketId, sizeDelta, settlementStrategyId }).then(
    console.log
  );
}
