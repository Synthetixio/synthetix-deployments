#!/usr/bin/env node

const { ethers } = require('ethers');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');
const { parseError } = require('../parseError');
const { getPerpsPosition } = require('./getPerpsPosition');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function settlePerpsOrder({ wallet, accountId, marketId }) {
  log({ address: wallet.address, accountId, marketId });
  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    wallet
  );

  const oldOpenPosition = await getPerpsPosition({ accountId, marketId });
  log({ oldOpenPosition });

  const args = [accountId];
  const gasLimit = await PerpsMarketProxy.estimateGas.settleOrder(...args).catch(parseError);
  const tx = await PerpsMarketProxy.settleOrder(accountId, { gasLimit: gasLimit.mul(2) }).catch(
    parseError
  );
  await tx.wait().catch(parseError);

  const newPosition = await getPerpsPosition({ accountId, marketId });
  log({ newPosition });
}

module.exports = {
  settlePerpsOrder,
};

if (require.main === module) {
  const [pk, accountId, marketId] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);

  settlePerpsOrder({ wallet, accountId, marketId }).then(console.log);
}
