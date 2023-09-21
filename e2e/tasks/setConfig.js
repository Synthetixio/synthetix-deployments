const { ethers } = require('ethers');
const { importCoreProxy } = require('./importCoreProxy');
const { setEthBalance } = require('./setEthBalance');

const log = require('debug')(`tasks:${require('path').basename(__filename, '.js')}`);

async function setConfig({ key, value }) {
  const CoreProxy = await importCoreProxy();
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);

  const owner = await coreProxy.owner();

  const signer = provider.getSigner(owner);
  log({ owner });

  await setEthBalance({ address: owner, balance: 1000 });

  const oldValue = await coreProxy.connect(signer).getConfig(ethers.utils.formatBytes32String(key));
  log({ key, oldValue: parseInt(oldValue, 16) });

  if (oldValue === value) {
    log({ result: 'SKIP' });
    return;
  }

  await provider.send('anvil_impersonateAccount', [owner]);
  const tx = await coreProxy
    .connect(signer)
    .setConfig(ethers.utils.formatBytes32String(key), value, { gasLimit: 10_000_000 });
  await tx.wait();

  const newValue = parseInt(
    await coreProxy.connect(signer).getConfig(ethers.utils.formatBytes32String(key)),
    16
  );
  log({ key, newValue });
  await provider.send('anvil_stopImpersonatingAccount', [owner]);
}

module.exports = {
  setConfig,
};
