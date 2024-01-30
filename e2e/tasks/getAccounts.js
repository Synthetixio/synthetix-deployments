#!/usr/bin/env node

const { ethers } = require('ethers');

async function getAccounts({ address }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const AccountProxy = new ethers.Contract(
    require('../deployments/AccountProxy.json').address,
    require('../deployments/AccountProxy.json').abi,
    provider
  );
  const numberOfAccountTokens = await AccountProxy.balanceOf(address);
  if (numberOfAccountTokens.eq(0)) {
    // No accounts created yet
    return [];
  }
  const accounts = await Promise.all(
    Array.from(Array(numberOfAccountTokens.toNumber())).map((_, accountIndex) =>
      AccountProxy.tokenOfOwnerByIndex(address, accountIndex)
    )
  );
  return accounts.map((accountId) => accountId.toString());
}

module.exports = {
  getAccounts,
};

if (require.main === module) {
  require('../inspect');
  const [address] = process.argv.slice(2);
  getAccounts({ address }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
