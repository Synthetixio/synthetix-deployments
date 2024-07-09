const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
const { wait } = require('../../wait');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { approveCollateral } = require('../../tasks/approveCollateral');
const { createPerpsAccount } = require('../../tasks/createPerpsAccount');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getEthBalance } = require('../../tasks/getEthBalance');
const { getPerpsAccountOwner } = require('../../tasks/getPerpsAccountOwner');
const { getPerpsAccountPermissions } = require('../../tasks/getPerpsAccountPermissions');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { getCollateralConfig } = require('../../tasks/getCollateralConfig');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { spotSell } = require('../../tasks/spotSell');
const { wrapCollateral } = require('../../tasks/wrapCollateral');
const { getPerpsCollateral } = require('../../tasks/getPerpsCollateral');
const { modifyPerpsCollateral } = require('../../tasks/modifyPerpsCollateral');
const { commitPerpsOrder } = require('../../tasks/commitPerpsOrder');
const { settlePerpsOrder } = require('../../tasks/settlePerpsOrder');
const { getPerpsPosition } = require('../../tasks/getPerpsPosition');
const { setWETHTokenBalance } = require('../../tasks/setWETHTokenBalance');
const { doStrictPriceUpdate } = require('../../tasks/doStrictPriceUpdate');
const { syncTime } = require('../../tasks/syncTime');
const { setSpotWrapper } = require('../../tasks/setSpotWrapper');
const {
  configureMaximumMarketCollateral,
} = require('../../tasks/configureMaximumMarketCollateral');

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`420${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

  const PerpsMarketProxy = new ethers.Contract(
    require('../../deployments/PerpsMarketProxy.json').address,
    require('../../deployments/PerpsMarketProxy.json').abi,
    wallet
  );

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

  it('should set fBTC balance to 25', async () => {
    const { tokenAddress } = await getCollateralConfig('fBTC');
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fBTC' }),
      0,
      'New wallet has 0 fBTC balance'
    );
    await setMintableTokenBalance({ privateKey, tokenAddress, balance: 25 });
    assert.equal(await getCollateralBalance({ address, symbol: 'fBTC' }), 25);
  });

  it('should set WETH balance to 50', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'WETH' }),
      0,
      'New wallet has 0 WETH balance'
    );
    await setWETHTokenBalance({ wallet, balance: 50 });
    assert.equal(await getCollateralBalance({ address, symbol: 'WETH' }), 50);
  });

  it('should approve fBTC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fBTC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket fBTC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'fBTC',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fBTC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  it('should approve WETH spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'WETH',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket WETH spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'WETH',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'WETH',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  // it('should increase max collateral for the test to 1_000_000_000_000', async () => {
  //   await configureMaximumMarketCollateral({
  //     marketId: require('../../deployments/extras.json').synth_usdc_market_id,
  //     symbol: 'fUSDC',
  //     targetAmount: String(1_000_000_000_000),
  //   });
  //   await setSpotWrapper({
  //     marketId: require('../../deployments/extras.json').synth_usdc_market_id,
  //     symbol: 'fUSDC',
  //     targetAmount: String(1_000_000_000_000),
  //   });
  // });

  it('should wrap 5 fBTC', async () => {
    const balance = await wrapCollateral({
      wallet,
      symbol: 'sBTC',
      synthAddress: require('../../deployments/extras.json').synth_btc_token_address,
      synthMarketId: require('../../deployments/extras.json').synth_btc_market_id,
      amount: 5,
    });
    assert.equal(balance, 5);
  });

  it('should wrap 15 fETH', async () => {
    const balance = await wrapCollateral({
      wallet,
      symbol: 'sETH',
      synthAddress: require('../../deployments/extras.json').synth_eth_token_address,
      synthMarketId: require('../../deployments/extras.json').synth_eth_market_id,
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

  it('should atomic swap 5 sfETH to USDx to trade', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'USDx' }), 0);
    await spotSell({
      wallet,
      marketId: require('../../deployments/extras.json').synth_eth_market_id,
      synthAmount: 5,
      minUsdAmount: 1000, // 0% slippage
    });
    assert.ok(await getCollateralBalance({ address, symbol: 'USDx' }));
  });

  it('should approve snxUSD spending for PerpsMarketProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDx',
        spenderAddress: PerpsMarketProxy.address,
      }),
      false,
      'New wallet has not allowed PerpsMarketProxy snxUSD spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'USDx',
      spenderAddress: PerpsMarketProxy.address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDx',
        spenderAddress: PerpsMarketProxy.address,
      }),
      true
    );
  });

  it('should allow deposit of sfBTC, sfETH, and USDx to Perps', async () => {
    const extras = require('../../deployments/extras.json');
    assert.equal(await getPerpsCollateral({ accountId }), 0);
    assert.equal(await getPerpsCollateral({ marketId: extras.synth_eth_market_id, accountId }), 0);
    assert.equal(await getPerpsCollateral({ marketId: extras.synth_btc_market_id, accountId }), 0);

    await modifyPerpsCollateral({ wallet, accountId, marketId: 0, deltaAmount: 2_000 });
    await modifyPerpsCollateral({
      wallet,
      accountId,
      marketId: extras.synth_btc_market_id,
      deltaAmount: 10,
    });
    await modifyPerpsCollateral({
      wallet,
      accountId,
      marketId: extras.synth_eth_market_id,
      deltaAmount: 15,
    });

    assert.equal(await getPerpsCollateral({ accountId }), 2_000);
    assert.equal(await getPerpsCollateral({ accountId, marketId: extras.synth_btc_market_id }), 10);
    assert.equal(await getPerpsCollateral({ accountId, marketId: extras.synth_eth_market_id }), 15);
  });

  // it('should withdraw 1_000 snxUSD from Perps', async () => {
  //   assert.equal(await getPerpsCollateral({ accountId }), 1_000_000);
  //   await modifyPerpsCollateral({ wallet, accountId, deltaAmount: -1_000 });
  //   assert.equal(await getPerpsCollateral({ accountId }), 999_000);
  // });

  // it('should open a short 0.01 BTC position', async () => {
  //   const marketId = 200;
  //   const settlementStrategyId =
  //     require('../../deployments/extras.json').btc_pyth_settlement_strategy;

  //   // We must sync timestamp of the fork before making time-sensitive operations
  //   await syncTime();
  //   await wait(1000);

  //   const { commitmentTime } = await commitPerpsOrder({
  //     wallet,
  //     accountId,
  //     marketId,
  //     sizeDelta: -0.01,
  //     settlementStrategyId,
  //   });

  //   // Wait for commitment price/settlement delay
  //   await wait(2000);

  //   // Wait for pyth to update prices
  //   await wait(5000);

  //   await doStrictPriceUpdate({ wallet, marketId, settlementStrategyId, commitmentTime });
  //   await settlePerpsOrder({ wallet, accountId, marketId });
  //   const position = await getPerpsPosition({ accountId, marketId });
  //   assert.equal(position.positionSize, -0.01);
  // });

  // it('should close a short 0.01 BTC position', async () => {
  //   const marketId = 200;
  //   const settlementStrategyId =
  //     require('../../deployments/extras.json').btc_pyth_settlement_strategy;

  //   // We must sync timestamp of the fork before making time-sensitive operations
  //   await syncTime();
  //   await wait(1000);

  //   const { commitmentTime } = await commitPerpsOrder({
  //     wallet,
  //     accountId,
  //     marketId,
  //     sizeDelta: 0.01,
  //     settlementStrategyId,
  //   });

  //   // Wait for commitment price/settlement delay
  //   await wait(2000);

  //   // Wait for pyth to update prices
  //   await wait(5000);

  //   await doStrictPriceUpdate({ wallet, marketId, settlementStrategyId, commitmentTime });
  //   await settlePerpsOrder({ wallet, accountId, marketId });
  //   const position = await getPerpsPosition({ accountId, marketId });
  //   assert.equal(position.positionSize, 0);
  // });

  // it('should revert when trade > Max Market Size', async () => {
  //   const marketId = 200;
  //   const settlementStrategyId =
  //     require('../../deployments/extras.json').btc_pyth_settlement_strategy;
  //   const maxMarketSize = await PerpsMarketProxy.getMaxMarketSize(marketId);
  //   log({ marketId, maxMarketSize });
  //   try {
  //     await commitPerpsOrder({
  //       wallet,
  //       accountId,
  //       marketId,
  //       sizeDelta: parseFloat(ethers.utils.formatEther(maxMarketSize.mul(2))),
  //       settlementStrategyId,
  //     });
  //     throw Error('Commit should revert');
  //   } catch (error) {
  //     const errorData =
  //       error?.error?.error?.error?.data ||
  //       error?.error?.data?.data ||
  //       error?.error?.error?.data ||
  //       error?.error?.data;
  //     const parsedError = errorData ? PerpsMarketProxy.interface.parseError(errorData) : error;
  //     assert.equal(parsedError.name, 'MaxOpenInterestReached');
  //   }
  // });
});
