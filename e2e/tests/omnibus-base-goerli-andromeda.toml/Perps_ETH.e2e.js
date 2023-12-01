const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
require('../../inspect');

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { getPerpsAccountOwner } = require('../../tasks/getPerpsAccountOwner');
const { getPerpsAccountPermissions } = require('../../tasks/getPerpsAccountPermissions');
const { createPerpsAccount } = require('../../tasks/createPerpsAccount');

const PerpsMarketProxyDeployment = require('../../deployments/PerpsMarketProxy.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`420${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const marketId = 100;

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

  it('should have max open interest 525 ETH', async () => {
    const maxOpenInterest = parseFloat(
      ethers.utils.formatEther(await PerpsMarketProxy.maxOpenInterest(marketId))
    );
    log({ maxOpenInterest });
    assert.equal(maxOpenInterest, 525);
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
    assert.equal(Number(ethers.utils.formatEther(skewScale)), 1000000);
    assert.equal(Number(ethers.utils.formatEther(maxFundingVelocity)), 9);
  });

  it('should have 525 ETH Max Market Size', async () => {
    const maxSize = await PerpsMarketProxy.getMaxMarketSize(marketId);

    assert.equal(ethers.utils.formatEther(maxSize), 525);
  });

  it('should have 0.0002 Maker fee, 0.0005 Taker fee', async () => {
    const { makerFee, takerFee } = await PerpsMarketProxy.getOrderFees(marketId);

    assert.equal(Number(ethers.utils.formatEther(makerFee)), 0.0002);
    assert.equal(Number(ethers.utils.formatEther(takerFee)), 0.0005);
  });

  it('should have Liquidation Parameters set', async () => {
    const params = await PerpsMarketProxy.getLiquidationParameters(marketId);
    log({ liquidationParameters: params });

    assert.equal(Number(ethers.utils.formatEther(params.initialMarginRatioD18)), 1);
    assert.equal(Number(ethers.utils.formatEther(params.minimumInitialMarginRatioD18)), 0.02);
    assert.equal(Number(ethers.utils.formatEther(params.maintenanceMarginScalarD18)), 0.5);
    assert.equal(Number(ethers.utils.formatEther(params.flagRewardRatioD18)), 0.01);
    assert.equal(Number(ethers.utils.formatEther(params.minimumPositionMargin)), 0);
  });

  it('should have Max Liquidation parameters set', async () => {
    const params = await PerpsMarketProxy.getMaxLiquidationParameters(marketId);
    log({ liquidationParameters: params });

    assert.equal(
      Number(ethers.utils.formatEther(params.maxLiquidationLimitAccumulationMultiplier)),
      0.5
    );
    assert.equal(params.maxSecondsInLiquidationWindow.toNumber(), 30);
    assert.equal(Number(ethers.utils.formatEther(params.maxLiquidationPd)), 0.0016);
    assert.equal(params.endorsedLiquidator, '0x11233749514Ab8d00C0A5873DF7428b3db70030f');
  });

  it('should have Max Locked OI ratio set to 0.5', async () => {
    const maxLockedRatio = await PerpsMarketProxy.getLockedOiRatio(marketId);

    assert.equal(Number(ethers.utils.formatEther(maxLockedRatio)), 0.5);
  });
});
