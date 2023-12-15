const { getCollateralConfig } = require('./getCollateralConfig');
const { approveToken } = require('./approveToken');
const CoreProxy = require('../deployments/CoreProxy.json');

async function approveCollateral({ privateKey, symbol, spenderAddress = CoreProxy.address }) {
  const config = await getCollateralConfig(symbol);
  return approveToken({
    privateKey,
    tokenAddress: config.tokenAddress,
    spenderAddress,
  });
}

module.exports = {
  approveCollateral,
};

if (require.main === module) {
  const [pk, symbol, spenderAddress] = process.argv.slice(2);
  approveCollateral({ privateKey: pk, symbol, spenderAddress }).then(console.log);
}
