const assert = require('assert');
const { ethers } = require('ethers');
const { getPerpsSettlementStrategy } = require('../../tasks/getPerpsSettlementStrategy');
const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { doPriceUpdate } = require('../../tasks/doPriceUpdate');
const { syncTime } = require('../../tasks/syncTime');

require('../../inspect');

const extras = require('../../deployments/extras.json');
const PerpsMarketProxyDeployment = require('../../deployments/PerpsMarketProxy.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const marketId = 100;

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);

  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
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
    assert.equal(
      await getEthBalance({ address: wallet.address }),
      0,
      'New wallet has 0 ETH balance'
    );
    await setEthBalance({ address: wallet.address, balance: 100 });
    assert.equal(await getEthBalance({ address: wallet.address }), 100);
  });

  it('should have market deployed', async () => {
    const markets = await PerpsMarketProxy.getMarkets();
    log({ markets });
    const metadata = await Promise.all(
      markets.map((marketId) =>
        PerpsMarketProxy.metadata(marketId).then(({ name, symbol }) => ({
          marketId: marketId.toNumber(),
          name,
          symbol,
        }))
      )
    );
    log({ metadata });
    const market = metadata.find(({ symbol }) => symbol === 'ETH');
    log({ market });
    assert.equal(market.name, 'Ethereum');
    assert.equal(market.marketId, marketId);
  });

  it('should have max open interest 4.5 ETH', async () => {
    const maxOpenInterest = parseFloat(
      ethers.utils.formatEther(await PerpsMarketProxy.maxOpenInterest(marketId))
    );
    log({ maxOpenInterest });
    assert.equal(maxOpenInterest, 4.5);
  });

  it('should make a price update', async () => {
    // We must sync timestamp of the fork before making price updates
    await syncTime();

    // delegating collateral and views requiring price will fail if there's no price update within the last hour,
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

  it('should get market summary with ERC7412', async () => {
    const data = await PerpsMarketProxy.getMarketSummary(marketId);
    log({ data });
    const marketSummary = {
      skew: parseFloat(ethers.utils.formatEther(data.skew)),
      size: parseFloat(ethers.utils.formatEther(data.size)),
      maxOpenInterest: parseFloat(ethers.utils.formatEther(data.maxOpenInterest)),
      currentFundingRate: parseFloat(ethers.utils.formatEther(data.currentFundingRate)),
      currentFundingVelocity: parseFloat(ethers.utils.formatEther(data.currentFundingVelocity)),
      indexPrice: parseFloat(ethers.utils.formatEther(data.indexPrice)),
    };

    log({ marketSummary });
    assert.ok(marketSummary.indexPrice);
  });

  it('should have Funding Parameters set', async () => {
    const { skewScale, maxFundingVelocity } = await PerpsMarketProxy.getFundingParameters(marketId);

    log({ skewScale, maxFundingVelocity });
    assert.equal(Number(ethers.utils.formatEther(skewScale)), 1_000_000, 'skewScale');
    assert.equal(Number(ethers.utils.formatEther(maxFundingVelocity)), 9, 'maxFundingVelocity');
  });

  it('should have 4.5 ETH Max Market Size', async () => {
    const maxSize = await PerpsMarketProxy.getMaxMarketSize(marketId);

    assert.equal(ethers.utils.formatEther(maxSize), 4.5);
  });

  it('should have 0.0002 Maker fee, 0.0005 Taker fee', async () => {
    const { makerFee, takerFee } = await PerpsMarketProxy.getOrderFees(marketId);

    assert.equal(Number(ethers.utils.formatEther(makerFee)), 0.0002);
    assert.equal(Number(ethers.utils.formatEther(takerFee)), 0.0005);
  });

  it('should have Liquidation Parameters set', async () => {
    const params = await PerpsMarketProxy.getLiquidationParameters(marketId);
    log({ liquidationParameters: params });

    assert.equal(
      Number(ethers.utils.formatEther(params.initialMarginRatioD18)),
      8.92,
      'initialMarginRatioD18'
    );
    assert.equal(
      Number(ethers.utils.formatEther(params.minimumInitialMarginRatioD18)),
      0.02,
      'minimumInitialMarginRatioD18'
    );
    assert.equal(
      Number(ethers.utils.formatEther(params.maintenanceMarginScalarD18)),
      0.28,
      'maintenanceMarginScalarD18'
    );
    assert.equal(
      Number(ethers.utils.formatEther(params.flagRewardRatioD18)),
      0.0003,
      'flagRewardRatioD18'
    );
    assert.equal(
      Number(ethers.utils.formatEther(params.minimumPositionMargin)),
      50,
      'minimumPositionMargin'
    );
  });

  it('should have Max Liquidation parameters set', async () => {
    const params = await PerpsMarketProxy.getMaxLiquidationParameters(marketId);
    log({ liquidationParameters: params });

    assert.equal(
      Number(ethers.utils.formatEther(params.maxLiquidationLimitAccumulationMultiplier)),
      1.5,
      'maxLiquidationLimitAccumulationMultiplier'
    );
    assert.equal(
      params.maxSecondsInLiquidationWindow.toNumber(),
      30,
      'maxSecondsInLiquidationWindow'
    );
    assert.equal(
      Number(ethers.utils.formatEther(params.maxLiquidationPd)),
      0.0005,
      'maxLiquidationPd'
    );
    assert.equal(
      params.endorsedLiquidator,
      '0x11233749514Ab8d00C0A5873DF7428b3db70030f',
      'endorsedLiquidator'
    );
  });

  it('should have Max Locked OI ratio set to 0.5', async () => {
    const maxLockedRatio = await PerpsMarketProxy.getLockedOiRatio(marketId);

    assert.equal(Number(ethers.utils.formatEther(maxLockedRatio)), 0.5);
  });

  it('should have settlement strategy 0 delay set to 2s', async () => {
    const strategy = await getPerpsSettlementStrategy({ marketId, settlementStrategyId: 0 });
    log({ strategy });
    assert.equal(strategy.settlementDelay.toNumber(), 2);
  });
});
