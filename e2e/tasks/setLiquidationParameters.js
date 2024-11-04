#!/usr/bin/env node

const { ethers } = require('ethers');
const { setEthBalance } = require('./setEthBalance');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { parseError } = require('../parseError');
const { traceTxn } = require('../traceTxn');
const { gasLog } = require('../gasLog');
const { getLiquidationParameters } = require('./getLiquidationParameters');

async function setLiquidationParameters({
  marketId,
  newInitialMarginRatioD18,
  newMinimumInitialMarginRatioD18,
  newMaintenanceMarginScalarD18,
  newFlagRewardRatioD18,
  newMinimumPositionMargin,
}) {
  log({
    marketId,
    newInitialMarginRatioD18,
    newMinimumInitialMarginRatioD18,
    newMaintenanceMarginScalarD18,
    newFlagRewardRatioD18,
    newMinimumPositionMargin,
  });

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );
  const owner = await PerpsMarketProxy.owner();
  await provider.send('anvil_impersonateAccount', [owner]);
  await setEthBalance({ address: owner, balance: '1' });
  const signer = provider.getSigner(owner);

  const {
    initialMarginRatioD18,
    minimumInitialMarginRatioD18,
    maintenanceMarginScalarD18,
    flagRewardRatioD18,
    minimumPositionMargin,
  } = await getLiquidationParameters({ marketId });

  log({
    marketId,
    initialMarginRatioD18,
    maintenanceMarginScalarD18,
    minimumInitialMarginRatioD18,
    flagRewardRatioD18,
    minimumPositionMargin,
  });

  const args = [
    //
    marketId,
    newInitialMarginRatioD18
      ? newInitialMarginRatioD18
      : initialMarginRatioD18
        ? initialMarginRatioD18
        : 0,
    newMinimumInitialMarginRatioD18
      ? newMinimumInitialMarginRatioD18
      : minimumInitialMarginRatioD18
        ? minimumInitialMarginRatioD18
        : 0,
    newMaintenanceMarginScalarD18
      ? newMaintenanceMarginScalarD18
      : maintenanceMarginScalarD18
        ? maintenanceMarginScalarD18
        : 0,
    newFlagRewardRatioD18 ? newFlagRewardRatioD18 : flagRewardRatioD18 ? flagRewardRatioD18 : 0,
    newMinimumPositionMargin
      ? newMinimumPositionMargin
      : minimumPositionMargin
        ? minimumPositionMargin
        : 0,
  ];

  const gasLimit = await PerpsMarketProxy.connect(signer)
    .estimateGas.setLiquidationParameters(...args)
    .catch(parseError)
    .catch(() => 10_000_000);
  const tx = await PerpsMarketProxy.connect(signer).setLiquidationParameters(...args, {
    gasLimit: gasLimit.mul(2),
  });

  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, traceTxn(tx))
    .then(gasLog({ action: 'PerpsMarketProxy.setLiquidationParameters', log }));
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  return marketId;
}

module.exports = {
  setLiquidationParameters,
};
