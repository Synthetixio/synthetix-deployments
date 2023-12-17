const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const extras = require('../deployments/extras.json');
const SpotMarketProxyDeployment = require('../deployments/SpotMarketProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function unwrapUsdc({ wallet, amount }) {
  const config = await getCollateralConfig('USDC');

  const USDCToken = new ethers.Contract(
    config.tokenAddress,
    [
      'function decimals() view returns (uint8)',
      'function balanceOf(address account) view returns (uint256)',
    ],
    wallet
  );
  const usdcDecimals = await USDCToken.decimals();

  const sUSDCToken = new ethers.Contract(
    extras.synth_usdc_token_address,
    ['function balanceOf(address account) view returns (uint256)'],
    wallet
  );

  log({
    oldBalance_sUSDC: parseFloat(
      ethers.utils.formatUnits(await sUSDCToken.balanceOf(wallet.address))
    ),
    oldBalance_USDC: parseFloat(
      ethers.utils.formatUnits(await USDCToken.balanceOf(wallet.address))
    ),
  });

  const SpotMarket = new ethers.Contract(
    SpotMarketProxyDeployment.address,
    SpotMarketProxyDeployment.abi,
    wallet
  );

  const args = [
    extras.synth_usdc_market_id,
    ethers.utils.parseUnits(`${amount}`), // sUSDC
    ethers.utils.parseUnits(`${amount}`, usdcDecimals), // USDC, min received
  ];
  log({ args });
  const gas = await SpotMarket.estimateGas.unwrap(...args).catch(parseError);
  const tx = await SpotMarket.unwrap(...args, { gasLimit: gas.mul(2) }).catch(parseError);
  await tx.wait();
  const newBalance_USDC = parseFloat(
    ethers.utils.formatUnits(await USDCToken.balanceOf(wallet.address), usdcDecimals)
  );
  const newBalance_sUSDC = parseFloat(
    ethers.utils.formatUnits(await sUSDCToken.balanceOf(wallet.address))
  );
  log({ newBalance_sUSDC, newBalance_USDC });
  return newBalance_sUSDC;
}

module.exports = {
  unwrapUsdc,
};
