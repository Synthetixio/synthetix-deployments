const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { setEthBalance } = require('./setEthBalance');
const { importFakeCollateralTKN } = require('./importFakeCollateralTKN');

const log = require('debug')(`tasks:${require('path').basename(__filename, '.js')}`);

async function setFakeCollateralTKNBalance({ privateKey, balance }) {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = new ethers.Wallet(privateKey, provider);

  const FakeCollateralTKN = await importFakeCollateralTKN();
  const erc20 = new ethers.Contract(FakeCollateralTKN.address, FakeCollateralTKN.abi, wallet);

  const oldBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(wallet.address)));
  log({ address: wallet.address, oldBalance });

  if (oldBalance > balance) {
    log({ result: 'SKIP' });
    return;
  }

  const tx = await erc20.mint(ethers.utils.parseEther(`${balance - oldBalance}`), wallet.address);
  await tx.wait();

  const newBalance = parseFloat(ethers.utils.formatUnits(await erc20.balanceOf(wallet.address)));
  log({ address: wallet.address, newBalance });

  return null;
}

module.exports = {
  setFakeCollateralTKNBalance,
};
