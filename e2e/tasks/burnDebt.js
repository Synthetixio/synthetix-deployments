const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const CoreProxyDeployment = require('../deployments/CoreProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function burnDebt({ wallet, accountId, symbol, poolId }) {
  const config = await getCollateralConfig(symbol);
  log({ address: wallet.address, accountId, symbol, poolId });

  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    wallet
  );

  const oldDebt = await CoreProxy.callStatic.getPositionDebt(
    ethers.BigNumber.from(accountId),
    ethers.BigNumber.from(poolId),
    config.tokenAddress
  );

  log({ symbol, oldDebt });
  if (oldDebt.gt(0)) {
    const tx = await CoreProxy.burnUsd(
      ethers.BigNumber.from(accountId),
      ethers.BigNumber.from(poolId),
      config.tokenAddress,
      oldDebt,
      { gasLimit: 10_000_000 }
    ).catch(parseError);
    await tx.wait();

    const newDebt = await CoreProxy.callStatic.getPositionDebt(
      ethers.BigNumber.from(accountId),
      ethers.BigNumber.from(poolId),
      config.tokenAddress
    );
    log({ symbol, newDebt });
  } else {
    log('SKIP');
  }
}

module.exports = {
  burnDebt,
};
