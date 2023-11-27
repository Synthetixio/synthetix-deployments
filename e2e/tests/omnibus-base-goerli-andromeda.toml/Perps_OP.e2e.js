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

  it('should have ETH market deployed among others', async () => {
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

  it('should have max open interest 30 ETH', async () => {
    const maxOpenInterest = parseFloat(
      ethers.utils.formatEther(await PerpsMarketProxy.maxOpenInterest(100))
    );
    log({ maxOpenInterest });
    assert.equal(maxOpenInterest, 30);
  });

  it('should get BTC market summary with ERC7412', async () => {
    await fulfillOracleQuery({ wallet, isTestnet: true, symbol: 'ETH' });
    const data = await PerpsMarketProxy.getMarketSummary(100);
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

  it('should have X Max Funding Velocity', async () => {
    await fulfillOracleQuery({ wallet, isTestnet: true, symbol: 'ETH' });
    const data = await PerpsMarketProxy.getMarketSummary(100);
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

  //  it('should have X Market Maker Fee', async () => {});
  //  it('should have X Market Taker Fee', async () => {});
  //  it('should have X Max Market Size', async () => {});
  //  it('should have X Initial Margin Ratio', async () => {});
  //  it('should have X Maintenance Margin Fraction', async () => {});
  //  it('should have X Liquidation Reward Ratio', async () => {});
  //  it('should have X Max Liquidation Limit Accumulation Multiplier', async () => {});
  //  it('should have X Max Seconds In Liquidation Window', async () => {});
  //  it('should have X Minimum Position Margin', async () => {});
  //  it('should have X Locked OI Ratio', async () => {});
});
