#!/usr/bin/env node

async function getCollateralConfigurations() {
  const systemToken = require('../deployments/systemToken.json');
  systemToken.tokenAddress = systemToken.address;

  return require('../deployments/collateralTokens.json').concat([systemToken]);
}

module.exports = {
  getCollateralConfigurations,
};

if (require.main === module) {
  require('../inspect');
  getCollateralConfigurations().then((data) => console.log(JSON.stringify(data, null, 2)));
}
