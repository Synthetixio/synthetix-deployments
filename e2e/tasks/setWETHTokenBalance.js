#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setWETHTokenBalance({ wallet, balance }) {
  const config = await getCollateralConfig('WETH');
  const Token = new ethers.Contract(
    config.tokenAddress,
    [
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address account) view returns (uint256)',
      'function deposit() payable',
    ],
    wallet
  );
  const decimals = await Token.decimals();
  const symbol = await Token.symbol();

  const oldBalance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(wallet.address), decimals)
  );
  log({ symbol, tokenAddress: config.tokenAddress, oldBalance });
  if (oldBalance > balance) {
    log({ result: 'SKIP' });
    return;
  }

  //  await wallet.provider.send('anvil_impersonateAccount', [friendlyWhale]);
  //  const signer = wallet.provider.getSigner(friendlyWhale);
  const tx = await Token.deposit({
    value: ethers.utils.parseUnits(`${balance - oldBalance}`, decimals),
  });
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'Token.transfer', log }));
  //  await wallet.provider.send('anvil_stopImpersonatingAccount', [friendlyWhale]);

  const newBalance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(wallet.address), decimals)
  );
  log({ symbol, tokenAddress: config.tokenAddress, newBalance });

  return null;
}

module.exports = {
  setWETHTokenBalance,
};
