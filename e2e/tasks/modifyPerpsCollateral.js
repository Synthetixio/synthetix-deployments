const { ethers } = require('ethers');
const { getPerpsCollateral } = require('./getPerpsCollateral');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function modifyPerpsCollateral({ wallet, accountId, deltaAmount }) {
  const sUSDMarketId = 0;

  const oldAmount = await getPerpsCollateral({ accountId });

  log({ address: wallet.address, accountId, deltaAmount, oldAmount });

  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    wallet
  );
  const tx = await PerpsMarketProxy.modifyCollateral(
    accountId,
    sUSDMarketId,
    ethers.utils.parseEther(`${deltaAmount}`),
    { gasLimit: 10_000_000 }
  ).catch(parseError);
  await tx.wait().catch(parseError);

  const currentAmount = await getPerpsCollateral({ accountId });
  log({ address: wallet.address, accountId, deltaAmount, currentAmount });
}

module.exports = {
  modifyPerpsCollateral,
};
