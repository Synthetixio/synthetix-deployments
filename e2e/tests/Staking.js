const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
const {
  approveCollateral,
  createAccount,
  delegateCollateral,
  depositCollateral,
  getAccountCollateral,
  getAccountOwner,
  getCollateralAllowance,
  getCollateralBalance,
  getConfigUint,
  getEthBalance,
  setConfigUint,
  setEthBalance,
  setSnxBalance,
  withdrawCollateral,
} = require('../tasks');

exports.run = function () {
  let address;
  let privateKey;
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);

  it('should create new random wallet', async () => {
    const wallet = ethers.Wallet.createRandom();
    address = wallet.address;
    privateKey = wallet.privateKey;
    assert.ok(address);
  });

  it('should set ETH balance to 100', async () => {
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 100 });
    assert.equal(await getEthBalance({ address }), 100);
  });

  it('should set SNX balance to 500', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'SNX' }),
      0,
      'New wallet has 0 SNX balance'
    );
    await setSnxBalance({ address, balance: 500 });
    assert.equal(await getCollateralBalance({ address, symbol: 'SNX' }), 500);
  });

  it('should approve SNX spending', async () => {
    assert.equal(
      await getCollateralAllowance({ address, symbol: 'SNX' }),
      0,
      'New wallet has 0 SNX allowance for CoreProxy'
    );
    await approveCollateral({ privateKey, symbol: 'SNX' });
    assert.equal(
      await getCollateralAllowance({ address, symbol: 'SNX' }),
      parseFloat(ethers.utils.formatUnits(ethers.constants.MaxUint256))
    );
  });

  it('should create user account', async () => {
    assert.equal(
      await getAccountOwner({ accountId }),
      ethers.constants.AddressZero,
      'New wallet should not have an account yet'
    );
    await createAccount({ privateKey, accountId });
    assert.equal(await getAccountOwner({ accountId }), address);
  });

  it('should deposit 400 SNX into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'SNX' }), 500);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'SNX' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({
      privateKey,
      symbol: 'SNX',
      accountId,
      amount: 400,
    });

    assert.equal(await getCollateralBalance({ address, symbol: 'SNX' }), 100);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'SNX' }), {
      totalDeposited: 400,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it('should delegate 300 SNX into the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'SNX' }), {
      totalDeposited: 400,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'SNX',
      accountId,
      amount: 300,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'SNX' }), {
      totalDeposited: 400,
      totalAssigned: 300,
      totalLocked: 0,
    });
  });

  it('should undelegate 200 SNX from the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'SNX' }), {
      totalDeposited: 400,
      totalAssigned: 300,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'SNX',
      accountId,
      amount: 100,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'SNX' }), {
      totalDeposited: 400,
      totalAssigned: 100,
      totalLocked: 0,
    });
  });

  it('should not be able to withdraw because of accountTimeoutWithdraw', async () => {
    await setConfigUint({ key: 'accountTimeoutWithdraw', value: 100 });
    assert.equal(await getConfigUint('accountTimeoutWithdraw'), 100);

    await assert.rejects(
      async () =>
        await withdrawCollateral({
          privateKey,
          symbol: 'SNX',
          accountId,
          amount: 200,
        })
    );
  });

  it('should withdraw 200 SNX', async () => {
    await setConfigUint({ key: 'accountTimeoutWithdraw', value: 0 });
    assert.equal(await getConfigUint('accountTimeoutWithdraw'), 0);
    await withdrawCollateral({
      privateKey,
      symbol: 'SNX',
      accountId,
      amount: 200,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'SNX' }), {
      totalDeposited: 200,
      totalAssigned: 100,
      totalLocked: 0,
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'SNX' }), 300);
  });
};
