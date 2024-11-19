#!/usr/bin/env node

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const { contractsOwnership } = require('./docgen/contractsOwnership');
const { poolsOwnership } = require('./docgen/poolsOwnership');
const { marketsOwnership } = require('./docgen/marketsOwnership');
const { collateralConfigurations } = require('./docgen/collateralConfigurations');
const { spotMarkets } = require('./docgen/spotMarkets');
const { perpsMarkets } = require('./docgen/perpsMarkets');
const { rewardsDistributors } = require('./docgen/rewardsDistributors');
const { abi } = require('./docgen/abi');

const { prettyMd } = require('./docgen/lib/pretty');

async function docgen() {
  const out = [];
  out.push(await abi());
  out.push(await collateralConfigurations());
  out.push(await spotMarkets());
  out.push(await perpsMarkets());
  out.push(await rewardsDistributors());

  out.push('# Owners');
  out.push('');
  out.push(await contractsOwnership());
  out.push(await poolsOwnership());
  out.push(await marketsOwnership());
  return out.join('\n');
}

module.exports = {
  docgen,
};

if (require.main === module) {
  require('./inspect');
  docgen().then(prettyMd).then(console.log);
}
