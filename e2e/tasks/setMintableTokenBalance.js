#!/usr/bin/env node

const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

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
      'function balanceOf(address account) view returns (uint256)',
      'function mint(uint256 amount, address to)',
    ],
    wallet
  );
  const symbol = await Token.symbol();

  const oldBalance = parseFloat(ethers.utils.formatUnits(await Token.balanceOf(wallet.address)));
  log({ symbol, tokenAddress, oldBalance });

  if (oldBalance > balance) {
    log({ result: 'SKIP' });
    return;
  }

  const owner = await Token.owner();
  await provider.send('anvil_impersonateAccount', [owner]);
  const signer = provider.getSigner(owner);
  const tx = await Token.connect(signer).mint(
    ethers.utils.parseEther(`${balance - oldBalance}`),
    wallet.address
  );
  await tx.wait();
  await provider.send('anvil_stopImpersonatingAccount', [owner]);

  const newBalance = parseFloat(ethers.utils.formatUnits(await Token.balanceOf(wallet.address)));
  log({ symbol, tokenAddress, newBalance });

  return null;
}

module.exports = {
  setMintableTokenBalance,
};

if (require.main === module) {
  const [privateKey, tokenAddress, balance] = process.argv.slice(2);
  setMintableTokenBalance({ privateKey, tokenAddress, balance }).then(console.log);
}
