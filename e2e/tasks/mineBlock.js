#!/usr/bin/env node

const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function mineBlock() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  log({
    oldBlockNumber: await provider.getBlockNumber(),
    oldTimestamp: new Date((await provider.getBlock()).timestamp * 1000),
  });
  await provider.send('evm_mine', []);
  log({
    newBlockNumber: await provider.getBlockNumber(),
    newTimestamp: new Date((await provider.getBlock()).timestamp * 1000),
  });
  return null;
}

module.exports = {
  mineBlock,
};

if (require.main === module) {
  mineBlock().then(console.log);
}
