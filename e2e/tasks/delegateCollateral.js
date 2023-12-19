#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const CoreProxy = require('../deployments/CoreProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function delegateCollateral({ privateKey, accountId, symbol, amount, poolId }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  log({ address: wallet.address, accountId, symbol, token: config.tokenAddress, amount, poolId });
  log('wallet balance', await wallet.getBalance());
  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, wallet);

  const args = [
    ethers.BigNumber.from(accountId),
    ethers.BigNumber.from(poolId),
    config.tokenAddress,
    ethers.utils.parseEther(`${amount}`),
    ethers.utils.parseEther(`1`),
  ];
  const gasLimit = await coreProxy.estimateGas.delegateCollateral(...args).catch(parseError);
  const tx = await coreProxy
    .delegateCollateral(...args, { gasLimit: gasLimit.mul(2) })
    .catch(parseError);
  await tx.wait();

  return accountId;
}

module.exports = {
  delegateCollateral,
};

if (require.main === module) {
  const [privateKey, accountId, symbol, amount, poolId] = process.argv.slice(2);
  delegateCollateral({ privateKey, accountId, symbol, amount, poolId }).then(console.log);
}
