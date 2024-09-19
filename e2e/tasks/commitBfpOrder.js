#!/usr/bin/env node

const { ethers } = require('ethers');
const { getPythPrice } = require('./getPythPrice');
const { getBfpPosition } = require('./getBfpPosition');
const { getBfpMarketConfig } = require('./getBfpMarketConfig');
const { contractWrite } = require('./contractWrite');

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

  const oldOpenPosition = await getBfpPosition({ accountId, marketId });
  log({ oldOpenPosition });

  const marketConfig = await getBfpMarketConfig({ marketId });

  const pythPrice = await getPythPrice({ feedId: marketConfig.pythPriceFeedId });
  log({ pythPrice });

  const trackingCode = ethers.utils.formatBytes32String(
    require('crypto').randomBytes(8).toString('hex')
  );
  log({ trackingCode });

  const params = {
    accountId,
    marketId,
    sizeDelta: ethers.utils.parseEther(`${sizeDelta}`),
    limitPrice: ethers.utils.parseEther(
      Math.floor(pythPrice * (sizeDelta > 0 ? 1.05 : 0.95)).toString()
    ),
    keeperFeeBufferUsd,
    hooks,
    trackingCode,
  };

  log({ params });

  const commitReceipt = await contractWrite({
    wallet,
    contract: 'BfpMarketProxy',
    func: 'commitOrder',
    args: Object.values(params),
  });

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
