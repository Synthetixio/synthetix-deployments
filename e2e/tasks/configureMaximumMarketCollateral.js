#!/usr/bin/env node

const { ethers } = require('ethers');
const { setEthBalance } = require('./setEthBalance');
const { getCollateralConfig } = require('./getCollateralConfig');
const { getMaximumMarketCollateral } = require('./getMaximumMarketCollateral');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function configureMaximumMarketCollateral({ marketId, symbol, targetAmount }) {
  const config = await getCollateralConfig(symbol);
  log({
    marketId,
    symbol,
    tokenAddress: config.tokenAddress,
    targetAmount,
  });

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );

  log({ oldMaximumumMarketCollateral: await getMaximumMarketCollateral({ marketId, symbol }) });

  const owner = await CoreProxy.owner();
  const signer = provider.getSigner(owner);
  log({ owner });

  await setEthBalance({ address: owner, balance: 1000 });

  await provider.send('anvil_impersonateAccount', [owner]);

  const args = [
    //
    marketId,
    config.tokenAddress,
    ethers.utils.parseEther(`${targetAmount}`),
  ];
  const gasLimit = await CoreProxy.connect(signer)
    .estimateGas.configureMaximumMarketCollateral(...args)
    .catch(parseError);
  const tx = await CoreProxy.connect(signer)
    .configureMaximumMarketCollateral(...args, { gasLimit: gasLimit.mul(2) })
    .catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'CoreProxy.configureMaximumMarketCollateral', log }));
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  log({ newMaximumumMarketCollateral: await getMaximumMarketCollateral({ marketId, symbol }) });
}

module.exports = {
  configureMaximumMarketCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [marketId, symbol, targetAmount] = process.argv.slice(2);
  configureMaximumMarketCollateral({ marketId, symbol, targetAmount }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
