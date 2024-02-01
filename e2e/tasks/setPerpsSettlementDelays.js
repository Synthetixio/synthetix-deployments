#!/usr/bin/env node

const { ethers } = require('ethers');
const { setEthBalance } = require('./setEthBalance');
const { getPerpsSettlementStrategy } = require('./getPerpsSettlementStrategy');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

async function setSettlementDelays({
  settlementStrategyId,
  marketId,
  settlementDelay,
  commitmentPriceDelay,
}) {
  log({ settlementStrategyId, marketId, settlementDelay, commitmentPriceDelay });

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );
  const strategy = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
  log({
    targetSettlementDelay: settlementDelay,
    oldSettlementDelay: strategy.settlementDelay,
    targetCommitmentPriceDelay: commitmentPriceDelay,
    oldCommitmentPriceDelay: strategy.commitmentPriceDelay,
  });

  if (
    strategy.settlementDelay.eq(settlementDelay) &&
    strategy.commitmentPriceDelay.eq(commitmentPriceDelay)
  ) {
    log('SKIP');
    return;
  }

  const owner = await PerpsMarketProxy.owner();
  await provider.send('anvil_impersonateAccount', [owner]);
  await setEthBalance({ address: owner, balance: '1' });
  const signer = provider.getSigner(owner);
  strategy.settlementDelay = ethers.BigNumber.from(settlementDelay);
  strategy.commitmentPriceDelay = ethers.BigNumber.from(commitmentPriceDelay);
  const tx = await PerpsMarketProxy.connect(signer).setSettlementStrategy(
    marketId,
    settlementStrategyId,
    strategy,
    { gasLimit: 10_000_000 }
  );
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'PerpsMarketProxy.setSettlementStrategy', log }));
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  const newStrategy = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
  log({
    targetSettlementDelay: settlementDelay,
    newSettlementDelay: newStrategy.settlementDelay,
    targetCommitmentPriceDelay: commitmentPriceDelay,
    newCommitmentPriceDelay: newStrategy.commitmentPriceDelay,
  });
}

module.exports = {
  setSettlementDelays,
};
