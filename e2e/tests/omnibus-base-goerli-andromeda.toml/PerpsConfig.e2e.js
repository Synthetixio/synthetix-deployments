const assert = require('assert');
const { ethers } = require('ethers');
const { wei } = require('@synthetixio/wei');

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');

const PerpsMarketProxyDeployment = require('../../deployments/PerpsMarketProxy.json');

describe('Perps Configuration Settings', function () {
  let wallet;
  let address;
  let provider;
  let accountId;
  let PerpsMarketProxy;

  before(() => {
    provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    wallet = ethers.Wallet.createRandom().connect(provider);
    address = wallet.address;

    PerpsMarketProxy = new ethers.Contract(
      PerpsMarketProxyDeployment.address,
      PerpsMarketProxyDeployment.abi,
      wallet
    );
  });

  it('should set ETH balance to 100', async () => {
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 100 });
    assert.equal(await getEthBalance({ address }), 100);
  });

  it('Creates a Perps account NFT', async () => {
    // Get account id
    const tx = await PerpsMarketProxy['createAccount()']();

    const receipt = await tx.wait();
    const events = receipt.events;
    const event = events.find((e) => e.event === 'AccountCreated');
    accountId = event.args.accountId;

    const permissions = await PerpsMarketProxy.getAccountPermissions(accountId);

    assert.ok(accountId);
    assert.equal(permissions.length, 0);
  });

  it('Check BTC Market exists', async () => {
    const markets = [...(await PerpsMarketProxy.getMarkets())].map((item) => item.toNumber());
    assert.ok(markets.includes(200));
  });

  it('Check Metadata is correct', async () => {
    const metadata = await PerpsMarketProxy.metadata(200);
    assert.equal(metadata.name, 'Bitcoin');
    assert.equal(metadata.symbol, 'BTC');
  });

  it('Check BTC Max Open Interest is correct', async () => {
    const maxOI = await PerpsMarketProxy.maxOpenInterest(200);
    assert.equal(wei(maxOI, 18, true).toNumber(), 30);
  });

  it('Check Perps Market Id is correct', async () => {
    const marketId = await PerpsMarketProxy.getMarketSummary(200);
    assert.equal(marketId.toNumber(), 200);
  });

  it('Check BTC Market Max Funding Velocity is correctly configured', async () => {});

  it('Check BTC Market Maker Fee is correctly configured', async () => {});

  it('Check BTC Market Taker Fee is correctly configured', async () => {});

  it('Check BTC Market Max Market Size is correctly configured', async () => {});

  it('Check BTC Market Initial Margin Ratio is correctly configured', async () => {});

  it('Check BTC Market Maintenance Margin Fraction is correctly configured', async () => {});

  it('Check BTC Liquidation Reward Ratio is correctly configured', async () => {});

  it('Check BTC Max Liquidation Limit Accumulation Multiplier is correctly configured', async () => {});

  it('Check BTC Market Max Seconds In Liquidation Window correctly configured', async () => {});

  it('Check BTC Market Minimum Position Margin correctly configured', async () => {});

  it('Check BTC Market Locked OI Ratio is correctly configured', async () => {});
});
