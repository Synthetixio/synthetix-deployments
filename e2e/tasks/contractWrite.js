#!/usr/bin/env node

const { ethers } = require('ethers');
const { traceTxn } = require('../traceTxn');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function contractWrite({ wallet, contract, func, args = [], impersonate = null }) {
  log({ contract, func, args });

  if (impersonate) {
    log({ anvil_impersonateAccount: impersonate });
    await wallet.provider.send('anvil_impersonateAccount', [impersonate]);
  }
  const Contract = new ethers.Contract(
    require(`../deployments/${contract}.json`).address,
    require(`../deployments/${contract}.json`).abi,
    impersonate ? wallet.provider.getSigner(impersonate) : wallet
  );
  const gasLimit = await Contract.estimateGas[func](...args).catch(parseError);
  const tx = await Contract[func](...args, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  const result = await tx
    .wait()
    .then((txn) => log(txn.events) || txn, traceTxn(tx))
    .then(gasLog({ action: `${contract}.${func}`, log }));
  if (impersonate) {
    log({ anvil_stopImpersonatingAccount: impersonate });
    await wallet.provider.send('anvil_stopImpersonatingAccount', [impersonate]);
  }

  return result;
}

module.exports = {
  contractWrite,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, contract, func, ...args] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  contractWrite({ wallet, contract, func, args }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
