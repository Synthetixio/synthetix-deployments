#!/usr/bin/env node

const { getCollateralConfig } = require('./getCollateralConfig');
const { approveToken } = require('./approveToken');

async function approveCollateral({ privateKey, symbol, spenderAddress }) {
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
  require('../inspect');
  const [privateKey, symbol, spenderAddress] = process.argv.slice(2);
  approveCollateral({ privateKey, symbol, spenderAddress }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
