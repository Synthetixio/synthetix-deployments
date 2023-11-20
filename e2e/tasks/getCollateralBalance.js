const { getCollateralConfig } = require('./getCollateralConfig');
const { getTokenBalance } = require('./getTokenBalance');

async function getCollateralBalance({ address, symbol }) {
  const config = await getCollateralConfig(symbol);
  return getTokenBalance({
    walletAddress: address,
    tokenAddress: config.tokenAddress,
  });
}

module.exports = {
  getCollateralBalance,
};
