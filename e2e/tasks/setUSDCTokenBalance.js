#!/usr/bin/env node

const { getCollateralConfig } = require('./getCollateralConfig');
const { setTokenBalance } = require('./setTokenBalance');

async function setUSDCTokenBalance({ wallet, balance }) {
  const { tokenAddress } = await getCollateralConfig('USDC');
  // BASE Mainnet only!
  const friendlyWhale = '0xcdac0d6c6c59727a65f871236188350531885c43';
  return setTokenBalance({ wallet, balance, tokenAddress, friendlyWhale });
}

module.exports = {
  setUSDCTokenBalance,
};
