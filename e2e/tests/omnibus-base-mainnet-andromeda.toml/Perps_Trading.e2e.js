const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
require('../../inspect');

const { approveCollateral } = require('../../tasks/approveCollateral');
const { createPerpsAccount } = require('../../tasks/createPerpsAccount');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getEthBalance } = require('../../tasks/getEthBalance');
const { getPerpsAccountOwner } = require('../../tasks/getPerpsAccountOwner');
const { getPerpsAccountPermissions } = require('../../tasks/getPerpsAccountPermissions');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { setUSDCTokenBalance } = require('../../tasks/setUSDCTokenBalance');
const { swapToSusd } = require('../../tasks/swapToSusd');
const { wrapUsdc } = require('../../tasks/wrapUsdc');
const { getPerpsCollateral } = require('../../tasks/getPerpsCollateral');
const { modifyPerpsCollateral } = require('../../tasks/modifyPerpsCollateral');
const { commitPerpsOrder } = require('../../tasks/commitPerpsOrder');
const { settlePerpsOrder } = require('../../tasks/settlePerpsOrder');
const { getPerpsPosition } = require('../../tasks/getPerpsPosition');
const { doStrictPriceUpdate } = require('../../tasks/doStrictPriceUpdate');
const { doPriceUpdate } = require('../../tasks/doPriceUpdate');
const { setSettlementDelays } = require('../../tasks/setPerpsSettlementDelays');
const { getPerpsSettlementStrategy } = require('../../tasks/getPerpsSettlementStrategy');

