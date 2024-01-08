#!/usr/bin/env node

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

if (require.main === module) {
  require('../inspect');
  const [address, symbol] = process.argv.slice(2);
  getCollateralBalance({ address, symbol }).then(console.log);
}
