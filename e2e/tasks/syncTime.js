#!/usr/bin/env node

const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function syncTime() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  async function getTimes() {
    const blockNumber = await provider.send('eth_blockNumber', []);
    const block = await provider.send('eth_getBlockByNumber', [blockNumber, false]);
    const blockTimestamp = parseInt(block.timestamp, 16);
    const now = Math.floor(Date.now() / 1000);
    return { blockNumber, blockTimestamp, now };
  }
  const oldTimes = await getTimes();
  log({
    diff: oldTimes.now - oldTimes.blockTimestamp,
    oldRealtime: new Date(oldTimes.now * 1000),
    oldBlockNumber: oldTimes.blockNumber,
    oldBlockTimestamp: new Date(oldTimes.blockTimestamp * 1000),
  });

  if (oldTimes.blockTimestamp !== oldTimes.now) {
    await provider.send('evm_setNextBlockTimestamp', [oldTimes.now]);
    await provider.send('evm_mine', []);

    const newTimes = await getTimes();
    log({
      diff: newTimes.now - newTimes.blockTimestamp,
      newRealtime: new Date(newTimes.now * 1000),
      newBlockNumber: newTimes.blockNumber,
      newBlockTimestamp: new Date(newTimes.blockTimestamp * 1000),
    });
  }
}

module.exports = {
  syncTime,
};

if (require.main === module) {
  require('../inspect');
  syncTime().then(console.log);
}
