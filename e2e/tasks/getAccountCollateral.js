const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { importCoreProxy } = require('./importCoreProxy');

async function getAccountCollateral({ accountId, symbol }) {
  const CoreProxy = await importCoreProxy();
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const coreProxy = new ethers.Contract(CoreProxy.address, CoreProxy.abi, provider);

  const [totalDeposited, totalAssigned, totalLocked] = await coreProxy.getAccountCollateral(
    accountId,
    config.tokenAddress
  );

  return {
    totalDeposited: parseFloat(ethers.utils.formatUnits(totalDeposited)),
    totalAssigned: parseFloat(ethers.utils.formatUnits(totalAssigned)),
    totalLocked: parseFloat(ethers.utils.formatUnits(totalLocked)),
  };
}

module.exports = {
  getAccountCollateral,
};
