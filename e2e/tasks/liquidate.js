#!/usr/bin/env node

const { ethers } = require('ethers');
const { setEthBalance } = require('./setEthBalance');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

async function liquidate({ accountId }) {
  log({ accountId });

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );
  const owner = await PerpsMarketProxy.owner();
  await provider.send('anvil_impersonateAccount', [owner]);
  await setEthBalance({ address: owner, balance: '1' });
  const signer = provider.getSigner(owner);

  const tx = await PerpsMarketProxy.connect(signer).liquidate(accountId, { gasLimit: 10_000_000 });

  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'PerpsMarketProxy.liquidate', log }));
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  return accountId;
}

module.exports = {
  liquidate,
};
