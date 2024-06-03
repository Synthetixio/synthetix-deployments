const crypto = require('crypto');
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
const { doPriceUpdateForPyth } = require('../../tasks/doPriceUpdateForPyth');
const { setConfigUint } = require('../../tasks/setConfigUint');
const { getConfigUint } = require('../../tasks/getConfigUint');
const { wrapCollateral } = require('../../tasks/wrapCollateral');
const { unwrapCollateral } = require('../../tasks/unwrapCollateral');
const { spotSell } = require('../../tasks/spotSell');
const { spotBuy } = require('../../tasks/spotBuy');

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

  it('should make a price update', async () => {
    await doPriceUpdateForPyth({
      wallet,
      feedId: require('../../deployments/extras.json').pyth_feed_id_dai,
      priceVerificationContract: require('../../deployments/extras.json')
        .pyth_price_verification_address,
    });
  });

  it('should set DAI balance to 1000', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'DAI' }),
      0,
      'New wallet has 0 DAI balance'
    );
    await setTokenBalance({
      wallet,
      balance: 1000,
      tokenAddress: require('../../deployments/extras.json').dai_address,
      friendlyWhale: '0xd85e038593d7a098614721eae955ec2022b9b91b',
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'DAI' }), 1000);
  });

  it('should approve DAI spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'DAI',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket DAI spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'DAI',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'DAI',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  it(`should wrap 1000 DAI -> sDAI`, async () => {
    const synthBalance = await wrapCollateral({
      wallet,
      symbol: 'DAI',
      synthAddress: require('../../deployments/extras.json').synth_dai_token_address,
      synthMarketId: require('../../deployments/extras.json').synth_dai_market_id,
      amount: 1000,
    });
    assert.equal(synthBalance, 1000);
    assert.equal(
      await getTokenBalance({
        walletAddress: address,
        tokenAddress: require('../../deployments/extras.json').synth_dai_token_address,
      }),
      1000
    );
  });

  it('should swap 500 sDAI -> USDx', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'USDx' }), 0);
    await spotSell({
      wallet,
      marketId: require('../../deployments/extras.json').synth_dai_market_id,
      synthAmount: 500,
      minUsdAmount: 400,
    });
    assert.ok(
      (await getCollateralBalance({ address, symbol: 'USDx' })) >= 400,
      'USDx balance >= 400'
    );
  });

  it('should approve USDx spending for SpotProxy', async () => {
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

  it('should swap 400 USDx -> sDAI', async () => {
    await spotBuy({
      wallet,
      marketId: require('../../deployments/extras.json').synth_dai_market_id,
      usdAmount: 400,
      minAmountReceived: 300,
    });
    assert.ok(
      (await getTokenBalance({
        walletAddress: address,
        tokenAddress: require('../../deployments/extras.json').synth_dai_token_address,
      })) >=
        500 + 300,
      `sDAI balance >= ${500 + 300}`
    );
  });

  it(`should unwrap 500 sDAI -> DAI`, async () => {
    const synthBalance = await unwrapCollateral({
      wallet,
      symbol: 'DAI',
      synthAddress: require('../../deployments/extras.json').synth_dai_token_address,
      synthMarketId: require('../../deployments/extras.json').synth_dai_market_id,
      amount: 500,
    });
    assert.ok(synthBalance < 500);
    assert.equal(await getCollateralBalance({ address, symbol: 'DAI' }), 500);
  });
});
