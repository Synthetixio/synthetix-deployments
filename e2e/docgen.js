#!/usr/bin/env node

const prettier = require('prettier');

const { contractsOwnership } = require('./docgen/contractsOwnership');
const { poolsOwnership } = require('./docgen/poolsOwnership');
const { marketsOwnership } = require('./docgen/marketsOwnership');

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
  out.push(await contractsOwnership().catch(() => ''));
  out.push(await poolsOwnership().catch(() => ''));
  out.push(await marketsOwnership().catch(() => ''));
  return out.join('\n');
}

module.exports = {
  docgen,
};

if (require.main === module) {
  require('./inspect');
  docgen().then(prettyMd).then(console.log);
}
