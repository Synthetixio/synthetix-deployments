#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { getCollateralConfig } = require('./getCollateralConfig');
const { setEthBalance } = require('./setEthBalance');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getOwner() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const network = await provider.getNetwork();

  switch (network.chainId) {
    case 1:
      return '0xAc86855865CbF31c8f9FBB68C749AD5Bd72802e3';
    case 5:
      //      return '0x48914229dedd5a9922f44441ffccfc2cb7856ee9';
      return '0x310f640354b265438797ffA472CfCa1Ae9b136F7';
    case 10:
      return '0x6330D5F08f51057F36F46d6751eCDc0c65Ef7E9e';
    case 420:
      return '0x48914229dedd5a9922f44441ffccfc2cb7856ee9';
    default:
      throw new Error(`Unsupported chain ${network.chainId}`);
  }
}

async function setSnxBalance({ address, balance }) {
  const config = await getCollateralConfig('SNX');
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const Token = new ethers.Contract(
    config.tokenAddress,
    [
      'function balanceOf(address account) view returns (uint256)',
      'function transfer(address to, uint256 value) returns (bool)',
    ],
    provider
  );

  const oldBalance = parseFloat(ethers.utils.formatUnits(await Token.balanceOf(address)));
  log({ address, oldBalance });

  if (oldBalance > balance) {
    log({ result: 'SKIP' });
    return;
  }

  //  const network = await provider.getNetwork();
  //  if (network.chainId === 5) {
  //    await provider.send('anvil_impersonateAccount', [address]);
  //    const signer = provider.getSigner(address);
  //    const Faucet = new ethers.Contract(
  //      '0x9B79D6dFe4650d70f35dbb80f7d1EC0Cf7f823Fd',
  //      ['function exchangeEtherForSNX() payable returns (uint256)'],
  //      signer
  //    );
  //    const gasLimit = await Faucet.estimateGas.exchangeEtherForSNX().catch(parseError);
  //    const tx = await Faucet.exchangeEtherForSNX({
  //      value: ethers.utils.parseEther('100'),
  //      gasLimit: gasLimit.mul(2),
  //    }).catch(parseError);
  //    const result = await tx.wait().catch(parseError);
  //    log(result);
  //    await provider.send('anvil_stopImpersonatingAccount', [address]);
  //  } else {
  const owner = await getOwner();
  await setEthBalance({ address: owner, balance: 1000 });
  const ownerBalance = parseFloat(ethers.utils.formatUnits(await Token.balanceOf(owner)));
  log({ owner, ownerBalance });

  await provider.send('anvil_impersonateAccount', [owner]);
  const signer = provider.getSigner(owner);
  const args = [
    //
    address,
    ethers.utils.parseEther(`${balance - oldBalance}`),
  ];
  const gasLimit = await Token.connect(signer)
    .estimateGas.transfer(...args)
    .catch(parseError);
  const tx = await Token.connect(signer)
    .transfer(...args, { gasLimit: gasLimit.mul(2) })
    .catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn) || txn, parseError)
    .then(gasLog({ action: 'Token.transfer', log }));
  await provider.send('anvil_stopImpersonatingAccount', [owner]);
  //  }

  const newBalance = parseFloat(ethers.utils.formatUnits(await Token.balanceOf(address)));
  log({ address, newBalance });

  return null;
}

module.exports = {
  setSnxBalance,
};
