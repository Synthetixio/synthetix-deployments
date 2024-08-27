const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
const { wait } = require('../../wait');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { createPerpsAccount } = require('../../tasks/createPerpsAccount');
const { getEthBalance } = require('../../tasks/getEthBalance');
const { getPerpsAccountOwner } = require('../../tasks/getPerpsAccountOwner');
const { getPerpsAccountPermissions } = require('../../tasks/getPerpsAccountPermissions');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { spotSell } = require('../../tasks/spotSell');
const { wrapCollateral } = require('../../tasks/wrapCollateral');
const { getPerpsCollateral } = require('../../tasks/getPerpsCollateral');
const { getDebt } = require('../../tasks/getDebt');
const { getCanLiquidate } = require('../../tasks/getCanLiquidate');
const { getAvailableMargin } = require('../../tasks/getAvailableMargin');
const { liquidate } = require('../../tasks/liquidate');
const { setLiquidationParameters } = require('../../tasks/setLiquidationParameters');
const { modifyPerpsCollateral } = require('../../tasks/modifyPerpsCollateral');
const { commitPerpsOrder } = require('../../tasks/commitPerpsOrder');
const { settlePerpsOrder } = require('../../tasks/settlePerpsOrder');
const { getPerpsPosition } = require('../../tasks/getPerpsPosition');
const { setWETHTokenBalance } = require('../../tasks/setWETHTokenBalance');
const { setTokenBalance } = require('../../tasks/setTokenBalance');
const { doPriceUpdateForPyth } = require('../../tasks/doPriceUpdateForPyth');
const { doStrictPriceUpdate } = require('../../tasks/doStrictPriceUpdate');
const { syncTime } = require('../../tasks/syncTime');
const { getTokenBalance } = require('../../tasks/getTokenBalance');
const { approveToken } = require('../../tasks/approveToken');
const { isTokenApproved } = require('../../tasks/isTokenApproved');

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const extras = require('../../deployments/extras.json');
  const meta = require('../../deployments/meta.json');
  const accountId = parseInt(`420${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const walletAddress = wallet.address;
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
    const address = wallet.address;
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 100 });
    assert.equal(await getEthBalance({ address }), 100);
  });

  it('should set tBTC balance to 10', async () => {
    assert.equal(
      await getTokenBalance({ walletAddress, tokenAddress: extras.tbtc_address }),
      0,
      'New wallet has 0 tBTC balance'
    );
    await setTokenBalance({
      wallet,
      balance: 10,
      tokenAddress: extras.tbtc_address,
      friendlyWhale: '0xe9e6b9aAAfaf6816C3364345F6eF745CcFC8660a',
    });
    assert.equal(await getTokenBalance({ walletAddress, tokenAddress: extras.tbtc_address }), 10);
  });

  it('should set WETH balance to 50', async () => {
    assert.equal(
      await getTokenBalance({ walletAddress, tokenAddress: extras.weth_address }),
      0,
      'New wallet has 0 WETH balance'
    );
    await setWETHTokenBalance({ wallet, balance: 50 });
    assert.equal(await getTokenBalance({ walletAddress, tokenAddress: extras.weth_address }), 50);
  });

  it('should approve tBTC spending for SpotMarket', async () => {
    assert.equal(
      await isTokenApproved({
        walletAddress,
        tokenAddress: extras.tbtc_address,
        spenderAddress: meta.contracts.SpotMarketProxy,
      }),
      false,
      'New wallet has not allowed SpotMarket tBTC spending'
    );
    await approveToken({
      privateKey,
      tokenAddress: extras.tbtc_address,
      spenderAddress: meta.contracts.SpotMarketProxy,
    });
    assert.equal(
      await isTokenApproved({
        walletAddress,
        tokenAddress: extras.tbtc_address,
        spenderAddress: meta.contracts.SpotMarketProxy,
      }),
      true
    );
  });

  it('should approve WETH spending for SpotMarket', async () => {
    assert.equal(
      await isTokenApproved({
        walletAddress,
        tokenAddress: extras.weth_address,
        spenderAddress: meta.contracts.SpotMarketProxy,
      }),
      false,
      'New wallet has not allowed SpotMarket WETH spending'
    );
    await approveToken({
      privateKey,
      tokenAddress: extras.weth_address,
      spenderAddress: meta.contracts.SpotMarketProxy,
    });
    assert.equal(
      await isTokenApproved({
        walletAddress,
        tokenAddress: extras.weth_address,
        spenderAddress: meta.contracts.SpotMarketProxy,
      }),
      true
    );
  });

  it('should wrap 5 tBTC', async () => {
    await doPriceUpdateForPyth({
      wallet,
      feedId: extras.pyth_feed_id_btc,
      priceVerificationContract: extras.pyth_price_verification_address,
    });
    const balance = await wrapCollateral({
      wallet,
      symbol: 'sBTC',
      synthAddress: extras.synth_btc_token_address,
      synthMarketId: extras.synth_btc_market_id,
      amount: 5,
    });
    assert.equal(balance, 5);
  });

  it('should wrap 15 fETH', async () => {
    await doPriceUpdateForPyth({
      wallet,
      feedId: extras.pyth_feed_id_eth,
      priceVerificationContract: extras.pyth_price_verification_address,
    });
    const balance = await wrapCollateral({
      wallet,
      symbol: 'sETH',
      synthAddress: extras.synth_eth_token_address,
      synthMarketId: extras.synth_eth_market_id,
      amount: 15,
    });
    assert.equal(balance, 15);
  });

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

  it('should atomic swap 5 sETH to USDx to trade', async () => {
    assert.equal(
      await getTokenBalance({
        walletAddress,
        tokenAddress: require('../../deployments/systemToken.json').address,
      }),
      0
    );
    await spotSell({
      wallet,
      marketId: extras.synth_eth_market_id,
      synthAmount: 5,
      minUsdAmount: 1000, // 0% slippage
    });
    assert.ok(
      (await getTokenBalance({
        walletAddress,
        tokenAddress: require('../../deployments/systemToken.json').address,
      })) > 0
    );
  });

  it('should approve USDx, sBTC, sETH spending for PerpsMarketProxy', async () => {
    await approveToken({
      privateKey,
      tokenAddress: require('../../deployments/systemToken.json').address,
      spenderAddress: meta.contracts.PerpsMarketProxy,
    });
    assert.equal(
      await isTokenApproved({
        walletAddress,
        tokenAddress: require('../../deployments/systemToken.json').address,
        spenderAddress: meta.contracts.PerpsMarketProxy,
      }),
      true
    );

    await approveToken({
      privateKey,
      tokenAddress: extras.synth_btc_token_address,
      spenderAddress: meta.contracts.PerpsMarketProxy,
    });
    assert.equal(
      await isTokenApproved({
        walletAddress,
        tokenAddress: extras.synth_btc_token_address,
        spenderAddress: meta.contracts.PerpsMarketProxy,
      }),
      true
    );

    await approveToken({
      privateKey,
      tokenAddress: extras.synth_eth_token_address,
      spenderAddress: meta.contracts.PerpsMarketProxy,
    });
    assert.equal(
      await isTokenApproved({
        walletAddress,
        tokenAddress: extras.synth_eth_token_address,
        spenderAddress: meta.contracts.PerpsMarketProxy,
      }),
      true
    );
  });

  it('should make sBTC, sETH, and USDx deposit to Perps', async () => {
    assert.equal(await getPerpsCollateral({ accountId }), 0);
    assert.equal(await getPerpsCollateral({ marketId: extras.synth_eth_market_id, accountId }), 0);
    assert.equal(await getPerpsCollateral({ marketId: extras.synth_btc_market_id, accountId }), 0);

    await modifyPerpsCollateral({ wallet, accountId, marketId: 0, deltaAmount: 2_000 });
    await modifyPerpsCollateral({
      wallet,
      accountId,
      marketId: extras.synth_btc_market_id,
      deltaAmount: 5,
    });
    await modifyPerpsCollateral({
      wallet,
      accountId,
      marketId: extras.synth_eth_market_id,
      deltaAmount: 10,
    });

    assert.equal(await getPerpsCollateral({ accountId }), 2_000);
    assert.equal(await getPerpsCollateral({ accountId, marketId: extras.synth_btc_market_id }), 5);
    assert.equal(await getPerpsCollateral({ accountId, marketId: extras.synth_eth_market_id }), 10);
  });

  it('should open a 0.1 BTC long position', async () => {
    const marketId = extras.btc_perps_market_id;
    const settlementStrategyId = extras.btc_pyth_settlement_strategy;

    // We must sync timestamp of the fork before making time-sensitive operations
    await syncTime();
    await wait(1000);

    const { commitmentTime } = await commitPerpsOrder({
      wallet,
      accountId,
      marketId,
      sizeDelta: 0.1,
      settlementStrategyId,
    });

    // Wait for commitment price/settlement delay
    await wait(2000);

    // Wait for pyth to update prices
    await wait(5000);

    await doStrictPriceUpdate({ wallet, marketId, settlementStrategyId, commitmentTime });
    await settlePerpsOrder({ wallet, accountId, marketId });
    const position = await getPerpsPosition({ accountId, marketId });
    assert.equal(position.positionSize, 0.1);
    const debt = await getDebt({ accountId });
    assert.equal(debt, 0);
  });

  it('should liquidate the account when the margin requirements increase past the account margin', async () => {
    const marketId = extras.btc_perps_market_id;
    const newInitialMarginRatioD18 = ethers.utils.parseEther('1');
    const newMinimumInitialMarginRatioD18 = ethers.utils.parseEther('1');
    const newMaintenanceMarginScalarD18 = ethers.utils.parseEther('1');
    const newFlagRewardRatioD18 = ethers.utils.parseEther('1');
    const newMinimumPositionMargin = ethers.utils.parseEther(String(100_000_000));

    const initialCanLiquidate = await getCanLiquidate({ accountId });
    log({ initialCanLiquidate });
    assert.ok(!initialCanLiquidate);

    const initialAvailableMargin = await getAvailableMargin({ accountId });
    log({ initialAvailableMargin });
    assert.ok(initialAvailableMargin > 0);

    await setLiquidationParameters({
      marketId,
      newInitialMarginRatioD18,
      newMinimumInitialMarginRatioD18,
      newMaintenanceMarginScalarD18,
      newFlagRewardRatioD18,
      newMinimumPositionMargin,
    });

    const postParameterUpdateCanLiquidate = await getCanLiquidate({ accountId });
    log({ postParameterUpdateCanLiquidate });
    assert.ok(postParameterUpdateCanLiquidate);

    await doPriceUpdateForPyth({
      wallet,
      feedId: extras.pyth_feed_id_eth,
      priceVerificationContract: extras.pyth_price_verification_address,
    });

    await liquidate({ wallet, accountId });

    const postLiquidateCanLiquidate = await getCanLiquidate({ accountId });
    log({ postLiquidateCanLiquidate });
    assert.ok(!postLiquidateCanLiquidate);

    const postAvailableMargin = await getAvailableMargin({ accountId });
    log({ postAvailableMargin });
    assert.equal(postAvailableMargin, 0);
  });
});
