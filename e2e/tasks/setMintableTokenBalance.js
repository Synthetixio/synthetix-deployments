#!/usr/bin/env node

const { ethers } = require('ethers');
const { setEthBalance } = require('./setEthBalance');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

async function setMintableTokenBalance({ privateKey, tokenAddress, balance }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const Token = new ethers.Contract(
    tokenAddress,
    [
      'function owner() view returns (address)',
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

  const owner = await Token.owner();
  await setEthBalance({ address: owner, balance: 1000 });

  const ownerBalance = parseFloat(ethers.utils.formatUnits(await Token.balanceOf(owner), decimals));
  log({ owner, ownerBalance });

  await provider.send('anvil_impersonateAccount', [owner]);
  const signer = provider.getSigner(owner);
  const tx = await Token.connect(signer).mint(
    ethers.utils.parseUnits(`${balance - oldBalance}`, decimals),
    wallet.address
  );
  await tx
    .wait()
    .then((txn) => log(txn) || txn, parseError)
    .then(gasLog({ action: 'Token.mint', log }));
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  const newBalance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(wallet.address), decimals)
  );
  log({ symbol, tokenAddress, newBalance });

  return null;
}

module.exports = {
  setMintableTokenBalance,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, tokenAddress, balance] = process.argv.slice(2);
  setMintableTokenBalance({ privateKey, tokenAddress, balance }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
