#!/usr/bin/env node

const { getCollateralConfigurations } = require('./getCollateralConfigurations');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getCollateralConfig(symbol) {
  const collateralConfigs = await getCollateralConfigurations();
  const config = collateralConfigs
    .slice(0) // Create new array instance
    .reverse() // If we redeploy with same symbol we want the get the latest one from the list
    .find((cfg) => cfg.symbol === symbol);
  if (!config) {
    throw new Error(`Collateral config for "${symbol}" does not exist`);
  }
  log(config);
  return config;
}

module.exports = {
  getCollateralConfig,
};

if (require.main === module) {
  require('../inspect');
  const [symbol] = process.argv.slice(2);
  getCollateralConfig(symbol).then((data) => console.log(JSON.stringify(data, null, 2)));
}
