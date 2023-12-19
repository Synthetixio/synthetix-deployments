#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const CoreProxy = require('../deployments/CoreProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function borrowUsd({ privateKey, accountId, symbol, amount, poolId }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  log({ address: wallet.address, accountId, symbol, amount, poolId });

  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, wallet);
  const position = await coreProxy.getPositionCollateral(
    ethers.BigNumber.from(accountId),
    ethers.BigNumber.from(poolId),
    config.tokenAddress
  );
  const maxDebt = position.value.div(config.issuanceRatioD18).toNumber();
  const debt = Math.floor(maxDebt);

  log({
    symbol,
    issuanceRatio: parseFloat(ethers.utils.formatUnits(config.issuanceRatioD18)),
    positionValue: parseFloat(ethers.utils.formatUnits(position.value)),
    maxDebt,
    debt,
  });
  const tx = await coreProxy
    .mintUsd(
      ethers.BigNumber.from(accountId),
      ethers.BigNumber.from(poolId),
      config.tokenAddress,
      ethers.utils.parseEther(`${debt}`),
      { gasLimit: 10_000_000 }
    )
    .catch(parseError);
  await tx.wait();
  return debt;
}

module.exports = {
  borrowUsd,
};

if (require.main === module) {
  const [privateKey, accountId, symbol, amount, poolId] = process.argv.slice(2);
  borrowUsd({ privateKey, accountId, symbol, amount, poolId }).then(console.log);
}
