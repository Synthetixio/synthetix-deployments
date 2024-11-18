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
  out.push(await abi().catch(log));
  out.push(await collateralConfigurations().catch(log));
  out.push(await spotMarkets().catch(log));
  out.push(await perpsMarkets().catch(log));
  out.push(await rewardsDistributors().catch(log));

  out.push('# Owners');
  out.push('');
  out.push(await contractsOwnership().catch(log));
  out.push(await poolsOwnership().catch(log));
  out.push(await marketsOwnership().catch(log));
  return out.join('\n');
}

module.exports = {
  docgen,
};

if (require.main === module) {
  require('./inspect');
  docgen().then(prettyMd).then(console.log);
}
