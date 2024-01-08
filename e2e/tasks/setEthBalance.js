#!/usr/bin/env node

const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setEthBalance({ address, balance }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const oldBalance = parseFloat(ethers.utils.formatUnits(await provider.getBalance(address)));
  log({ address, oldBalance });

  await provider.send('anvil_setBalance', [
    address,
    ethers.utils.parseEther(`${balance}`).toHexString(),
  ]);
  const newBalance = parseFloat(ethers.utils.formatUnits(await provider.getBalance(address)));
  log({ address, newBalance });
  return newBalance;
}

module.exports = {
  setEthBalance,
};

if (require.main === module) {
  require('../inspect');
  const [address, balance] = process.argv.slice(2);
  setEthBalance({ address, balance }).then(console.log);
}