const SpotMarketProxyDeployment = require('../../deployments/SpotMarketProxy.json');
const PerpsMarketProxyDeployment = require('../../deployments/PerpsMarketProxy.json');
const extras = require('../../deployments/extras.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const wait = (ms) =>
  new Promise((resolve) => {
    require('debug')(`e2e:wait`)('Start', { ms });
    setTimeout(() => {
      require('debug')(`e2e:wait`)('Finish', { ms });
      resolve();
    }, ms);
  });

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`420${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    wallet
  );

  it('should create new random wallet', async () => {
    log({ wallet: wallet.address, pk: wallet.privateKey });
    assert.ok(wallet.address);
  });

  it('should set ETH balance to 100', async () => {
    const address = wallet.address;
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 100 });
    assert.equal(await getEthBalance({ address }), 100);
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
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      false,
      'New wallet has not allowed SpotMarket USDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'USDC',
      spenderAddress: SpotMarketProxyDeployment.address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDC',
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      true
    );
  });

  it('should make a price update', async () => {
    // commitOrder and views requiring price will fail if there's no price update within the last hour,
    // so we send off a price update just to be safe
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

  it('should wrap 10_000 USDC', async () => {
    const balance = await wrapUsdc({ wallet, amount: 10_000 });
    assert.equal(balance, 10_000);
  });

  // TODO: uncomment if we need to top up LP
  //
  //  it('should create core account', async () => {
  //    assert.equal(
  //      await getAccountOwner({ accountId }),
  //      ethers.constants.AddressZero,
  //      'New wallet should not have an account yet'
  //    );
  //    await createAccount({ wallet, accountId });
  //    assert.equal(await getAccountOwner({ accountId }), address);
  //  });
  //
  //  it('should approve sUSDC spending for CoreProxy', async () => {
  //    assert.equal(
  //      await isCollateralApproved({ address, symbol: 'sUSDC' }),
  //      false,
  //      'New wallet has not allowed CoreProxy sUSDC spending'
  //    );
  //    await approveCollateral({ privateKey, symbol: 'sUSDC' });
  //    assert.equal(await isCollateralApproved({ address, symbol: 'sUSDC' }), true);
  //  });
  //
  //  it('should deposit 5_000 sUSDC into the system', async () => {
  //    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 10_000);
  //    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
  //      totalDeposited: 0,
  //      totalAssigned: 0,
  //      totalLocked: 0,
  //    });
  //
  //    await depositCollateral({ privateKey, symbol: 'sUSDC', accountId, amount: 5_000 });
  //
  //    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 5_000);
  //    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
  //      totalDeposited: 5_000,
  //      totalAssigned: 0,
  //      totalLocked: 0,
  //    });
  //  });
  //
  //  it('should delegate 300 sUSDC into the Spartan Council pool', async () => {
  //    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
  //      totalDeposited: 5_000,
  //      totalAssigned: 0,
  //      totalLocked: 0,
  //    });
  //    await delegateCollateral({
  //      privateKey,
  //      symbol: 'sUSDC',
  //      accountId,
  //      amount: 5_000,
  //      poolId: 1,
  //    });
  //    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
  //      totalDeposited: 5_000,
  //      totalAssigned: 5_000,
  //      totalLocked: 0,
  //    });
  //  });

  it('should create perps account', async () => {
    assert.equal(
      await getPerpsAccountOwner({ accountId }),
      ethers.constants.AddressZero,
      'New wallet should not have an account yet'
    );
    const createdAccountId = await createPerpsAccount({ wallet, accountId });
    assert.equal(createdAccountId, accountId, 'Account ID');
    assert.equal(await getPerpsAccountOwner({ accountId }), wallet.address);
    const permissions = await getPerpsAccountPermissions({ accountId });
    assert.equal(permissions.length, 0);
  });

  it('should atomic swap 5_000 sUSDC to snxUSD to trade', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 0);
    await swapToSusd({ wallet, marketId: extras.synth_usdc_market_id, amount: 5_000 });
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 5_000);
  });

  it('should approve snxUSD spending for PerpsMarketProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'snxUSD',
        spenderAddress: PerpsMarketProxy.address,
      }),
      false,
      'New wallet has not allowed PerpsMarketProxy snxUSD spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'snxUSD',
      spenderAddress: PerpsMarketProxy.address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'snxUSD',
        spenderAddress: PerpsMarketProxy.address,
      }),
      true
    );
  });

  it('should deposit 5_000 snxUSD to Perps', async () => {
    assert.equal(await getPerpsCollateral({ accountId }), 0);
    await modifyPerpsCollateral({ wallet, accountId, deltaAmount: 5_000 });
    assert.equal(await getPerpsCollateral({ accountId }), 5_000);
  });

  it('should withdraw 100 snxUSD from Perps', async () => {
    assert.equal(await getPerpsCollateral({ accountId }), 5_000);
    await modifyPerpsCollateral({ wallet, accountId, deltaAmount: -100 });
    assert.equal(await getPerpsCollateral({ accountId }), 4_900);
  });

  it('should reduce settlement and commitment delay to 1s', async () => {
    const marketId = 200;
    const settlementStrategyId = extras.btc_pyth_settlement_strategy;
    await setSettlementDelays({
      settlementStrategyId,
      marketId,
      settlementDelay: 1,
      commitmentPriceDelay: 1,
    });
    const strategy = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
    log({ strategy });
    assert.equal(strategy.settlementDelay, 1);
    assert.equal(strategy.commitmentPriceDelay, 1);
  });

  it('should open a short 0.1 BTC position', async () => {
    const marketId = 200;
    const settlementStrategyId = extras.btc_pyth_settlement_strategy;
    const { commitmentTime } = await commitPerpsOrder({
      wallet,
      accountId,
      marketId,
      sizeDelta: -0.1,
      settlementStrategyId,
    });
    const now = Math.floor(Date.now() / 1000);
    const diff = now - commitmentTime;
    log({ commitmentTime, now, diff });
    // Wait for commitment price/settlement delay
    // When we run steps and advance blocks we may end up in the "future" so Pyth fails with 404 error
    await wait(diff < 0 ? Math.abs(diff) * 1000 + 3000 : 3000);
    await doStrictPriceUpdate({ wallet, marketId, settlementStrategyId, commitmentTime });
    await settlePerpsOrder({ wallet, accountId, marketId });
    const position = await getPerpsPosition({ accountId, marketId });
    assert.equal(position.positionSize, -0.1);
  });

  it('should close a short 0.1 BTC position', async () => {
    const marketId = 200;
    const settlementStrategyId = extras.btc_pyth_settlement_strategy;

    //    await wait(2000); // wait for commitment price/ settlement delay
    const { commitmentTime } = await commitPerpsOrder({
      wallet,
      accountId,
      marketId,
      sizeDelta: 0.1,
      settlementStrategyId,
    });
    const now = Math.floor(Date.now() / 1000);
    const diff = now - commitmentTime;
    log({ commitmentTime, now, diff });
    // Wait for commitment price/settlement delay
    // When we run steps and advance blocks we may end up in the "future" so Pyth fails with 404 error
    await wait(diff < 0 ? Math.abs(diff) * 1000 + 3000 : 3000);
    await doStrictPriceUpdate({ wallet, marketId, settlementStrategyId, commitmentTime });
    await settlePerpsOrder({ wallet, accountId, marketId });
    const position = await getPerpsPosition({ accountId, marketId });
    assert.equal(position.positionSize, 0);
  });

  it('should revert when trade > Max Market Size', async () => {
    const marketId = 200;
    const settlementStrategyId = extras.btc_pyth_settlement_strategy;
    const maxSize = await PerpsMarketProxy.getMaxMarketSize(marketId);
    log({ marketId, maxSize });
    try {
      await commitPerpsOrder({
        wallet,
        accountId,
        marketId,
        sizeDelta: parseFloat(ethers.utils.formatEther(maxSize.mul(2))),
        settlementStrategyId,
      });
      throw Error('Commit should revert');
    } catch (error) {
      const errorData =
        error?.error?.error?.error?.data ||
        error?.error?.data?.data ||
        error?.error?.error?.data ||
        error?.error?.data;
      const parsedError = errorData ? PerpsMarketProxy.interface.parseError(errorData) : error;
      assert.equal(parsedError.name, 'MaxOpenInterestReached');
    }
  });

  it('should reset settlement and commitment delay to 2s', async () => {
    const marketId = 200;
    const settlementStrategyId = extras.btc_pyth_settlement_strategy;
    await setSettlementDelays({
      settlementStrategyId,
      marketId,
      settlementDelay: 2,
      commitmentPriceDelay: 2,
    });
    const strategy = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
    log({ strategy });
    assert.equal(strategy.settlementDelay, 2);
    assert.equal(strategy.commitmentPriceDelay, 2);
  });
});
