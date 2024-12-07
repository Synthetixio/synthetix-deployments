#!/usr/bin/env node

async function getCollateralConfigurations() {
  return require('../deployments/collateralTokens.json');
}

module.exports = {
  getCollateralConfigurations,
};

if (require.main === module) {
  require('../inspect');
  getCollateralConfigurations().then((data) => console.log(JSON.stringify(data, null, 2)));
}
