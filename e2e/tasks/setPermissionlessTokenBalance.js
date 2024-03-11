#!/usr/bin/env node

const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

async function setPermissionlessTokenBalance({ privateKey, tokenAddress, balance }) {
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
      'function mint(uint256 amount, address to)',
    ],
    wallet
  );
  const decimals = await Token.decimals();
  const symbol = await Token.symbol();

  const oldBalance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(wallet.address), decimals)
  );
  log({ symbol, tokenAddress, oldBalance });

  if (oldBalance > balance) {
    log({ result: 'SKIP' });
    return;
  }

  const tx = await Token.connect(wallet).mint(
    ethers.utils.parseUnits(`${balance - oldBalance}`, decimals),
    wallet.address
  );
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'Token.mint', log }));

  const newBalance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(wallet.address), decimals)
  );
  log({ symbol, tokenAddress, newBalance });

  return null;
}

module.exports = {
  setPermissionlessTokenBalance,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, tokenAddress, balance] = process.argv.slice(2);
  setPermissionlessTokenBalance({ privateKey, tokenAddress, balance }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
