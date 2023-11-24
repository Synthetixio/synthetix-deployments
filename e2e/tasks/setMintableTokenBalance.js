const { ethers } = require('ethers');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setMintableTokenBalance({ privateKey, tokenAddress, balance }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = new ethers.Wallet(privateKey, provider);

  const Token = new ethers.Contract(
    tokenAddress,
    [
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

  const tx = await Token.mint(ethers.utils.parseEther(`${balance - oldBalance}`), wallet.address);
  await tx.wait();

  const newBalance = parseFloat(ethers.utils.formatUnits(await Token.balanceOf(wallet.address)));
  log({ symbol, tokenAddress, newBalance });

  return null;
}

module.exports = {
  setMintableTokenBalance,
};
