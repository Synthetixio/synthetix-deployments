#!/usr/bin/env node

const { getCollateralConfig } = require('./getCollateralConfig');
const { isTokenApproved } = require('./isTokenApproved');

async function isCollateralApproved({ address, symbol, spenderAddress }) {
  const config = await getCollateralConfig(symbol);
  return isTokenApproved({
    walletAddress: address,
    tokenAddress: config.tokenAddress,
    spenderAddress,
  });
}

module.exports = {
  isCollateralApproved,
};

if (require.main === module) {
  require('../inspect');
  const [walletAddress, symbol, spenderAddress] = process.argv.slice(2);
  isCollateralApproved({ walletAddress, symbol, spenderAddress }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
