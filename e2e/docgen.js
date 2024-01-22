#!/usr/bin/env node

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const { contractsOwnership } = require('./docgen/contractsOwnership');
const { poolsOwnership } = require('./docgen/poolsOwnership');
const { marketsOwnership } = require('./docgen/marketsOwnership');
const { collateralConfigurations } = require('./docgen/collateralConfigurations');
const { perpsMarkets } = require('./docgen/perpsMarkets');

const { prettyMd } = require('./docgen/lib/pretty');

async function docgen() {
  const out = [];
  out.push('# Contracts');
  out.push('');
  out.push('See [Addresses + ABIs](../for-developers/addresses-+-abis.md) Page');
  out.push('');
  out.push(await collateralConfigurations().catch(log));
  out.push(await perpsMarkets().catch(log));
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
