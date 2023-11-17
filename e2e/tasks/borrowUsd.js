const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const CoreProxy = require('../deployments/CoreProxy.json');

const log = require('debug')(`tasks:${require('path').basename(__filename, '.js')}`);

async function borrowUsd({ privateKey, accountId, symbol, amount, poolId }) {
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
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
  const tx = await coreProxy.mintUsd(
    ethers.BigNumber.from(accountId),
    ethers.BigNumber.from(poolId),
    config.tokenAddress,
    ethers.utils.parseEther(`${debt}`),
    { gasLimit: 10_000_000 }
  );
  await tx.wait();
  return debt;
}

module.exports = {
  borrowUsd,
};
