#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { traceTxn } = require('../traceTxn');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function borrowUsd({ wallet, accountId, symbol, amount, poolId }) {
  const config = await getCollateralConfig(symbol);
  log({ address: wallet.address, accountId, symbol, amount, poolId });

  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    wallet
  );
  const position = await CoreProxy.getPositionCollateral(accountId, poolId, config.tokenAddress);
  const debt = await CoreProxy.callStatic.getPositionDebt(accountId, poolId, config.tokenAddress);
  log({
    symbol,
    issuanceRatio: config.issuanceRatioD18,
    position,
    debt,
  });

  const args = [
    //
    accountId,
    poolId,
    config.tokenAddress,
    ethers.utils.parseEther(`${amount}`),
  ];

  const gasLimit = await CoreProxy.estimateGas
    .mintUsd(...args)
    .catch(parseError)
    .catch(() => ethers.BigNumber.from(10_000_000));
  const tx = await CoreProxy.mintUsd(...args, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, traceTxn(tx))
    .then(gasLog({ action: 'CoreProxy.mintUsd', log }));

  const newDebt = await CoreProxy.callStatic.getPositionDebt(
    accountId,
    poolId,
    config.tokenAddress
  );
  log({ newDebt });
}

module.exports = {
  borrowUsd,
};

if (require.main === module) {
  require('../inspect');
  const [pk, accountId, symbol, amount, poolId] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);
  borrowUsd({ wallet, accountId, symbol, amount, poolId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
