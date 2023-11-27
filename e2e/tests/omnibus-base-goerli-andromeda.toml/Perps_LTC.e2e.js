const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
require('../../inspect');

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { getPerpsAccountOwner } = require('../../tasks/getPerpsAccountOwner');
const { getPerpsAccountPermissions } = require('../../tasks/getPerpsAccountPermissions');
const { createPerpsAccount } = require('../../tasks/createPerpsAccount');
const { fulfillOracleQuery } = require('../../tasks/fulfillOracleQuery');

const PerpsMarketProxyDeployment = require('../../deployments/PerpsMarketProxy.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`420${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const wallet = ethers.Wallet.createRandom().connect(provider);

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

  it('should create perps account', async () => {
    assert.equal(
      await getPerpsAccountOwner({ accountId }),
      ethers.constants.AddressZero,
      'New wallet should not have an account yet'
    );
    await createPerpsAccount({ wallet, accountId });
    assert.equal(await getPerpsAccountOwner({ accountId }), wallet.address);
    const permissions = await getPerpsAccountPermissions({ accountId });
    assert.equal(permissions.length, 0);
  });

  it('should have LTC market deployed among others', async () => {
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

    assert.deepEqual(metadata, [
      { marketId: 200, name: 'Bitcoin', symbol: 'BTC' },
      { marketId: 100, name: 'Ethereum', symbol: 'ETH' },
      { marketId: 300, name: 'Litecoin', symbol: 'LTC' },
      { marketId: 400, name: 'Ripple Token', symbol: 'XRP' },
    ]);
  });

  it('should have max open interest 13333 LTC', async () => {
    const maxOpenInterest = parseFloat(
      ethers.utils.formatEther(await PerpsMarketProxy.maxOpenInterest(300))
    );
    log({ maxOpenInterest });
    assert.equal(maxOpenInterest, 13333);
  });

  it('should get LTC market summary with ERC7412', async () => {
    await fulfillOracleQuery({ wallet, isTestnet: true, symbol: 'LTC' });
    const data = await PerpsMarketProxy.getMarketSummary(300);
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

  it('LTC Market Funding Parameters have been correctly set', async () => {
    const { skewScale, maxFundingVelocity } = await PerpsMarketProxy.getFundingParameters(300);

    log({ skewScale, maxFundingVelocity });
    assert.equal(Number(ethers.utils.formatEther(skewScale)), 1000000);
    assert.equal(Number(ethers.utils.formatEther(maxFundingVelocity)), 9);
  });

  it('should have 13333 LTC Max Market Size', async () => {
    const maxSize = await PerpsMarketProxy.getMaxMarketSize(300);

    assert.equal(ethers.utils.formatEther(maxSize), 13333);
  });

  it('LTC Market should have 0.0003 Maker fee, 0.0007 Taker fee', async () => {
    const { makerFee, takerFee } = await PerpsMarketProxy.getOrderFees(300);

    assert.equal(Number(ethers.utils.formatEther(makerFee)), 0.0003);
    assert.equal(Number(ethers.utils.formatEther(takerFee)), 0.0007);
  });

  it('LTC Market Liquidation Parameters are correctly set', async () => {
    const {
      initialMarginRatioD18,
      minimumInitialMarginRatioD18,
      maintenanceMarginScalarD18,
      liquidationRewardRatioD18,
      minimumPositionMargin,
    } = await PerpsMarketProxy.getLiquidationParameters(300);

    assert.equal(Number(ethers.utils.formatEther(initialMarginRatioD18)), 1);
    assert.equal(Number(ethers.utils.formatEther(minimumInitialMarginRatioD18)), 0.02);
    assert.equal(Number(ethers.utils.formatEther(maintenanceMarginScalarD18)), 0.5);
    assert.equal(Number(ethers.utils.formatEther(liquidationRewardRatioD18)), 0.01);
    assert.equal(Number(ethers.utils.formatEther(minimumPositionMargin)), 0);
  });

  it('LTC Market Max liquidation parameters are correctly set', async () => {
    const {
      maxLiquidationLimitAccumulationMultiplier,
      maxSecondsInLiquidationWindow,
      maxLiquidationPd,
      endorsedLiquidator,
    } = await PerpsMarketProxy.getMaxLiquidationParameters(300);

    assert.equal(Number(ethers.utils.formatEther(maxLiquidationLimitAccumulationMultiplier)), 0.5);
    assert.equal(Number(ethers.utils.formatEther(maxSecondsInLiquidationWindow)), 30 / 1e18);
    assert.equal(Number(ethers.utils.formatEther(maxLiquidationPd)), 0.0016);
    assert.equal(endorsedLiquidator, '0xae2Fc483527B8EF99EB5D9B44875F005ba1FaE13');
  });

  it('LTC Market Max locked OI ratio is correctly set', async () => {
    const maxLockedRatio = await PerpsMarketProxy.getLockedOiRatio(300);

    assert.equal(Number(ethers.utils.formatEther(maxLockedRatio)), 0.5);
  });
});
