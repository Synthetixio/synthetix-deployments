const { ethers } = require('ethers');
const { getAccountOwner } = require('./getAccountOwner');
const CoreProxyDeployment = require('../deployments/CoreProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function createAccount({ wallet, accountId }) {
  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    wallet
  );

  const currentAccountOwner = await getAccountOwner({ accountId });
  log({ accountId, currentAccountOwner });

  if (currentAccountOwner === wallet.address) {
    log({ accountId, result: 'SKIP' });
    return accountId;
  }
  const gasLimit = await CoreProxy.estimateGas['createAccount(uint128)'](accountId);
  const tx = await CoreProxy['createAccount(uint128)'](accountId, {
    gasLimit: gasLimit.mul(2),
  }).catch(parseError);
  await tx.wait();

  const newAccountOwner = await getAccountOwner({ accountId });
  log({ accountId, newAccountOwner });

  return accountId;
}

module.exports = {
  createAccount,
};

if (require.main === module) {
  const [pk, accountId] = process.argv.slice(2);
  const wallet = new ethers.Wallet(pk);
  createAccount({ wallet, accountId }).then(console.log);
}
