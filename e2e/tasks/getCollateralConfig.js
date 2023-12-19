#!/usr/bin/env node

const { getCollateralConfigurations } = require('./getCollateralConfigurations');

async function getCollateralConfig(symbol) {
  const collateralConfigs = await getCollateralConfigurations();
  const config = collateralConfigs.find((cfg) => cfg.symbol === symbol);
  if (!config) {
    throw new Error(`Collateral config for "${symbol}" does not exist`);
  }
  return config;
}

module.exports = {
  getCollateralConfig,
};

if (require.main === module) {
  const [symbol] = process.argv.slice(2);
  getCollateralConfig(symbol).then(console.log);
}
