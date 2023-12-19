const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { wrapFakeUsdc } = require('../../tasks/wrapFakeUsdc');
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
const { doPriceUpdate } = require('../../tasks/doPriceUpdate');

const extras = require('../../deployments/extras.json');
const SpotMarketProxyDeployment = require('../../deployments/SpotMarketProxy.json');
const USDCDeployment = require('../../deployments/FakeCollateralfUSDC.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

describe(require('path').basename(__filename, '.e2e.js'), function () {
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

  it('should create user account', async () => {
    assert.equal(
      await getAccountOwner({ accountId }),
      ethers.constants.AddressZero,
      'New wallet should not have an account yet'
    );
    await createAccount({ wallet, accountId });
    assert.equal(await getAccountOwner({ accountId }), address);
  });

  it('should set USDC balance to 10_000_000', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fUSDC' }),
      0,
      'New wallet has 0 USDC balance'
    );
    await setMintableTokenBalance({
      privateKey,
      tokenAddress: USDCDeployment.address,
      balance: 10_000_000,
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'fUSDC' }), 10_000_000);
  });

  it('should approve USDC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fUSDC',
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      false,
      'New wallet has not allowed SpotMarket USDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'fUSDC',
      spenderAddress: SpotMarketProxyDeployment.address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fUSDC',
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      true
    );
  });

  it('should make a price update', async () => {
    await doPriceUpdate({
      wallet,
      marketId: 100,
      settlementStrategyId: extras.eth_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 200,
      settlementStrategyId: extras.btc_pyth_settlement_strategy,
    });
  });

  it('should wrap 500 USDC', async () => {
    const balance = await wrapFakeUsdc({ wallet, amount: 500 });
    assert.equal(balance, 500);
  });

  it('should approve sUSDC spending for CoreProxy', async () => {
    assert.equal(
      await isCollateralApproved({ address, symbol: 'sUSDC' }),
      false,
      'New wallet has not allowed CoreProxy sUSDC spending'
    );
    await approveCollateral({ privateKey, symbol: 'sUSDC' });
    assert.equal(await isCollateralApproved({ address, symbol: 'sUSDC' }), true);
  });

  it('should deposit 400 sUSDC into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 500);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({ privateKey, symbol: 'sUSDC', accountId, amount: 400 });

    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 100);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 400,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it('should delegate 300 sUSDC into the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 400,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 300,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 400,
      totalAssigned: 300,
      totalLocked: 0,
    });
  });

  it('should atomic swap 50 sUSDC to snxUSD to burn debt', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 0);
    await swapToSusd({ wallet, marketId: extras.synth_usdc_market_id, amount: 50 });
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 50);
  });

  it('should approve snxUSD spending for CoreProxy', async () => {
    assert.equal(
      await isCollateralApproved({ address, symbol: 'snxUSD' }),
      false,
      'New wallet has not allowed CoreProxy snxUSD spending'
    );
    await approveCollateral({ privateKey, symbol: 'snxUSD' });
    assert.equal(await isCollateralApproved({ address, symbol: 'snxUSD' }), true);
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

  it('should undelegate 200 sUSDC from the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 400,
      totalAssigned: 300,
      totalLocked: 0,
    });

    await undelegateCollateral({
      wallet,
      accountId,
      symbol: 'sUSDC',
      targetAmount: 100,
      poolId: 1,
    });

    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
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
          symbol: 'sUSDC',
          accountId,
          amount: 200,
        })
    );
  });

  it('should withdraw 200 sUSDC', async () => {
    await setConfigUint({ key: 'accountTimeoutWithdraw', value: 0 });
    assert.equal(await getConfigUint('accountTimeoutWithdraw'), 0);
    await withdrawCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 200,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 200,
      totalAssigned: 100,
      totalLocked: 0,
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 250);
  });
});
