#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getLpPosition({ accountId, poolId, symbol }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );
  const positionCollateral = await CoreProxy.getPositionCollateral(
    accountId,
    poolId,
    config.tokenAddress
  );
  const positionDebt = await CoreProxy.callStatic.getPositionDebt(
    accountId,
    poolId,
    config.tokenAddress
  );
  let positionCratio = 0;
  let vaultCratio = 0;
  try {
    positionCratio = await CoreProxy.callStatic.getPositionCollateralRatio(
      accountId,
      poolId,
      config.tokenAddress
    );
    vaultCratio = await CoreProxy.callStatic.getPositionCollateralRatio(
      accountId,
      poolId,
      config.tokenAddress
    );
  } catch (err) {
    log('could not compute cratio for account');
  }
  log({ accountId, poolId, symbol, positionCollateral, positionCratio, vaultCratio, positionDebt });

  return {
    collateral: parseFloat(ethers.utils.formatUnits(positionCollateral)),
    debt: parseFloat(ethers.utils.formatUnits(positionDebt)),
    positionCratio: parseFloat(ethers.utils.formatUnits(positionCratio)),
    vaultCratio: parseFloat(ethers.utils.formatUnits(vaultCratio)),
  };
}

module.exports = {
  getLpPosition,
};

if (require.main === module) {
  require('../inspect');
  const [poolId, symbol, accountId] = process.argv.slice(2);
  getLpPosition({ poolId, symbol, accountId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
