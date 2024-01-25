#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const CoreProxyDeployment = require('../deployments/CoreProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function withdrawCollateral({ privateKey, accountId, symbol, amount }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  log({ address: wallet.address, accountId, symbol, amount });

  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    wallet
  );

  const tx = await CoreProxy.withdraw(
    ethers.BigNumber.from(accountId),
    config.tokenAddress,
    ethers.utils.parseEther(`${amount}`),
    { gasLimit: 10_000_000 }
  ).catch(parseError);
  await tx.wait();

  return accountId;
}

module.exports = {
  withdrawCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId, symbol, amount] = process.argv.slice(2);
  withdrawCollateral({ privateKey, accountId, symbol, amount }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
