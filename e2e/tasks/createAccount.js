const { ethers } = require('ethers');
const crypto = require('crypto');
const { importCoreProxy } = require('./importCoreProxy');

const log = require('debug')(`tasks:${require('path').basename(__filename, '.js')}`);

async function createAccount({ privateKey }) {
  const CoreProxy = await importCoreProxy();
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = new ethers.Wallet(privateKey, provider);
  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, wallet);

  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);
  const currentAccountOwner = await coreProxy.getAccountOwner(accountId);
  log({ accountId, currentAccountOwner });

  const tx = await coreProxy['createAccount(uint128)'](accountId, { gasLimit: 10_000_000 });
  await tx.wait();

  const newAccountOwner = await coreProxy.getAccountOwner(accountId);
  log({ accountId, newAccountOwner });

  return accountId;
}

module.exports = {
  createAccount,
};
