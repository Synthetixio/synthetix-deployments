const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { wrapCollateral } = require('../../tasks/wrapCollateral');
const { getAccountOwner } = require('../../tasks/getAccountOwner');
const { createAccount } = require('../../tasks/createAccount');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { approveCollateral } = require('../../tasks/approveCollateral');
const { depositCollateral } = require('../../tasks/depositCollateral');
const { delegateCollateral } = require('../../tasks/delegateCollateral');
const { setConfigUint } = require('../../tasks/setConfigUint');
const { getConfigUint } = require('../../tasks/getConfigUint');
const { withdrawCollateral } = require('../../tasks/withdrawCollateral');
const { swapToSusd } = require('../../tasks/swapToSusd');
const { undelegateCollateral } = require('../../tasks/undelegateCollateral');
const { setUSDCTokenBalance } = require('../../tasks/setUSDCTokenBalance');
const { doPriceUpdate } = require('../../tasks/doPriceUpdate');
const { setSpotWrapper } = require('../../tasks/setSpotWrapper');
const {
  configureMaximumMarketCollateral,
} = require('../../tasks/configureMaximumMarketCollateral');
const { syncTime } = require('../../tasks/syncTime');

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
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

  it('should set USDC balance to 100_000', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'USDC' }),
      0,
      'New wallet has 0 USDC balance'
    );
    await setUSDCTokenBalance({ wallet, balance: 100_000 });
    assert.equal(await getCollateralBalance({ address, symbol: 'USDC' }), 100_000);
  });

  it('should approve USDC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket USDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'USDC',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  it('should increase max collateral for the test to 10_000_000', async () => {
    await configureMaximumMarketCollateral({
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      symbol: 'USDC',
      targetAmount: String(10_000_000),
    });
    await setSpotWrapper({
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      symbol: 'USDC',
      targetAmount: String(10_000_000),
    });
  });

  it('should wrap 10_000 USDC', async () => {
    const balance = await wrapCollateral({ wallet, symbol: 'USDC', amount: 10_000 });
    assert.equal(balance, 10_000);
  });

  it('should approve sUSDC spending for CoreProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sUSDC',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      false,
      'New wallet has not allowed CoreProxy sUSDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'sUSDC',
      spenderAddress: require('../../deployments/CoreProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sUSDC',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      true
    );
  });

  it('should deposit 9_000 sUSDC into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 10_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({ privateKey, symbol: 'sUSDC', accountId, amount: 9_000 });

    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 1_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 9_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it('should make a price update', async () => {
    // We must sync timestamp of the fork before making price updates
    await syncTime();

    // delegating collateral and views requiring price will fail if there's no price update within the last hour,
    // so we send off a price update just to be safe
    await doPriceUpdate({
      wallet,
      marketId: 100,
      settlementStrategyId: require('../../deployments/extras.json').eth_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 200,
      settlementStrategyId: require('../../deployments/extras.json').btc_pyth_settlement_strategy,
    });
  });

  it('should delegate 9_000 sUSDC into the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 9_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 8_000,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 9_000,
      totalAssigned: 8_000,
      totalLocked: 0,
    });
  });

  it('should atomic swap 50 sUSDC to snxUSD to burn debt', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 0);
    await swapToSusd({
      wallet,
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      amount: 50,
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 50);
  });

  it('should approve snxUSD spending for CoreProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'snxUSD',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      false,
      'New wallet has not allowed CoreProxy snxUSD spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'snxUSD',
      spenderAddress: require('../../deployments/CoreProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'snxUSD',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      true
    );
  });

  it('should deposit 30 snxUSD into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 50);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'snxUSD' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({
      privateKey,
      symbol: 'snxUSD',
      accountId,
      amount: 30,
    });

    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 20);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'snxUSD' }), {
      totalDeposited: 30,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it.skip('should undelegate 200 sUSDC from the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 9_000,
      totalAssigned: 8_000,
      totalLocked: 0,
    });

    await undelegateCollateral({
      wallet,
      accountId,
      symbol: 'sUSDC',
      targetAmount: 7_000,
      poolId: 1,
    });

    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 9_000,
      totalAssigned: 7_000,
      totalLocked: 0,
    });
  });

  it.skip('should not be able to withdraw because of accountTimeoutWithdraw', async () => {
    await setConfigUint({ key: 'accountTimeoutWithdraw', value: 100 });
    assert.equal(await getConfigUint('accountTimeoutWithdraw'), 100);

    await assert.rejects(
      async () =>
        await withdrawCollateral({
          privateKey,
          symbol: 'sUSDC',
          accountId,
          amount: 1000,
        })
    );
  });

  it.skip('should withdraw 200 sUSDC', async () => {
    await setConfigUint({ key: 'accountTimeoutWithdraw', value: 0 });
    assert.equal(await getConfigUint('accountTimeoutWithdraw'), 0);
    await withdrawCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 1000,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 8_000,
      totalAssigned: 7_000,
      totalLocked: 0,
    });
    // 1k in wallet
    // -50 -> swapped to snxUSD
    // + 1k from withdrawal
    // = 1_950
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 1_950);
  });
});
