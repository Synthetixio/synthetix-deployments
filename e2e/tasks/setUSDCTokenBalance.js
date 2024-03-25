#!/usr/bin/env node

const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { setEthBalance } = require('./setEthBalance');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setUSDCTokenBalance({ wallet, balance }) {
  const config = await getCollateralConfig('USDC');
  const Token = new ethers.Contract(
    config.tokenAddress,
    [
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address account) view returns (uint256)',
      'function transfer(address to, uint256 value) returns (bool)',
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

  // Mainnet only!
  const friendlyWhale = '0xcdac0d6c6c59727a65f871236188350531885c43';
  const whaleBalance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(friendlyWhale), decimals)
  );
  log({ friendlyWhale, whaleBalance });

  await setEthBalance({ address: friendlyWhale, balance: 1000 });

  await wallet.provider.send('anvil_impersonateAccount', [friendlyWhale]);
  const signer = wallet.provider.getSigner(friendlyWhale);
  const tx = await Token.connect(signer).transfer(
    wallet.address,
    ethers.utils.parseUnits(`${balance - oldBalance}`, decimals)
  );
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'Token.transfer', log }));
  await wallet.provider.send('anvil_stopImpersonatingAccount', [friendlyWhale]);

  const newBalance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(wallet.address), decimals)
  );
  log({ symbol, tokenAddress: config.tokenAddress, newBalance });

  return null;
}

module.exports = {
  setUSDCTokenBalance,
};
