const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getTokenBalance } = require('../../tasks/getTokenBalance');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { approveCollateral } = require('../../tasks/approveCollateral');
const { setTokenBalance } = require('../../tasks/setTokenBalance');
const { syncTime } = require('../../tasks/syncTime');
const { setConfigUint } = require('../../tasks/setConfigUint');
const { getConfigUint } = require('../../tasks/getConfigUint');
const { wrapCollateral } = require('../../tasks/wrapCollateral');
const { unwrapCollateral } = require('../../tasks/unwrapCollateral');
const { spotSell } = require('../../tasks/spotSell');
const { spotBuy } = require('../../tasks/spotBuy');
const { getCollateralConfig } = require('../../tasks/getCollateralConfig');
const { doPriceUpdateForPyth } = require('../../tasks/doPriceUpdateForPyth');

describe(require('path').basename(__filename, '.e2e.js'), function () {
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

  it('should set tBTC balance to 0.1', async () => {
    const { tokenAddress } = await getCollateralConfig('tBTC');
    assert.equal(
      await getCollateralBalance({ address, symbol: 'tBTC' }),
      0,
      'New wallet has 0 tBTC balance'
    );
    await setTokenBalance({
      wallet,
      balance: 0.1,
      tokenAddress,
      friendlyWhale: '0x186cF879186986A20aADFb7eAD50e3C20cb26CeC',
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'tBTC' }), 0.1);
  });

  it('should approve tBTC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'tBTC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket tBTC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'tBTC',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'tBTC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  it(`should do strict price update`, async () => {
    await doPriceUpdateForPyth({
      wallet,
      feedId: require('../../deployments/extras.json').pyth_feed_id_tbtc,
      priceVerificationContract: require('../../deployments/extras.json')
        .pyth_price_verification_address,
    });
  });

  it(`should wrap 0.1 tBTC -> sBTC`, async () => {
    const synthBalance = await wrapCollateral({
      wallet,
      symbol: 'tBTC',
      synthAddress: require('../../deployments/extras.json').synth_btc_token_address,
      synthMarketId: require('../../deployments/extras.json').synth_btc_market_id,
      amount: 0.1,
    });
    assert.equal(synthBalance, 0.1);
    assert.equal(
      await getTokenBalance({
        walletAddress: address,
        tokenAddress: require('../../deployments/extras.json').synth_btc_token_address,
      }),
      0.1
    );
  });

  it(`should unwrap 0.05 sBTC -> tBTC`, async () => {
    const synthBalance = await unwrapCollateral({
      wallet,
      symbol: 'tBTC',
      synthAddress: require('../../deployments/extras.json').synth_btc_token_address,
      synthMarketId: require('../../deployments/extras.json').synth_btc_market_id,
      amount: 0.05,
    });
    assert.equal(synthBalance, 0.05);
    assert.equal(await getCollateralBalance({ address, symbol: 'tBTC' }), 0.05);
  });

  it('should swap 0.01 sBTC -> USDx', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'USDx' }), 0);
    await spotSell({
      wallet,
      marketId: require('../../deployments/extras.json').synth_btc_market_id,
      synthAmount: 0.01,
      minUsdAmount: 200,
    });
    assert.ok(
      (await getCollateralBalance({ address, symbol: 'USDx' })) >= 200,
      'USDx balance >= 200'
    );
  });

  it('should approve USDx spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDx',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket USDx spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'USDx',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDx',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  it('should swap 200 USDx -> sBTC', async () => {
    await spotBuy({
      wallet,
      marketId: require('../../deployments/extras.json').synth_btc_market_id,
      usdAmount: 200,
      minAmountReceived: 0.001,
    });
    assert.ok(
      (await getTokenBalance({
        walletAddress: address,
        tokenAddress: require('../../deployments/extras.json').synth_btc_token_address,
      })) >=
        0.04 + 0.001,
      `sBTC balance >= ${0.04 + 0.001}`
    );
  });
});
