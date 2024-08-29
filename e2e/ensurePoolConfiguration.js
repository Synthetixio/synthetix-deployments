const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

function normalisePoolConfig(config) {
  return config.map(({ marketId, weightD18, maxDebtShareValueD18 }) => ({
    marketId: ethers.BigNumber.from(marketId),
    weightD18: ethers.BigNumber.from(weightD18),
    maxDebtShareValueD18: ethers.BigNumber.from(maxDebtShareValueD18),
  }));
}

async function ensurePoolConfiguration(expectedPoolConfig) {
  const { contractRead } = require('./tasks/contractRead');
  const { contractWrite } = require('./tasks/contractWrite');

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);

  const poolId = 1;
  const oldPoolConfig = await contractRead({
    wallet,
    contract: 'CoreProxy',
    func: 'getPoolConfiguration',
    args: [poolId],
  });
  log({ oldPoolConfig: normalisePoolConfig(oldPoolConfig) });

  // Updates params for existing markets and appends new ones
  const updatedPoolConfig = oldPoolConfig.map(oldItem => {
    const expectedItem = expectedPoolConfig.find(expectedItem =>
      expectedItem.marketId.toString() === oldItem.marketId.toString()
    );
    return expectedItem ? {
      marketId: expectedItem.marketId,
      weightD18: expectedItem.weightD18,
      maxDebtShareValueD18: expectedItem.maxDebtShareValueD18
    } : oldItem;
  });

  // Append new items from expectedPoolConfig that don't exist in oldPoolConfig
  expectedPoolConfig.forEach(expectedItem => {
    if (!updatedPoolConfig.some(item => item.marketId.toString() === expectedItem.marketId.toString())) {
      updatedPoolConfig.push(expectedItem);
    }
  });

  log({ updatedPoolConfig: normalisePoolConfig(updatedPoolConfig) });

  if (JSON.stringify(oldPoolConfig) !== JSON.stringify(updatedPoolConfig)) {
    await contractWrite({
      wallet,
      contract: 'CoreProxy',
      func: 'setPoolConfiguration',
      args: [poolId, updatedPoolConfig],
      impersonate: await contractRead({
        wallet,
        contract: 'CoreProxy',
        func: 'owner',
      }),
    });
  }

  const newPoolConfig = await contractRead({
    wallet,
    contract: 'CoreProxy',
    func: 'getPoolConfiguration',
    args: [poolId],
  });
  log({ newPoolConfig: normalisePoolConfig(newPoolConfig) });

  return {
    oldPoolConfig: normalisePoolConfig(oldPoolConfig),
    expectedPoolConfig: normalisePoolConfig(expectedPoolConfig),
    newPoolConfig: normalisePoolConfig(newPoolConfig),
  };
}

module.exports = {
  ensurePoolConfiguration,
};
