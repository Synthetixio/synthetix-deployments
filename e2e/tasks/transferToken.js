#!/usr/bin/env node

const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

async function transferToken({ privateKey, tokenAddress, targetWalletAddress, amount }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const Token = new ethers.Contract(
    tokenAddress,
    [
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address account) view returns (uint256)',
      'function transfer(address to, uint256 amount) returns (bool)',
    ],
    wallet
  );
  const decimals = await Token.decimals();
  const symbol = await Token.symbol();

  const oldBalanceSource = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(wallet.address), decimals)
  );
  const oldBalanceTarget = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(targetWalletAddress), decimals)
  );
  log({ symbol, tokenAddress, oldBalanceSource, oldBalanceTarget });

  const tx = await Token.connect(wallet).transfer(
    targetWalletAddress,
    ethers.utils.parseUnits(`${amount}`, decimals)
  );
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'Token.transfer', log }));

  const newBalanceSource = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(wallet.address), decimals)
  );
  const newBalanceTarget = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(targetWalletAddress), decimals)
  );
  log({ symbol, tokenAddress, newBalanceSource, newBalanceTarget });

  return null;
}

module.exports = {
  transferToken,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, tokenAddress, targetWalletAddress, amount] = process.argv.slice(2);
  transferToken({ privateKey, tokenAddress, targetWalletAddress, amount }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
