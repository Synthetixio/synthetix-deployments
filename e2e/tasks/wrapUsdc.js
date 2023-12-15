const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const extras = require('../deployments/extras.json');
const SpotMarketProxyDeployment = require('../deployments/SpotMarketProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function wrapUsdc({ wallet, amount }) {
  const config = await getCollateralConfig('USDC');

  const USDCToken = new ethers.Contract(
    config.tokenAddress,
    [
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address account) view returns (uint256)',
    ],
    wallet
  );
  const usdcDecimals = await USDCToken.decimals();

  const sUSDCToken = new ethers.Contract(
    extras.synth_usdc_token_address,
    [
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address account) view returns (uint256)',
    ],
    wallet
  );
  const symbol = await sUSDCToken.symbol();

  log({
    symbol,
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
    ethers.utils.parseUnits(`${amount}`, usdcDecimals), // USDC
    ethers.utils.parseUnits(`${amount}`), // sUSDC, min received
  ];
  log({ args });
  const gas = await SpotMarket.estimateGas.wrap(...args).catch(parseError);
  const tx = await SpotMarket.wrap(...args, { gasLimit: gas.mul(2) }).catch(parseError);
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
  wrapUsdc,
};

if (require.main === module) {
  const [pk, amount] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);
  wrapUsdc({ wallet, amount }).then(console.log);
}
