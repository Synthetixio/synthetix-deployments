const { ethers } = require('ethers');
const { getPythPrice } = require('./getPythPrice');
const { getPerpsSettlementStrategy } = require('./getPerpsSettlementStrategy');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function commitPerpsOrder({ wallet, accountId, marketId, sizeDelta, settlementStrategyId }) {
  log({ address: wallet.address, accountId, marketId, sizeDelta, settlementStrategyId });

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    wallet
  );

  const { feedId } = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
  log({ feedId });

  const pythPrice = await getPythPrice({ feedId });
  log({ pythPrice });
  const params = {
    marketId,
    accountId,
    sizeDelta: ethers.utils.parseEther(`${sizeDelta}`),
    settlementStrategyId,
    acceptablePrice: ethers.utils.parseEther(
      Math.floor(pythPrice * (sizeDelta > 0 ? 2 : 0.5)).toString()
    ),
    referrer: ethers.constants.AddressZero,
    trackingCode: ethers.constants.HashZero,
  };
  const gasLimit = await PerpsMarketProxy.estimateGas.commitOrder(params).catch(parseError);
  const tx = await PerpsMarketProxy.commitOrder(params, { gasLimit: gasLimit.mul(2) }).catch(
    parseError
  );
  await tx.wait().catch(parseError);

  const commitReceipt = await tx.wait().catch(parseError);
  const block = await provider.getBlock(commitReceipt.blockNumber);
  const commitmentTime = block.timestamp;
  log({ commitmentTime });

  return { commitmentTime };
}

module.exports = {
  commitPerpsOrder,
};
