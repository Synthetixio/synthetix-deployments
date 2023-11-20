const { ethers } = require('ethers');
const extras = require('../deployments/extras.json');
const SpotMarketProxy = require('../deployments/SpotMarketProxy.json');
const log = require('debug')(`tasks:${require('path').basename(__filename, '.js')}`);

async function wrapUsdc({ wallet, amount }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const token = new ethers.Contract(
    extras.synth_usdc_token_address,
    [
      'function symbol() view returns (string)',
      'function balanceOf(address account) view returns (uint256)',
    ],
    provider
  );
  const symbol = await token.symbol();
  const oldBalance = parseFloat(ethers.utils.formatUnits(await token.balanceOf(wallet.address)));
  log({ symbol, oldBalance });

  const spotMarket = new ethers.Contract(SpotMarketProxy.address, SpotMarketProxy.abi, wallet);

  const tx = await spotMarket.wrap(
    extras.synth_usdc_market_id,
    ethers.utils.parseEther(`${amount}`),
    ethers.utils.parseEther(`${amount}`)
  );
  await tx.wait();

  const newBalance = parseFloat(ethers.utils.formatUnits(await token.balanceOf(wallet.address)));
  log({ symbol, newBalance });
  return newBalance;
}

module.exports = {
  wrapUsdc,
};
