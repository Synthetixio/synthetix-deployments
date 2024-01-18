#!/usr/bin/env node

const prettier = require('prettier');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const { contractsOwnership } = require('./docgen/contractsOwnership');
const { poolsOwnership } = require('./docgen/poolsOwnership');
const { marketsOwnership } = require('./docgen/marketsOwnership');
const { perpsMarkets } = require('./docgen/perpsMarkets');

const prettierOptions = {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'es5',
};

async function prettyMd(md) {
  return await prettier.format(md, { parser: 'markdown', ...prettierOptions });
}

async function docgen() {
  const out = [];
  out.push(await contractsOwnership().catch(log));
  out.push(await poolsOwnership().catch(log));
  out.push(await marketsOwnership().catch(log));
  out.push(await perpsMarkets().catch(log));
  return out.join('\n');
}

module.exports = {
  docgen,
};

if (require.main === module) {
  require('./inspect');
  docgen().then(prettyMd).then(console.log);
}
