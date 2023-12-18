#!/usr/bin/env node

const { ethers } = require('ethers');
const { setEthBalance } = require('./setEthBalance');
const { getConfigUint } = require('./getConfigUint');
const CoreProxy = require('../deployments/CoreProxy.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setConfigUint({ key, value }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);
  const owner = await coreProxy.owner();
  const signer = provider.getSigner(owner);
  log({ owner });

  await setEthBalance({ address: owner, balance: 1000 });

  const oldValue = await getConfigUint(key);
  log({ key, oldValue });

  if (oldValue === value) {
    log({ result: 'SKIP' });
    return;
  }

  await provider.send('anvil_impersonateAccount', [owner]);
  const tx = await coreProxy
    .connect(signer)
    .setConfig(
      ethers.utils.formatBytes32String(key),
      ethers.utils.hexZeroPad(ethers.utils.hexlify(value), 32),
      { gasLimit: 10_000_000 }
    );
  await tx.wait();
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  const newValue = await getConfigUint(key);
  log({ key, newValue });
}

module.exports = {
  setConfigUint,
};

if (require.main === module) {
  const [key, value] = process.argv.slice(2);
  setConfigUint({ key, value }).then(console.log);
}
