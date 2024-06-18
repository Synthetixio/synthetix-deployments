#!/usr/bin/env node

const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setAutomine({ enabled }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  await provider.send('evm_setAutomine', [enabled]);
}

module.exports = {
  setAutomine,
};

if (require.main === module) {
  require('../inspect');
  const [enabled] = process.argv.slice(2);
  setAutomine({ enabled: enabled === '1' }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
