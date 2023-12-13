const { ethers } = require('ethers');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');

async function getPerpsCollateral({ accountId }) {
  const sUSDMarketId = 0;

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    provider
  );

  return parseFloat(
    ethers.utils.formatUnits(await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId))
  );
}

module.exports = {
  getPerpsCollateral,
};

if (require.main === module) {
  const [accountId] = process.argv.slice(2);
  getPerpsCollateral({ accountId }).then(console.log);
}
