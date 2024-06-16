#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setAllPoolsMinDelegationTimeZero({ poolId }) {
  log({ poolId });

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );

  const marketConfigs = await CoreProxy.getPoolConfiguration(poolId);

  for (const marketConfig of marketConfigs) {
    const marketAddress = await CoreProxy.getMarketAddress(marketConfig.marketId);
    await provider.send('anvil_impersonateAccount', [marketAddress]);
    await provider.send('anvil_setBalance', [
      marketAddress,
      ethers.utils.parseEther('10000').toHexString(),
    ]);
    const signer = provider.getSigner(marketAddress);
    log(`set ${marketAddress} ${marketConfig.marketId}`);
    const tx = await CoreProxy.connect(signer)
      .setMarketMinDelegateTime(marketConfig.marketId, 0)
      .catch(parseError);
    await tx
      .wait()
      .then((txn) => log(txn.events) || txn, parseError)
      .then(gasLog({ action: 'CoreProxy.setMarketMinDelegateTime', log }));
  }
}

module.exports = {
  setAllPoolsMinDelegationTimeZero,
};
