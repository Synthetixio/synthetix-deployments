const { getCollateralConfig } = require('./getCollateralConfig');
const { approveToken } = require('./approveToken');
const CoreProxy = require('../deployments/CoreProxy.json');

async function approveCollateral({ privateKey, symbol }) {
  const config = await getCollateralConfig(symbol);
  return approveToken({
    privateKey,
    tokenAddress: config.tokenAddress,
    spenderAddress: CoreProxy.address,
  });
}

module.exports = {
  approveCollateral,
};
