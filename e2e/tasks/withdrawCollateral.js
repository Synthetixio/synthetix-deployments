#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function withdrawCollateral({ privateKey, accountId, symbol, amount }) {
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
    //
    accountId,
    config.tokenAddress,
    ethers.utils.parseEther(`${amount}`),
  ];
  const gasLimit = await CoreProxy.estimateGas
    .withdraw(...args)
    .catch(parseError)
    .catch(() => ethers.BigNumber.from(10_000_000));
  const tx = await CoreProxy.withdraw(...args, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'CoreProxy.withdraw', log }));
}

module.exports = {
  withdrawCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId, symbol, amount] = process.argv.slice(2);
  withdrawCollateral({ privateKey, accountId, symbol, amount }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
