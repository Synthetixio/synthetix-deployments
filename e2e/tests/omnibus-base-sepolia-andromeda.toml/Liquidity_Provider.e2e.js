const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { wrapCollateral } = require('../../tasks/wrapCollateral');
const { getAccountOwner } = require('../../tasks/getAccountOwner');
const { createAccount } = require('../../tasks/createAccount');
const { getCollateralConfig } = require('../../tasks/getCollateralConfig');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { approveCollateral } = require('../../tasks/approveCollateral');
const { depositCollateral } = require('../../tasks/depositCollateral');
const { delegateCollateral } = require('../../tasks/delegateCollateral');
const { setConfigUint } = require('../../tasks/setConfigUint');
const { getConfigUint } = require('../../tasks/getConfigUint');
const { withdrawCollateral } = require('../../tasks/withdrawCollateral');
const { spotSell } = require('../../tasks/spotSell');
const { undelegateCollateral } = require('../../tasks/undelegateCollateral');
const { setSpotWrapper } = require('../../tasks/setSpotWrapper');
const {
  configureMaximumMarketCollateral,
} = require('../../tasks/configureMaximumMarketCollateral');
const { syncTime } = require('../../tasks/syncTime');

const SYNTH_USDC_MAX_MARKET_COLLATERAL = 100_000_000;

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

  it(`should set fUSDC balance to ${SYNTH_USDC_MAX_MARKET_COLLATERAL * 2}`, async () => {
    const { tokenAddress } = await getCollateralConfig('fUSDC');
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fUSDC' }),
      0,
      'New wallet has 0 fUSDC balance'
    );
    await setMintableTokenBalance({
      privateKey,
      tokenAddress,
      balance: SYNTH_USDC_MAX_MARKET_COLLATERAL * 2,
    });
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fUSDC' }),
      SYNTH_USDC_MAX_MARKET_COLLATERAL * 2
    );
  });

  it('should approve fUSDC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fUSDC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket fUSDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'fUSDC',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fUSDC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  it(`should increase max collateral for the test to ${SYNTH_USDC_MAX_MARKET_COLLATERAL * 2}`, async () => {
    await configureMaximumMarketCollateral({
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      symbol: 'fUSDC',
      targetAmount: String(SYNTH_USDC_MAX_MARKET_COLLATERAL * 2),
    });
    await setSpotWrapper({
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      symbol: 'fUSDC',
      targetAmount: String(SYNTH_USDC_MAX_MARKET_COLLATERAL * 2),
    });
  });

  it(`should wrap ${SYNTH_USDC_MAX_MARKET_COLLATERAL} fUSDC`, async () => {
    const balance = await wrapCollateral({
      wallet,
      symbol: 'fUSDC',
      synthAddress: require('../../deployments/extras.json').synth_usdc_token_address,
      synthMarketId: require('../../deployments/extras.json').synth_usdc_market_id,
      amount: SYNTH_USDC_MAX_MARKET_COLLATERAL,
    });
    assert.equal(balance, SYNTH_USDC_MAX_MARKET_COLLATERAL);
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

  it(`should deposit ${SYNTH_USDC_MAX_MARKET_COLLATERAL - 100_000} sUSDC into the system`, async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'sUSDC' }),
      SYNTH_USDC_MAX_MARKET_COLLATERAL
    );
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: SYNTH_USDC_MAX_MARKET_COLLATERAL - 100_000,
    });

    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 100_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: SYNTH_USDC_MAX_MARKET_COLLATERAL - 100_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it(`should delegate ${SYNTH_USDC_MAX_MARKET_COLLATERAL - 200_000} sUSDC into the Spartan Council pool`, async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: SYNTH_USDC_MAX_MARKET_COLLATERAL - 100_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: SYNTH_USDC_MAX_MARKET_COLLATERAL - 200_000,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: SYNTH_USDC_MAX_MARKET_COLLATERAL - 100_000,
      totalAssigned: SYNTH_USDC_MAX_MARKET_COLLATERAL - 200_000,
      totalLocked: 0,
    });
  });

  it('should atomic swap 50 sUSDC to sUSD to burn debt', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSD' }), 0);
    await spotSell({
      wallet,
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      synthAmount: 50,
      minUsdAmount: 50, // 0% slippage
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSD' }), 50);
  });

  it('should approve sUSD spending for CoreProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sUSD',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      false,
      'New wallet has not allowed CoreProxy sUSD spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'sUSD',
      spenderAddress: require('../../deployments/CoreProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sUSD',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      true
    );
  });

  it('should deposit 30 sUSD into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSD' }), 50);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSD' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({
      privateKey,
      symbol: 'sUSD',
      accountId,
      amount: 30,
    });

    assert.equal(await getCollateralBalance({ address, symbol: 'sUSD' }), 20);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSD' }), {
      totalDeposited: 30,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it.skip('should undelegate 100_000 sUSDC from the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: SYNTH_USDC_MAX_MARKET_COLLATERAL - 100_000,
      totalAssigned: SYNTH_USDC_MAX_MARKET_COLLATERAL - 200_000,
      totalLocked: 0,
    });

    await undelegateCollateral({
      wallet,
      accountId,
      symbol: 'sUSDC',
      targetAmount: SYNTH_USDC_MAX_MARKET_COLLATERAL - 300_000,
      poolId: 1,
    });

    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: SYNTH_USDC_MAX_MARKET_COLLATERAL - 100_000,
      totalAssigned: SYNTH_USDC_MAX_MARKET_COLLATERAL - 300_000,
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
          amount: 100_000,
        })
    );
  });

  it.skip('should withdraw 100_000 sUSDC', async () => {
    await setConfigUint({ key: 'accountTimeoutWithdraw', value: 0 });
    assert.equal(await getConfigUint('accountTimeoutWithdraw'), 0);
    await withdrawCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 100_000,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: SYNTH_USDC_MAX_MARKET_COLLATERAL - 200_000,
      totalAssigned: SYNTH_USDC_MAX_MARKET_COLLATERAL - 300_000,
      totalLocked: 0,
    });
    // 100k in wallet
    // -50 -> swapped to sUSD
    // + 100k from withdrawal
    // = 199_950
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 199_950);
  });
});
