const assert = require('assert');
const { ethers } = require('ethers');
const { hexlify, hexZeroPad } = require('@ethersproject/bytes');
const {
  setEthBalance,
  setSnxBalance,
  approveCollateral,
  createAccount,
  depositCollateral,
  delegateCollateral,
  withdrawCollateral,
  setConfig,
  getCollateralBalance,
} = require('../tasks');

describe('Staking', function () {
  it('should deposit, delegate, undelegate and withdraw SNX', async function () {
    this.timeout(30_000);

    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;
    const address = wallet.address;

    await setEthBalance({ address, balance: 100 });
    await setSnxBalance({ address, balance: 100_500 });
    await approveCollateral({ privateKey, symbol: 'SNX' });

    const accountId = await createAccount({ privateKey });

    assert.equal(
      await getCollateralBalance({ address, symbol: 'SNX' }),
      100_500,
      'SNX Balance in Wallet'
    );

    await depositCollateral({
      privateKey,
      symbol: 'SNX',
      accountId,
      amount: 100_500,
    });

    assert.equal(
      await getCollateralBalance({ address, symbol: 'SNX' }),
      0,
      'SNX Balance in Wallet'
    );

    await delegateCollateral({
      privateKey,
      symbol: 'SNX',
      accountId,
      amount: 100_500,
      poolId: 1,
    });

    assert.equal(
      await getCollateralBalance({ address, symbol: 'SNX' }),
      0,
      'SNX Balance in Wallet'
    );

    // undelegate
    await delegateCollateral({
      privateKey,
      symbol: 'SNX',
      accountId,
      amount: 100,
      poolId: 1,
    });

    assert.equal(
      await getCollateralBalance({ address, symbol: 'SNX' }),
      0,
      'SNX Balance in Wallet'
    );

    // to withdraw  we need to disable timeout
    await setConfig({
      key: 'accountTimeoutWithdraw',
      //    value: hexZeroPad(hexlify(0), 32),
      value: hexZeroPad(hexlify(0), 32),
    });

    await withdrawCollateral({
      privateKey,
      symbol: 'SNX',
      accountId,
      amount: 100_400,
    });

    assert.equal(
      await getCollateralBalance({ address, symbol: 'SNX' }),
      100_400,
      'SNX Balance in Wallet'
    );
  });
});
