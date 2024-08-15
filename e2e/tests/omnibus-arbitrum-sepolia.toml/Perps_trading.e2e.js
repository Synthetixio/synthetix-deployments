const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
const { wait } = require('../../wait');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { approveCollateral } = require('../../tasks/approveCollateral');
const { createPerpsAccount } = require('../../tasks/createPerpsAccount');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getEthBalance } = require('../../tasks/getEthBalance');
const { getPerpsAccountOwner } = require('../../tasks/getPerpsAccountOwner');
const { getPerpsAccountPermissions } = require('../../tasks/getPerpsAccountPermissions');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { getCollateralConfig } = require('../../tasks/getCollateralConfig');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { spotSell } = require('../../tasks/spotSell');
const { wrapCollateral } = require('../../tasks/wrapCollateral');
const { getPerpsCollateral } = require('../../tasks/getPerpsCollateral');
const { getDebt } = require('../../tasks/getDebt');
const { getCanLiquidate } = require('../../tasks/getCanLiquidate');
const { getAvailableMargin } = require('../../tasks/getAvailableMargin');
const { liquidate } = require('../../tasks/liquidate');
const { setLiquidationParameters } = require('../../tasks/setLiquidationParameters');
const { modifyPerpsCollateral } = require('../../tasks/modifyPerpsCollateral');
const { commitPerpsOrder } = require('../../tasks/commitPerpsOrder');
const { settlePerpsOrder } = require('../../tasks/settlePerpsOrder');
const { getPerpsPosition } = require('../../tasks/getPerpsPosition');
const { setWETHTokenBalance } = require('../../tasks/setWETHTokenBalance');
const { doPriceUpdate } = require('../../tasks/doPriceUpdate');
const { doStrictPriceUpdate } = require('../../tasks/doStrictPriceUpdate');
const { syncTime } = require('../../tasks/syncTime');

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const extras = require('../../deployments/extras.json');
  const accountId = parseInt(`420${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

  const PerpsMarketProxy = new ethers.Contract(
    require('../../deployments/PerpsMarketProxy.json').address,
    require('../../deployments/PerpsMarketProxy.json').abi,
    wallet
  );

  let snapshot;

  before('Create snapshot', async () => {
    snapshot = await provider.send('evm_snapshot', []);
    log('Create snapshot', { snapshot });
  });

  before('Set Arb Gas Price Precompile (0xfe anvil issue)', async () => {
    await provider.send('anvil_setCode', [
      '0x000000000000000000000000000000000000006C',
      '0x608060405234801561001057600080fd5b506004361061014d5760003560e01c80636ecca45a116100c3578063ad26ce901161007c578063ad26ce90146102a8578063ba9c916e146102b1578063c6f7de0e146102a8578063eff01306146102df578063f5d6ded7146102e7578063f918379a146102f257600080fd5b80636ecca45a1461023a5780637a1ea7321461024b5780637a7d6beb146102685780638a5b1d2814610270578063963d6002146102785780639e6d7e311461028657600080fd5b806329eb31ee1161011557806329eb31ee146101c35780633dfb45b9146101ae57806341b247a8146101cc578063520acdd7146102125780635b39d23c14610220578063612af1781461022e57600080fd5b806302199f3414610152578063055f362f1461017c5780631d5b5c201461019157806325754f91146101ae5780632987d027146101b6575b600080fd5b6103e86107d0610bb85b604080519384526020840192909252908201526060015b60405180910390f35b6406fc23ac005b604051908152602001610173565b6113885b60405167ffffffffffffffff9091168152602001610173565b612710610195565b66b1a2bc2ec50000610183565b620f4240610195565b640e44118940631a161170642e90edd000629896806000815b604080519687526020870195909552938501929092526060840152608083015260a082015260c001610173565b67016345785d8a0000610183565b670de0b6b3a7640000610183565b606460c861012c61015c565b604051620186a08152602001610173565b61015c6102593660046102fc565b506105dc906109c490610dac90565b6103e8610195565b6101f4610195565b6706f05b59d3b20000610183565b6040517312345678901234567890123456789012345678908152602001610173565b620f4240610183565b6101e56102bf3660046102fc565b640e44118940631a161170642e90edd00062989680600081939550919395565b61c350610195565b6404a817c800610183565b633b9aca00610183565b60006020828403121561030e57600080fd5b81356001600160a01b038116811461032557600080fd5b939250505056fea26469706673582212202ffbee6debcc76fbb9ef82a3695a5374fc86e86588546876e23b0e3f74625e7864736f6c63430008130033',
    ]);
    log('Precompiled Arbitrum Gas oracle set');
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
    const address = wallet.address;
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 100 });
    assert.equal(await getEthBalance({ address }), 100);
  });

  it('should attempt to update the ETH and BTC prices', async () => {
    try {
      await doPriceUpdate({
        wallet,
        marketId: extras.btc_perps_market_id,
        settlementStrategyId: extras.btc_pyth_settlement_strategy,
      });
      await doPriceUpdate({
        wallet,
        marketId: extras.eth_perps_market_id,
        settlementStrategyId: extras.eth_pyth_settlement_strategy,
      });
    } catch (e) {
      console.log('a failed price update may mean the prices are already up to date', e);
    }
  });

  it('should set fBTC balance to 25', async () => {
    const { tokenAddress } = await getCollateralConfig('fBTC');
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fBTC' }),
      0,
      'New wallet has 0 fBTC balance'
    );
    await setMintableTokenBalance({ privateKey, tokenAddress, balance: 25 });
    assert.equal(await getCollateralBalance({ address, symbol: 'fBTC' }), 25);
  });

  it('should set WETH balance to 50', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'WETH' }),
      0,
      'New wallet has 0 WETH balance'
    );
    await setWETHTokenBalance({ wallet, balance: 50 });
    assert.equal(await getCollateralBalance({ address, symbol: 'WETH' }), 50);
  });

  it('should approve fBTC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fBTC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket fBTC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'fBTC',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fBTC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  it('should approve WETH spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'WETH',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket WETH spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'WETH',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'WETH',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  it('should wrap 5 fBTC', async () => {
    const balance = await wrapCollateral({
      wallet,
      symbol: 'sBTC',
      synthAddress: require('../../deployments/extras.json').synth_btc_token_address,
      synthMarketId: require('../../deployments/extras.json').synth_btc_market_id,
      amount: 5,
    });
    assert.equal(balance, 5);
  });

  it('should wrap 15 fETH', async () => {
    const balance = await wrapCollateral({
      wallet,
      symbol: 'sETH',
      synthAddress: require('../../deployments/extras.json').synth_eth_token_address,
      synthMarketId: require('../../deployments/extras.json').synth_eth_market_id,
      amount: 15,
    });
    assert.equal(balance, 15);
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

  it('should atomic swap 5 sfETH to USDx to trade', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'USDx' }), 0);
    await spotSell({
      wallet,
      marketId: require('../../deployments/extras.json').synth_eth_market_id,
      synthAmount: 5,
      minUsdAmount: 1000, // 0% slippage
    });
    assert.ok(await getCollateralBalance({ address, symbol: 'USDx' }));
  });

  it('should approve USDx, sfBTC, sfETH spending for PerpsMarketProxy', async () => {
    await approveCollateral({
      privateKey,
      symbol: 'USDx',
      spenderAddress: PerpsMarketProxy.address,
    });
    await approveCollateral({
      privateKey,
      symbol: 'sBTC',
      spenderAddress: PerpsMarketProxy.address,
    });
    await approveCollateral({
      privateKey,
      symbol: 'sETH',
      spenderAddress: PerpsMarketProxy.address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDx',
        spenderAddress: PerpsMarketProxy.address,
      }),
      true
    );
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sBTC',
        spenderAddress: PerpsMarketProxy.address,
      }),
      true
    );
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sETH',
        spenderAddress: PerpsMarketProxy.address,
      }),
      true
    );
  });

  it('should allow deposit of sfBTC, sfETH, and USDx to Perps', async () => {
    assert.equal(await getPerpsCollateral({ accountId }), 0);
    assert.equal(await getPerpsCollateral({ marketId: extras.synth_eth_market_id, accountId }), 0);
    assert.equal(await getPerpsCollateral({ marketId: extras.synth_btc_market_id, accountId }), 0);

    await modifyPerpsCollateral({ wallet, accountId, marketId: 0, deltaAmount: 2_000 });
    await modifyPerpsCollateral({
      wallet,
      accountId,
      marketId: extras.synth_btc_market_id,
      deltaAmount: 5,
    });
    await modifyPerpsCollateral({
      wallet,
      accountId,
      marketId: extras.synth_eth_market_id,
      deltaAmount: 10,
    });

    assert.equal(await getPerpsCollateral({ accountId }), 2_000);
    assert.equal(await getPerpsCollateral({ accountId, marketId: extras.synth_btc_market_id }), 5);
    assert.equal(await getPerpsCollateral({ accountId, marketId: extras.synth_eth_market_id }), 10);
  });

  it('should open a 1 BTC long position', async () => {
    const marketId = extras.btc_perps_market_id;
    const settlementStrategyId = extras.btc_pyth_settlement_strategy;

    // We must sync timestamp of the fork before making time-sensitive operations
    await syncTime();
    await wait(1000);

    const { commitmentTime } = await commitPerpsOrder({
      wallet,
      accountId,
      marketId,
      sizeDelta: 1,
      settlementStrategyId,
    });

    // Wait for commitment price/settlement delay
    await wait(2000);

    // Wait for pyth to update prices
    await wait(5000);

    await doStrictPriceUpdate({ wallet, marketId, settlementStrategyId, commitmentTime });
    await settlePerpsOrder({ wallet, accountId, marketId });
    const position = await getPerpsPosition({ accountId, marketId });
    assert.equal(position.positionSize, 1);
    const debt = await getDebt({ accountId });
    assert.equal(debt, 0);
  });

  it('should liquidate the account when the margin requirements increase past the account margin', async () => {
    const newInitialMarginFraction = ethers.BigNumber.from(10).pow(18);
    const newMinimumPositionMargin = ethers.BigNumber.from(10).pow(26);
    const newMaintenanceMarginScalar = ethers.BigNumber.from(10).pow(18);
    const newMinimumInitialMarginRatio = ethers.BigNumber.from(10).pow(18);
    const newLiquidationRewardRatio = ethers.BigNumber.from(10).pow(18);
    const initialCanLiquidate = await getCanLiquidate({ accountId });
    const initialAvailableMargin = await getAvailableMargin({ accountId });
    assert.ok(initialAvailableMargin > 0);
    assert.ok(!initialCanLiquidate);
    await setLiquidationParameters({
      marketId: extras.btc_perps_market_id,
      newInitialMarginFraction,
      newMaintenanceMarginScalar,
      newMinimumInitialMarginRatio,
      newLiquidationRewardRatio,
      newMinimumPositionMargin,
    });
    const postParameterUpdateCanLiquidate = await getCanLiquidate({ accountId });
    assert.ok(postParameterUpdateCanLiquidate);
    await liquidate({ accountId });
    const postLiquidateCanLiquidate = await getCanLiquidate({ accountId });
    assert.ok(!postLiquidateCanLiquidate);
    const postAvailableMargin = await getAvailableMargin({ accountId });
    assert.equal(postAvailableMargin, 0);
  });
});
