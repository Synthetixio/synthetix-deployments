const { describe, it, before, after } = require('node:test');
const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { getAccountOwner } = require('../../tasks/getAccountOwner');
const { createAccount } = require('../../tasks/createAccount');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { approveCollateral } = require('../../tasks/approveCollateral');
const { depositCollateral } = require('../../tasks/depositCollateral');
const { delegateCollateral } = require('../../tasks/delegateCollateral');
const { setWETHTokenBalance } = require('../../tasks/setWETHTokenBalance');
const { syncTime } = require('../../tasks/syncTime');
const { borrowUsd } = require('../../tasks/borrowUsd');
const { withdrawCollateral } = require('../../tasks/withdrawCollateral');
const { setConfigUint } = require('../../tasks/setConfigUint');
const { getConfigUint } = require('../../tasks/getConfigUint');

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);

  const address = wallet.address;
  const privateKey = wallet.privateKey;

  let snapshot;
  before('Create snapshot', async () => {
    snapshot = await provider.send('evm_snapshot', []);
    log('Create snapshot', { snapshot });
  });
  after('Restore snapshot', async () => {
    log('Restore snapshot', { snapshot });
    await provider.send('evm_revert', [snapshot]);
  });

  it('should sync time of the fork', async () => {
    await syncTime();
  });

  it('should disable withdrawal timeout', async () => {
    await setConfigUint({ key: 'accountTimeoutWithdraw', value: 0 });
    assert.equal(await getConfigUint('accountTimeoutWithdraw'), 0);
  });

  it('should create new random wallet', async () => {
    log({ wallet: wallet.address, pk: wallet.privateKey });
    assert.ok(wallet.address);
  });

  it('should set ETH balance to 100', async () => {
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 100 });
    assert.equal(await getEthBalance({ address }), 100);
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

  it('should set WETH balance to 10', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'WETH' }),
      0,
      'New wallet has 0 WETH balance'
    );
    await setWETHTokenBalance({ wallet, balance: 10 });
    assert.equal(await getCollateralBalance({ address, symbol: 'WETH' }), 10);
  });

  it('should approve WETH spending for CoreProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'WETH',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      false,
      'New wallet has not allowed CoreProxy WETH spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'WETH',
      spenderAddress: require('../../deployments/CoreProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'WETH',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      true
    );
  });

  it('should deposit 5 WETH into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'WETH' }), 10);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'WETH' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({ privateKey, symbol: 'WETH', accountId, amount: 5 });

    assert.equal(await getCollateralBalance({ address, symbol: 'WETH' }), 5);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'WETH' }), {
      totalDeposited: 5,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it('should delegate 5 WETH into the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'WETH' }), {
      totalDeposited: 5,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'WETH',
      accountId,
      amount: 5,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'WETH' }), {
      totalDeposited: 5,
      totalAssigned: 5,
      totalLocked: 0,
    });
  });

  it('should borrow 1000 USDx', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'USDx' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await borrowUsd({
      wallet,
      accountId,
      symbol: 'WETH',
      amount: 1000,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'USDx' }), {
      totalDeposited: 1000,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it('should withdraw borrowed 1000 USDx', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'USDx' }), 0);
    await withdrawCollateral({
      privateKey,
      accountId,
      amount: 1000,
      symbol: 'USDx',
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'USDx' }), 1000);
  });
});
