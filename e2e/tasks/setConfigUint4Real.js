#!/usr/bin/env node

const { ethers } = require('ethers');
const { getConfigUint } = require('./getConfigUint');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

async function setConfigUint({ wallet, key, value }) {
  log({ key, value });
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    wallet
  );

  const oldValue = await getConfigUint(key);
  log({ key, oldValue });

  if (oldValue === value) {
    log({ result: 'SKIP' });
    return;
  }

  const args = [
    //
    ethers.utils.formatBytes32String(key),
    ethers.utils.hexZeroPad(ethers.utils.hexlify(parseInt(value)), 32),
  ];
  log({ args });
  const gasLimit = await CoreProxy.estimateGas.setConfig(...args).catch(parseError);
  const tx = await CoreProxy.setConfig(...args, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'CoreProxy.setConfig', log }));

  const newValue = await getConfigUint(key);
  log({ key, newValue });
}

module.exports = {
  setConfigUint,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, key, value] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  setConfigUint({ wallet, key, value }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
