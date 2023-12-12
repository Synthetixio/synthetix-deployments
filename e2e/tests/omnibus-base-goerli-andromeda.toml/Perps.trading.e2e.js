const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
require('../../inspect');

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { getPerpsAccountOwner } = require('../../tasks/getPerpsAccountOwner');
const { getPerpsAccountPermissions } = require('../../tasks/getPerpsAccountPermissions');
const { createPerpsAccount } = require('../../tasks/createPerpsAccount');
const USDCDeployment = require('../../deployments/FakeCollateralfUSDC.json');
const SpotMarketProxyDeployment = require('../../deployments/SpotMarketProxy.json');
const PerpsMarketProxyDeployment = require('../../deployments/PerpsMarketProxy.json');
const { approveToken } = require('../../tasks/approveToken');
const { wrapUsdc } = require('../../tasks/wrapUsdc');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { parseError } = require('../../parseError');
const extras = require('../../deployments/extras.json');
const { swapToSusd } = require('../../tasks/swapToSusd');
const meta = require('../../deployments/meta.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { USDProxy: sUSDAddress } = meta.contracts;
const sUSDMarketId = 0;
describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`420${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const marketId = 200;

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
    const createdAccountId = await createPerpsAccount({ wallet, accountId });
    assert.equal(createdAccountId, accountId, 'Account ID');
    assert.equal(await getPerpsAccountOwner({ accountId }), wallet.address);
    const permissions = await getPerpsAccountPermissions({ accountId });
    assert.equal(permissions.length, 0);
  });

  it('should deposit $1000 sUSD as perps margin', async () => {
    // Get some USDC
    await setMintableTokenBalance({
      privateKey: wallet.privateKey,
      tokenAddress: USDCDeployment.address,
      balance: 10_000_000,
    });
    // Approve USDC to spot market, so we can wrap it
    await approveToken({
      privateKey: wallet.privateKey,
      tokenAddress: USDCDeployment.address,
      spenderAddress: SpotMarketProxyDeployment.address,
    });

    const amount = 1000;
    await wrapUsdc({ wallet, amount });
    await swapToSusd({ wallet, marketId: extras.synth_usdc_market_id, amount });
    await approveToken({
      privateKey: wallet.privateKey,
      tokenAddress: sUSDAddress,
      spenderAddress: PerpsMarketProxyDeployment.address,
    });

    assert.equal(
      (await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId)).toString(),
      0
    );

    try {
      await PerpsMarketProxy.connect(wallet).modifyCollateral(accountId, sUSDMarketId, amount, {
        gasLimit: 10_000_000,
      });
    } catch (error) {
      console.log(parseError(error));
    }

    assert.equal(
      (await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId)).toString(),
      amount
    );
  });
  it('should withdraw $100 sUSD as perps margin', async () => {
    const amount = -100;
    assert.equal(
      (await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId)).toString(),
      1000
    );

    try {
      await PerpsMarketProxy.connect(wallet).modifyCollateral(accountId, sUSDMarketId, amount, {
        gasLimit: 10_000_000,
      });
    } catch (error) {
      console.log(parseError(error));
    }
    assert.equal(
      (await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId)).toString(),
      1000 - 100
    );
  });

  it('trade', async () => {
    const settlementStrategyId = extras.btc_pyth_settlement_strategy;
    const strategy = await PerpsMarketProxy.getSettlementStrategy(marketId, settlementStrategyId);
    const { settlementDelay, feedId: priceFeedId } = strategy;
    const delay = settlementDelay.toNumber();
    const x = await getPrice(priceFeedId);
    const pythPrice = x.getPriceAsNumberUnchecked();
    const sizeDelta = parseEther('0.1');
    const availMargin = await PerpsMarketProxy.getAvailableMargin(accountId);
    const indexPrice = await PerpsMarketProxy.indexPrice(marketId);
    const fillPrice = await PerpsMarketProxy.fillPrice(marketId, sizeDelta, indexPrice);
    console.log({ pythPrice, indexPrice, fillPrice, sizeDelta, availMargin });

    let commitReceipt;
    try {
      const tx = await PerpsMarketProxy.connect(wallet).commitOrder({
        marketId,
        accountId,
        sizeDelta,
        settlementStrategyId,
        acceptablePrice: parseEther(Math.floor(pythPrice * 2).toString()),
        referrer: ethers.constants.AddressZero,
        trackingCode: ethers.constants.HashZero,
      });
      console.log('commit sent');
      commitReceipt = await tx.wait();
    } catch (error) {
      console.log(parseError(error));
    }

    console.log('commit done');
    const block = await provider.getBlock(commitReceipt.blockNumber);

    const commitmentTime = block.timestamp;

    const settlementTime = commitmentTime + delay + 1;
    // Fast forward 1ms past settlement time
    await provider.send('evm_setNextBlockTimestamp', [settlementTime]);
    await provider.send('evm_mine', []);
    console.log('moved time forward to', settlementTime);

    const settleTx = await PerpsMarketProxy.connect(wallet).settleOrder(accountId);
    await settleTx.wait();
    console.log('settled');
  });
});
