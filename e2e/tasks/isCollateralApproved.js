const { getCollateralConfig } = require('./getCollateralConfig');
const { isTokenApproved } = require('./isTokenApproved');
const CoreProxy = require('../deployments/CoreProxy.json');

async function isCollateralApproved({ address, symbol }) {
  const config = await getCollateralConfig(symbol);
  return isTokenApproved({
    walletAddress: address,
    tokenAddress: config.tokenAddress,
    spenderAddress: CoreProxy.address,
  });
}

module.exports = {
  isCollateralApproved,
};
