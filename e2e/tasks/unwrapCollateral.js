#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function unwrapCollateral({ wallet, symbol, synthAddress, synthMarketId, amount }) {
  const config = await getCollateralConfig(symbol);

  const CollateralToken = new ethers.Contract(
    config.tokenAddress,
    [
      'function decimals() view returns (uint8)',
      'function balanceOf(address account) view returns (uint256)',
    ],
    wallet
  );
  const collateralDecimals = await CollateralToken.decimals();

  const extras = require('../deployments/extras.json');
  const SynthToken = new ethers.Contract(
    synthAddress,
    [
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address account) view returns (uint256)',
    ],
    wallet
  );
  const synthSymbol = await SynthToken.symbol();

  log({
    symbol: synthSymbol,
    oldBalance_synth: parseFloat(
      ethers.utils.formatUnits(await SynthToken.balanceOf(wallet.address))
    ),
    oldBalance_token: parseFloat(
      ethers.utils.formatUnits(await CollateralToken.balanceOf(wallet.address), collateralDecimals)
    ),
  });

  const SpotMarket = new ethers.Contract(
    require('../deployments/SpotMarketProxy.json').address,
    require('../deployments/SpotMarketProxy.json').abi,
    wallet
  );

  const args = [
    synthMarketId,
    ethers.utils.parseUnits(`${amount}`), // Synth
    ethers.utils.parseUnits(`${amount}`, collateralDecimals), // Token, min received
  ];
  log({ args });
  const gas = await SpotMarket.estimateGas.unwrap(...args).catch(parseError);
  const tx = await SpotMarket.unwrap(...args, { gasLimit: gas.mul(2) }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'SpotMarket.unwrap', log }));
  const newBalance_token = parseFloat(
    ethers.utils.formatUnits(await CollateralToken.balanceOf(wallet.address), collateralDecimals)
  );
  const newBalance_synth = parseFloat(
    ethers.utils.formatUnits(await SynthToken.balanceOf(wallet.address))
  );
  log({ newBalance_synth, newBalance_token });
  return newBalance_synth;
}

module.exports = {
  unwrapCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [pk, symbol, synthAddress, synthMarketId, amount] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);
  unwrapCollateral({ wallet, symbol, synthAddress, synthMarketId, amount }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
