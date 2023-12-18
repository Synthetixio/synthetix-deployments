const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const CoreProxy = require('../deployments/CoreProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function depositCollateral({ privateKey, accountId, symbol, amount }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  log({ address: wallet.address, accountId, symbol, amount });
  log('wallet balance', wallet.getBalance());
  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, wallet);
  const params = [
    ethers.BigNumber.from(accountId),
    config.tokenAddress,
    ethers.utils.parseEther(`${amount}`),
  ];
  const gasLimit = await coreProxy.estimateGas.deposit(...params);
  const tx = await coreProxy.deposit(...params, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  await tx.wait();

  return accountId;
}

module.exports = {
  depositCollateral,
};
