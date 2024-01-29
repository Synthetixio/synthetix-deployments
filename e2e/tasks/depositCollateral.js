#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function depositCollateral({ privateKey, accountId, symbol, amount }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  log({ address: wallet.address, accountId, symbol, amount });

  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    wallet
  );
  const args = [
    ethers.BigNumber.from(accountId),
    config.tokenAddress,
    ethers.utils.parseEther(`${amount}`),
  ];
  const gasLimit = await CoreProxy.estimateGas.deposit(...args);
  const tx = await CoreProxy.deposit(...args, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn) || txn, parseError)
    .then(gasLog({ action: 'CoreProxy.deposit', log }));

  return accountId;
}

module.exports = {
  depositCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId, symbol, amount] = process.argv.slice(2);
  depositCollateral({ privateKey, accountId, symbol, amount }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
