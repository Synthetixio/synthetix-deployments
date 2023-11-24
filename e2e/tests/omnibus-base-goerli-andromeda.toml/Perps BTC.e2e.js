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

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

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

  it('Check BTC Market exists', async () => {
    const markets = [...(await PerpsMarketProxy.getMarkets())].map((item) => item.toNumber());
    log({ markets });
    assert.ok(markets.includes(200));
  });

  it('Check Metadata is', async () => {
    const metadata = await PerpsMarketProxy.metadata(200);
    log({ metadata });
    assert.equal(metadata.name, 'Bitcoin');
    assert.equal(metadata.symbol, 'BTC');
  });

  it('Check BTC Max Open Interest is', async () => {
    const maxOpenInterest = parseFloat(
      ethers.utils.formatEther(await PerpsMarketProxy.maxOpenInterest(200))
    );
    log({ maxOpenInterest });
    assert.equal(maxOpenInterest, 30);
  });

  it('Can request a perps market summary', async () => {
    await fulfillOracleQuery({ wallet, isTestnet: true, symbol: 'BTC' });
    const data = await PerpsMarketProxy.getMarketSummary(200);
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
    assert.ok(marketSummary.size > 0);
  });

  //  it('Check BTC Market Max Funding Velocity is configured', async () => {});
  //
  //  it('Check BTC Market Maker Fee is configured', async () => {});
  //
  //  it('Check BTC Market Taker Fee is configured', async () => {});
  //
  //  it('Check BTC Market Max Market Size is configured', async () => {});
  //
  //  it('Check BTC Market Initial Margin Ratio is configured', async () => {});
  //
  //  it('Check BTC Market Maintenance Margin Fraction is configured', async () => {});
  //
  //  it('Check BTC Liquidation Reward Ratio is configured', async () => {});
  //
  //  it('Check BTC Max Liquidation Limit Accumulation Multiplier is configured', async () => {});
  //
  //  it('Check BTC Market Max Seconds In Liquidation Window configured', async () => {});
  //
  //  it('Check BTC Market Minimum Position Margin configured', async () => {});
  //
  //  it('Check BTC Market Locked OI Ratio is configured', async () => {});
});
