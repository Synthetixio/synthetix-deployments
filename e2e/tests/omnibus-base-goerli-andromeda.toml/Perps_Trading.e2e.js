const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
require('../../inspect');

const { approveCollateral } = require('../../tasks/approveCollateral');
const { createAccount } = require('../../tasks/createAccount');
const { createPerpsAccount } = require('../../tasks/createPerpsAccount');
const { delegateCollateral } = require('../../tasks/delegateCollateral');
const { depositCollateral } = require('../../tasks/depositCollateral');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { getAccountOwner } = require('../../tasks/getAccountOwner');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getEthBalance } = require('../../tasks/getEthBalance');
const { getPerpsAccountOwner } = require('../../tasks/getPerpsAccountOwner');
const { getPerpsAccountPermissions } = require('../../tasks/getPerpsAccountPermissions');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { parseError } = require('../../parseError');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { swapToSusd } = require('../../tasks/swapToSusd');
const { wrapUsdc } = require('../../tasks/wrapUsdc');

const USDCDeployment = require('../../deployments/FakeCollateralfUSDC.json');
const SpotMarketProxyDeployment = require('../../deployments/SpotMarketProxy.json');
const PerpsMarketProxyDeployment = require('../../deployments/PerpsMarketProxy.json');
const extras = require('../../deployments/extras.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const sUSDMarketId = 0;
describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`420${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

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

  it('should set USDC balance to 10_000_000', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fUSDC' }),
      0,
      'New wallet has 0 USDC balance'
    );
    await setMintableTokenBalance({
      privateKey,
      tokenAddress: USDCDeployment.address,
      balance: 10_000_000,
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'fUSDC' }), 10_000_000);
  });

  it('should approve USDC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fUSDC',
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      false,
      'New wallet has not allowed SpotMarket USDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'fUSDC',
      spenderAddress: SpotMarketProxyDeployment.address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fUSDC',
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      true
    );
  });

  it('should wrap 10_000 USDC', async () => {
    const balance = await wrapUsdc({ wallet, amount: 10_000 });
    assert.equal(balance, 10_000);
  });

  // TODO: uncomment if we need to top up LP
  //
  //  it('should create core account', async () => {
  //    assert.equal(
  //      await getAccountOwner({ accountId }),
  //      ethers.constants.AddressZero,
  //      'New wallet should not have an account yet'
  //    );
  //    await createAccount({ wallet, accountId });
  //    assert.equal(await getAccountOwner({ accountId }), address);
  //  });
  //
  //  it('should approve sUSDC spending for CoreProxy', async () => {
  //    assert.equal(
  //      await isCollateralApproved({ address, symbol: 'sUSDC' }),
  //      false,
  //      'New wallet has not allowed CoreProxy sUSDC spending'
  //    );
  //    await approveCollateral({ privateKey, symbol: 'sUSDC' });
  //    assert.equal(await isCollateralApproved({ address, symbol: 'sUSDC' }), true);
  //  });
  //
  //  it('should deposit 5_000 sUSDC into the system', async () => {
  //    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 10_000);
  //    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
  //      totalDeposited: 0,
  //      totalAssigned: 0,
  //      totalLocked: 0,
  //    });
  //
  //    await depositCollateral({ privateKey, symbol: 'sUSDC', accountId, amount: 5_000 });
  //
  //    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 5_000);
  //    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
  //      totalDeposited: 5_000,
  //      totalAssigned: 0,
  //      totalLocked: 0,
  //    });
  //  });
  //
  //  it('should delegate 300 sUSDC into the Spartan Council pool', async () => {
  //    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
  //      totalDeposited: 5_000,
  //      totalAssigned: 0,
  //      totalLocked: 0,
  //    });
  //    await delegateCollateral({
  //      privateKey,
  //      symbol: 'sUSDC',
  //      accountId,
  //      amount: 5_000,
  //      poolId: 1,
  //    });
  //    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
  //      totalDeposited: 5_000,
  //      totalAssigned: 5_000,
  //      totalLocked: 0,
  //    });
  //  });

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

  it('should atomic swap 5_000 sUSDC to snxUSD to trade', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 0);
    await swapToSusd({ wallet, marketId: extras.synth_usdc_market_id, amount: 5_000 });
    assert.equal(await getCollateralBalance({ address, symbol: 'snxUSD' }), 5_000);
  });

  it('should approve snxUSD spending for PerpsMarketProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'snxUSD',
        spenderAddress: PerpsMarketProxy.address,
      }),
      false,
      'New wallet has not allowed PerpsMarketProxy snxUSD spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'snxUSD',
      spenderAddress: PerpsMarketProxy.address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'snxUSD',
        spenderAddress: PerpsMarketProxy.address,
      }),
      true
    );
  });

  it('should deposit 5_000 snxUSD to Perps', async () => {
    assert.equal(
      parseFloat(
        ethers.utils.formatUnits(
          await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId)
        )
      ),
      0
    );
    try {
      await PerpsMarketProxy.connect(wallet).modifyCollateral(
        accountId,
        sUSDMarketId,
        ethers.utils.parseEther(String(5_000)),
        {
          gasLimit: 10_000_000,
        }
      );
    } catch (error) {
      log({ error: parseError(error) });
    }
    assert.equal(
      parseFloat(
        ethers.utils.formatUnits(
          await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId)
        )
      ),
      5_000
    );
  });

  it('should withdraw 100 snxUSD from Perps', async () => {
    assert.equal(
      parseFloat(
        ethers.utils.formatUnits(
          await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId)
        )
      ),
      5_000
    );

    try {
      await PerpsMarketProxy.connect(wallet).modifyCollateral(
        accountId,
        sUSDMarketId,
        ethers.utils.parseEther(String(-100)),
        {
          gasLimit: 10_000_000,
        }
      );
    } catch (error) {
      console.log(parseError(error));
    }
    assert.equal(
      parseFloat(
        ethers.utils.formatUnits(
          await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId)
        )
      ),
      4_900
    );
  });

  it.skip('trade', async () => {
    const settlementStrategyId = extras.btc_pyth_settlement_strategy;
    const strategy = await PerpsMarketProxy.getSettlementStrategy(marketId, settlementStrategyId);
    const { settlementDelay, feedId: priceFeedId } = strategy;
    const delay = settlementDelay.toNumber();
    const x = await getPrice(priceFeedId);
    const pythPrice = x.getPriceAsNumberUnchecked();
    const sizeDelta = ethers.utils.parseEther('0.1');
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
        acceptablePrice: ethers.utils.parseEther(Math.floor(pythPrice * 2).toString()),
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
