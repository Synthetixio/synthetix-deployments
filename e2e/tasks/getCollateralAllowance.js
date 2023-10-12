const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { importCoreProxy } = require('./importCoreProxy');

async function getCollateralAllowance({ address, symbol }) {
  const CoreProxy = await importCoreProxy();
  const config = await getCollateralConfig(symbol);
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const Token = new ethers.Contract(
    config.tokenAddress,
    ['function allowance(address, address) view returns (uint256)'],
    provider
  );
  const allowance = parseFloat(
    ethers.utils.formatUnits(await Token.allowance(address, CoreProxy?.address))
  );

  return allowance;
}

module.exports = {
  getCollateralAllowance,
};
