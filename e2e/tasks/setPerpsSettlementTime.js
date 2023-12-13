const { ethers } = require('ethers');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');
const { setEthBalance } = require('./setEthBalance');
const { getPerpsSettlementStrategy } = require('./getPerpsSettlementStrategy');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setSettlementDelay({ settlementStrategyId, marketId, delay }) {
  log({ settlementStrategyId, marketId, delay });

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    provider
  );
  const strategy = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
  log({ targetDelay: delay, oldDelay: strategy.settlementDelay });

  if (strategy.settlementDelay.eq(delay)) {
    log('SKIP');
    return;
  }

  const owner = await PerpsMarketProxy.owner();
  await provider.send('anvil_impersonateAccount', [owner]);
  await setEthBalance({ address: owner, balance: '1' });
  const signer = provider.getSigner(owner);
  strategy.settlementDelay = ethers.BigNumber.from(delay);
  const tx = await PerpsMarketProxy.connect(signer).setSettlementStrategy(
    marketId,
    settlementStrategyId,
    strategy,
    { gasLimit: 10_000_000 }
  );
  await tx.wait();
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  const newStrategy = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
  log({ targetDelay: delay, newDelay: newStrategy.settlementDelay });
}

module.exports = {
  setSettlementDelay,
};
