#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');

async function contractRead({ wallet, contract, func, args = [] }) {
  const Contract = new ethers.Contract(
    require(`../deployments/${contract}.json`).address,
    require(`../deployments/${contract}.json`).abi,
    wallet
  );
  return await Contract[func](...args).catch(parseError);
}

module.exports = {
  contractRead,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, contract, func, ...args] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  contractRead({ wallet, contract, func, args }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
