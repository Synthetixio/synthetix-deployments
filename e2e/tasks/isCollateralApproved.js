#!/usr/bin/env node

const { getCollateralConfig } = require('./getCollateralConfig');
const { isTokenApproved } = require('./isTokenApproved');
const CoreProxyDeployment = require('../deployments/CoreProxy.json');

async function isCollateralApproved({
  address,
  symbol,
  spenderAddress = CoreProxyDeployment.address,
}) {
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
  isCollateralApproved({ walletAddress, symbol, spenderAddress }).then(console.log);
}
