#!/usr/bin/env node

const { ethers } = require('ethers');
const { setEthBalance } = require('./setEthBalance');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { getLiquidationParameters } = require('./getLiquidationParameters');

async function setLiquidationParameters({
  marketId,
  newInitialMarginFraction,
  newMaintenanceMarginScalar,
  newMinimumInitialMarginRatio,
  newLiquidationRewardRatio,
  newMinimumPositionMargin,
}) {
  log({
    marketId,
    newInitialMarginFraction,
    newMaintenanceMarginScalar,
    newMinimumInitialMarginRatio,
    newLiquidationRewardRatio,
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
  } = getLiquidationParameters({ marketId });

  log({
    marketId,
    initialMarginRatioD18,
    maintenanceMarginScalarD18,
    minimumInitialMarginRatioD18,
    flagRewardRatioD18,
    minimumPositionMargin,
  });

  const tx = await PerpsMarketProxy.connect(signer).setLiquidationParameters(
    marketId,
    newInitialMarginFraction
      ? newInitialMarginFraction
      : initialMarginRatioD18
        ? initialMarginRatioD18
        : 0,
    newMaintenanceMarginScalar
      ? newMaintenanceMarginScalar
      : maintenanceMarginScalarD18
        ? maintenanceMarginScalarD18
        : 0,
    newMinimumInitialMarginRatio
      ? newMinimumInitialMarginRatio
      : minimumInitialMarginRatioD18
        ? minimumInitialMarginRatioD18
        : 0,
    newLiquidationRewardRatio
      ? newLiquidationRewardRatio
      : flagRewardRatioD18
        ? flagRewardRatioD18
        : 0,
    newMinimumPositionMargin
      ? newMinimumPositionMargin
      : minimumPositionMargin
        ? minimumPositionMargin
        : 0,
    { gasLimit: 10_000_000 }
  );

  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'PerpsMarketProxy.setLiquidationParameters', log }));
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  return marketId;
}

module.exports = {
  setLiquidationParameters,
};