// @ts-check
const { ethers } = require('ethers');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');
const { setEthBalance } = require('./setEthBalance');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setSettlementDelay({ strategyId = 1, marketId, delay }) {
  log(`Setting settlement delay to ${delay}s`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    provider
  );
  const strategy = await PerpsMarketProxy.getSettlementStrategy(marketId, strategyId);
  if (strategy.settlementDelay.eq(delay)) {
    log({ strategyId, marketId, message: `Settlement delay already set to: ${delay}s` });
    return;
  }

  const owner = await PerpsMarketProxy.owner();

  await provider.send('anvil_impersonateAccount', [owner]);
  await setEthBalance({ address: owner, balance: '1' });
  const signer = provider.getSigner(owner);
  const newStrategy = { ...strategy, settlementDelay: delay };
  const tx = await PerpsMarketProxy.connect(signer).setSettlementStrategy(
    marketId,
    strategyId,
    newStrategy
  );
  await tx.wait();
  await provider.send('anvil_stopImpersonatingAccount', [owner]);
  log({ strategyId, marketId, message: `Settlement delay updated to: ${delay}s` });
}

module.exports = { setSettlementDelay };
