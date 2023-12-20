#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const CoreProxyDeployment = require('../deployments/CoreProxy.json');
const MulticallDeployment = require('../deployments/TrustedMulticallForwarder.json');
const { mineBlock } = require('./mineBlock');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function undelegateCollateral({ wallet, accountId, symbol, targetAmount, poolId }) {
  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    wallet
  );

  const Multicall = new ethers.Contract(
    MulticallDeployment.address,
    MulticallDeployment.abi,
    wallet
  );

  await mineBlock();

  const config = await getCollateralConfig(symbol);

  const debt = await CoreProxy.callStatic.getPositionDebt(
    ethers.BigNumber.from(accountId),
    ethers.BigNumber.from(poolId),
    config.tokenAddress
  );

  log({
    address: wallet.address,
    accountId,
    symbol,
    token: config.tokenAddress,
    targetAmount,
    poolId,
    debt,
  });

  // We must burn debt with delegation change within the same block.
  // If we burn and then undelegate, the debt will change because of the block increment
  // TODO: maybe cover case with negative debt (???)
  const args = [
    true,
    [
      debt.gt(0)
        ? {
            target: CoreProxy.address,
            callData: CoreProxy.interface.encodeFunctionData('burnUsd', [
              ethers.BigNumber.from(accountId),
              ethers.BigNumber.from(poolId),
              config.tokenAddress,
              debt.mul(2), // smth bigger than current debt
            ]),
          }
        : null,
      {
        target: CoreProxy.address,
        callData: CoreProxy.interface.encodeFunctionData('delegateCollateral', [
          ethers.BigNumber.from(accountId),
          ethers.BigNumber.from(poolId),
          config.tokenAddress,
          ethers.utils.parseEther(`${targetAmount}`),
          ethers.utils.parseEther(`1`),
        ]),
      },
    ].filter(Boolean),
  ];

  const gasLimit = await Multicall.estimateGas.tryBlockAndAggregate(...args).catch(parseError);
  const tx = await Multicall.tryBlockAndAggregate(...args, { gasLimit: gasLimit.mul(2) }).catch(
    parseError
  );
  await tx.wait().catch(parseError);

  const newDebt = await CoreProxy.callStatic.getPositionDebt(
    ethers.BigNumber.from(accountId),
    ethers.BigNumber.from(poolId),
    config.tokenAddress
  );
  log({ symbol, newDebt });
}

module.exports = {
  undelegateCollateral,
};

if (require.main === module) {
  const [pk, accountId, symbol, targetAmount, poolId] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);
  undelegateCollateral({ wallet, accountId, symbol, targetAmount, poolId }).then(console.log);
}
