#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { traceTxn } = require('../traceTxn');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function delegateCollateral({ privateKey, accountId, symbol, amount, poolId }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  log({ address: wallet.address, accountId, symbol, token: config.tokenAddress, amount, poolId });
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    wallet
  );

  const args = [
    ethers.BigNumber.from(accountId),
    ethers.BigNumber.from(poolId),
    config.tokenAddress,
    ethers.utils.parseEther(`${amount}`),
    ethers.utils.parseEther(`1`),
  ];
  const gasLimit = await CoreProxy.estimateGas
    .delegateCollateral(...args)
    .catch(parseError)
    .catch(() => ethers.BigNumber.from(10_000_000));
  const tx = await CoreProxy.delegateCollateral(...args, { gasLimit: gasLimit.mul(2) });
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, traceTxn(tx))
    .then(gasLog({ action: 'CoreProxy.delegateCollateral', log }));

  return accountId;
}

module.exports = {
  delegateCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId, symbol, amount, poolId] = process.argv.slice(2);
  delegateCollateral({ privateKey, accountId, symbol, amount, poolId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
