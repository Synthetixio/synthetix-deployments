const { ethers } = require('ethers');
const PerpsMarketProxyDeployment = require('../deployments/CoreProxy.json');

async function getPerpsAccountOwner({ accountId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    provider
  );

  return await PerpsMarketProxy.getAccountOwner(accountId);
}

module.exports = {
  getPerpsAccountOwner,
};

if (require.main === module) {
  const [accountId] = process.argv.slice(2);
  getPerpsAccountOwner({ accountId }).then(console.log);
}
