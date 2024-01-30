const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');

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
const { swapToSusd } = require('../../tasks/swapToSusd');
const { undelegateCollateral } = require('../../tasks/undelegateCollateral');
const { doPriceUpdate } = require('../../tasks/doPriceUpdate');
const { setSpotWrapper } = require('../../tasks/setSpotWrapper');
const {
  configureMaximumMarketCollateral,
} = require('../../tasks/configureMaximumMarketCollateral');
const { syncTime } = require('../../tasks/syncTime');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

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

  it('should set fUSDC balance to 20_000_000', async () => {
    const { tokenAddress } = await getCollateralConfig('fUSDC');
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fUSDC' }),
      0,
      'New wallet has 0 fUSDC balance'
    );
    await setMintableTokenBalance({ privateKey, tokenAddress, balance: 20_000_000 });
    assert.equal(await getCollateralBalance({ address, symbol: 'fUSDC' }), 20_000_000);
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

  it('should increase max collateral for the test to 20_000_000', async () => {
    await configureMaximumMarketCollateral({
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      symbol: 'fUSDC',
      targetAmount: String(20_000_000),
    });
    await setSpotWrapper({
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      symbol: 'fUSDC',
      targetAmount: String(20_000_000),
    });
  });

  it('should wrap 15_000_000 fUSDC', async () => {
    const balance = await wrapCollateral({ wallet, symbol: 'fUSDC', amount: 15_000_000 });
    assert.equal(balance, 15_000_000);
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

  it('should deposit 5_000_000 sUSDC into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 15_000_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({ privateKey, symbol: 'sUSDC', accountId, amount: 5_000_000 });

    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 10_000_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 5_000_000,
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

  it('should delegate 5_000_000 sUSDC into the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 5_000_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 5_000_000,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 5_000_000,
      totalAssigned: 5_000_000,
      totalLocked: 0,
    });
  });

  it('should atomic swap 5_000_000 sUSDC to snxUSD to burn debt', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 10_000_000);
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 0);
    await swapToSusd({
      wallet,
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      amount: 5_000_000,
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 5_000_000);
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 5_000_000);
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

  it('should deposit 5_000_000 snxUSD into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 5_000_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'snxUSD' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({
      privateKey,
      symbol: 'snxUSD',
      accountId,
      amount: 5_000_000,
    });

    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 0);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'snxUSD' }), {
      totalDeposited: 5_000_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it.skip('should undelegate 100_000 sUSDC from the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 5_000_000,
      totalAssigned: 5_000_000,
      totalLocked: 0,
    });

    await require('../../tasks/burnDebt').burnDebt({
      wallet,
      accountId,
      symbol: 'sUSDC',
      poolId: 1,
    });

    await require('../../tasks/mineBlock').mineBlock();

    const SpotMarketProxy = new ethers.Contract(
      require('../../deployments/SpotMarketProxy.json').address,
      require('../../deployments/SpotMarketProxy.json').abi,
      provider
    );
    log({
      marketId: 1,
      minimumCredit: await SpotMarketProxy.minimumCredit(1),
    });

    const CoreProxy = new ethers.Contract(
      require('../../deployments/CoreProxy.json').address,
      require('../../deployments/CoreProxy.json').abi,
      provider
    );
    log({
      marketId: 1,
      isMarketCapacityLocked: await CoreProxy.isMarketCapacityLocked(1),
      getMarketReportedDebt: await CoreProxy.getMarketReportedDebt(1),
      getMarketTotalDebt: await CoreProxy.getMarketTotalDebt(1),
    });
    log({
      marketId: 2,
      isMarketCapacityLocked: await CoreProxy.isMarketCapacityLocked(2),
      getMarketReportedDebt: await CoreProxy.getMarketReportedDebt(2),
      getMarketTotalDebt: await CoreProxy.getMarketTotalDebt(2),
    });

    await undelegateCollateral({
      wallet,
      accountId,
      symbol: 'sUSDC',
      targetAmount: 4_900_000,
      poolId: 1,
    });

    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 5_000_000,
      totalAssigned: 4_900_000,
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
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 5_000_000);
    await withdrawCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 100_000,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 4_900_000,
      totalAssigned: 4_900_000,
      totalLocked: 0,
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 5_100_000);
  });
});
