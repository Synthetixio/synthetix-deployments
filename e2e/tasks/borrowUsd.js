#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { traceTxn } = require('../traceTxn');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function borrowUsd({ privateKey, accountId, symbol, amount, poolId }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  log({ address: wallet.address, accountId, symbol, amount, poolId });

  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    wallet
  );
  const position = await CoreProxy.getPositionCollateral(
    ethers.BigNumber.from(accountId),
    ethers.BigNumber.from(poolId),
    config.tokenAddress
  );
  const maxDebt = position.value.div(config.issuanceRatioD18).toNumber();
  const debt = Math.floor(maxDebt);

  log({
    symbol,
    issuanceRatio: parseFloat(ethers.utils.formatUnits(config.issuanceRatioD18)),
    positionValue: parseFloat(ethers.utils.formatUnits(position.value)),
    maxDebt,
    debt,
  });
  const args = [
    ethers.BigNumber.from(accountId),
    ethers.BigNumber.from(poolId),
    config.tokenAddress,
    ethers.utils.parseEther(`${debt}`),
  ];

  const gasLimit = await CoreProxy.estimateGas
    .mintUsd(...args)
    .catch(parseError)
    .catch(() => 10_000_000);
  const tx = await CoreProxy.mintUsd(...args, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  await tx
    .wait()
    .then(({ events }) => log({ events }))
    .catch(traceTxn(tx));
  return debt;
}

module.exports = {
  borrowUsd,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId, symbol, amount, poolId] = process.argv.slice(2);
  borrowUsd({ privateKey, accountId, symbol, amount, poolId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
