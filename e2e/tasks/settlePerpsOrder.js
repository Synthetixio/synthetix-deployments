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

  const tx = await PerpsMarketProxy.settleOrder(accountId, { gasLimit: 10_000_000 }).catch(
    parseError
  );
  await tx.wait().catch(parseError);

  const newPosition = await getPerpsPosition({ accountId, marketId });
  log({ newPosition });
}

module.exports = {
  settlePerpsOrder,
};
