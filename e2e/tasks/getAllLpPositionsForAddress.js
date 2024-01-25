#!/usr/bin/env node

const { ethers } = require('ethers');
const { getPools } = require('./getPools');
const { getAccounts } = require('./getAccounts');
const { getCollateralConfigurations } = require('./getCollateralConfigurations');
const { getLpPosition } = require('./getLpPosition');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getAllLpPositionsForAddress({ address }) {
  const [poolsData, accountIds, configs] = await Promise.all([
    getPools(),
    getAccounts({ address }),
    getCollateralConfigurations(),
  ]);
  const pools = poolsData.map(({ poolId, name: poolName }) => ({ poolId, poolName }));
  const collaterals = configs
    .filter(
      ({ depositingEnabled, minDelegationD18 }) =>
        depositingEnabled && !ethers.constants.MaxUint256.eq(minDelegationD18)
    )
    .map(({ symbol, tokenAddress }) => ({
      collateralSymbol: symbol,
      collateralAddress: tokenAddress,
    }));
  log({ pools, collaterals, accountIds });

  const positions = [];
  for (const accountId of accountIds) {
    for (const { poolId, poolName } of pools) {
      for (const { collateralSymbol, collateralAddress } of collaterals) {
        positions.push({ accountId, poolId, poolName, collateralSymbol, collateralAddress });
      }
    }
  }
  log({ positions });
  const allPositionsResolved = await Promise.all(
    positions.map(({ accountId, poolId, poolName, collateralSymbol, collateralAddress }) =>
      getLpPosition({ accountId, poolId, symbol: collateralSymbol }).then((amount) => ({
        address,
        accountId,
        poolId,
        poolName,
        collateralSymbol,
        collateralAddress,
        amount,
      }))
    )
  );

  return allPositionsResolved;
}

module.exports = {
  getAllLpPositionsForAddress,
};

if (require.main === module) {
  require('../inspect');
  const [address] = process.argv.slice(2);
  getAllLpPositionsForAddress({ address }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
