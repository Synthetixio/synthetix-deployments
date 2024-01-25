const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
const { approveCollateral } = require('../tasks/approveCollateral');
const { createAccount } = require('../tasks/createAccount');
const { delegateCollateral } = require('../tasks/delegateCollateral');
const { depositCollateral } = require('../tasks/depositCollateral');
const { getAccountCollateral } = require('../tasks/getAccountCollateral');
const { getAccountOwner } = require('../tasks/getAccountOwner');
const { isCollateralApproved } = require('../tasks/isCollateralApproved');
const { getCollateralBalance } = require('../tasks/getCollateralBalance');
const { getConfigUint } = require('../tasks/getConfigUint');
const { getEthBalance } = require('../tasks/getEthBalance');
const { setConfigUint } = require('../tasks/setConfigUint');
const { setEthBalance } = require('../tasks/setEthBalance');
const { setSnxBalance } = require('../tasks/setSnxBalance');
const { withdrawCollateral } = require('../tasks/withdrawCollateral');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

exports.run = function () {
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

  it('should create new random wallet', async () => {
    log({ wallet: wallet.address, pk: wallet.privateKey });
    assert.ok(wallet.address);
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
      await isCollateralApproved({
        address,
        symbol: 'SNX',
        spenderAddress: require('../deployments/CoreProxy.json').address,
      }),
      false,
      'new wallet has not yet approved SNX for CoreProxy'
    );
    await approveCollateral({
      privateKey,
      symbol: 'SNX',
      spenderAddress: require('../deployments/CoreProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'SNX',
        spenderAddress: require('../deployments/CoreProxy.json').address,
      }),
      true
    );
  });

  it('should create user account', async () => {
    assert.equal(
      await getAccountOwner({ accountId }),
      ethers.constants.AddressZero,
      'New wallet should not have an account yet'
    );
    await createAccount({ wallet, accountId });
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
