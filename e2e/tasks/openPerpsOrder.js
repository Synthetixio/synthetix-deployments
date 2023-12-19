#!/usr/bin/env node

const { ethers } = require('ethers');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');
const { parseError } = require('../parseError');
const { getPerpsPosition } = require('./getPerpsPosition');
const { getPerpsSettlementStrategy } = require('./getPerpsSettlementStrategy');
const { getPythPrice } = require('./getPythPrice');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const wait = (ms) =>
  new Promise((resolve) => {
    require('debug')(`e2e:wait`)('Start', { ms });
    setTimeout(() => {
      require('debug')(`e2e:wait`)('Finish', { ms });
      resolve();
    }, ms);
  });

async function openPerpsOrder({ wallet, accountId, marketId, sizeDelta, settlementStrategyId }) {
  log({ address: wallet.address, accountId, marketId });
  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    wallet
  );

  const oldOpenPosition = await getPerpsPosition({ accountId, marketId });
  log({ oldOpenPosition });

  const { feedId } = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
  log({ feedId });

  const pythPrice = await getPythPrice({ feedId });
  log({ pythPrice });
  const commitOrderArgs = [
    {
      marketId,
      accountId,
      sizeDelta: ethers.utils.parseEther(`${sizeDelta}`),
      settlementStrategyId,
      acceptablePrice: ethers.utils.parseEther(
        Math.floor(pythPrice * (sizeDelta > 0 ? 2 : 0.5)).toString()
      ),
      referrer: ethers.constants.AddressZero,
      trackingCode: ethers.constants.HashZero,
    },
  ];
  const commitReceipt = (
    await PerpsMarketProxy.commitOrder(...commitOrderArgs, {
      gasLimit: (
        await PerpsMarketProxy.estimateGas.commitOrder(...commitOrderArgs).catch(parseError)
      ).mul(2),
    }).catch(parseError)
  )
    .wait()
    .catch(parseError);
  const block = await wallet.provider.getBlock(commitReceipt.blockNumber);
  const commitmentTime = block.timestamp;
  log({ commitmentTime });

  await wait(2_000);

  //  await doStrictPriceUpdate({ wallet, marketId, settlementStrategyId, commitmentTime });

  //  await wait(1_000);

  const settleOrderArgs = [accountId];
  await (
    await PerpsMarketProxy.settleOrder(...settleOrderArgs, {
      gasLimit: (
        await PerpsMarketProxy.estimateGas.settleOrder(...settleOrderArgs).catch(parseError)
      ).mul(2),
    }).catch(parseError)
  )
    .wait()
    .catch(parseError);

  const newPosition = await getPerpsPosition({ accountId, marketId });
  log({ newPosition });
}

module.exports = {
  settlePerpsOrderWithPriceUpdate: openPerpsOrder,
};

if (require.main === module) {
  const [pk, accountId, marketId, sizeDelta, settlementStrategyId] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);

  openPerpsOrder({ wallet, accountId, marketId, sizeDelta, settlementStrategyId }).then(
    console.log
  );
}
