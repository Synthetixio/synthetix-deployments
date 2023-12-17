const { ethers } = require('ethers');
const SpotMarketProxyDeployment = require('../deployments/SpotMarketProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function swapToSusd({ wallet, marketId, amount }) {
  log({ address: wallet.address, marketId, amount });
  const SpotMarketProxy = new ethers.Contract(
    SpotMarketProxyDeployment.address,
    SpotMarketProxyDeployment.abi,
    wallet
  );

  const tx = await SpotMarketProxy.sell(
    ethers.BigNumber.from(marketId), // uint128 marketId
    ethers.utils.parseEther(`${amount}`), // uint256 synthAmount
    ethers.utils.parseEther(`${amount}`), // uint256 minUsdAmount (0% slippage!)
    ethers.constants.AddressZero, // address referrer
    { gasLimit: 10_000_000 }
  ).catch(parseError);
  await tx.wait();
}

module.exports = {
  swapToSusd,
};
