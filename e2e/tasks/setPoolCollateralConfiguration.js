#!/usr/bin/env node

const { ethers } = require('ethers');
const { setEthBalance } = require('./setEthBalance');
const { getPoolCollateralConfiguration } = require('./getPoolCollateralConfiguration');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setPoolCollateralConfiguration({
  poolId,
  tokenAddress,
  collateralLimit,
  issuanceRatio,
}) {
  log({
    poolId,
    tokenAddress,
    collateralLimit,
    issuanceRatio,
  });

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );

  log({
    oldPoolCollateralConfiguration: await getPoolCollateralConfiguration({ poolId, tokenAddress }),
  });

  const owner = await CoreProxy.owner();
  const signer = provider.getSigner(owner);
  log({ owner });

  await setEthBalance({ address: owner, balance: 1000 });

  await provider.send('anvil_impersonateAccount', [owner]);

  const args = [
    //
    poolId,
    tokenAddress,
    {
      collateralLimitD18: ethers.utils.parseUnits(`${collateralLimit}`, 18),
      issuanceRatioD18: ethers.utils.parseUnits(`${issuanceRatio}`, 18),
    },
  ];
  const gasLimit = await CoreProxy.connect(signer)
    .estimateGas.setPoolCollateralConfiguration(...args)
    .catch(parseError);
  const tx = await CoreProxy.connect(signer)
    .setPoolCollateralConfiguration(...args, { gasLimit: gasLimit.mul(2) })
    .catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'CoreProxy.setPoolCollateralConfiguration', log }));
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  log({
    newPoolCollateralConfiguration: await getPoolCollateralConfiguration({ poolId, tokenAddress }),
  });
}

module.exports = {
  setPoolCollateralConfiguration,
};

if (require.main === module) {
  require('../inspect');
  const [poolId, tokenAddress, collateralLimit, issuanceRatio] = process.argv.slice(2);
  setPoolCollateralConfiguration({ poolId, tokenAddress, collateralLimit, issuanceRatio }).then(
    (data) => console.log(JSON.stringify(data, null, 2))
  );
}
