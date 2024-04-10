const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { wrapCollateral } = require('../../tasks/wrapCollateral');
const { getAccountOwner } = require('../../tasks/getAccountOwner');
const { createAccount } = require('../../tasks/createAccount');
const { getCollateralConfig } = require('../../tasks/getCollateralConfig');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { approveCollateral } = require('../../tasks/approveCollateral');
const { depositCollateral } = require('../../tasks/depositCollateral');
const { delegateCollateral } = require('../../tasks/delegateCollateral');
const { doPriceUpdate } = require('../../tasks/doPriceUpdate');
const { syncTime } = require('../../tasks/syncTime');
const { getTokenBalance } = require('../../tasks/getTokenBalance');
const { transferToken } = require('../../tasks/transferToken');
const { setPermissionlessTokenBalance } = require('../../tasks/setPermissionlessTokenBalance');
const { distributeRewards } = require('../../tasks/distributeRewards');
const { getPoolOwner } = require('../../tasks/getPoolOwner');
const { getTokenRewardsDistributorInfo } = require('../../tasks/getTokenRewardsDistributorInfo');
const {
  getTokenRewardsDistributorRewardsAmount,
} = require('../../tasks/getTokenRewardsDistributorRewardsAmount');
const { getAvailableRewards } = require('../../tasks/getAvailableRewards');
const { claimRewards } = require('../../tasks/claimRewards');

const {
  contracts: {
    RewardsDistributorForSpartanCouncilPoolSNX: distributorAddress,
    FakeCollateralfwSNX: payoutToken,
    CoreProxy: rewardManager,
    SynthUSDCToken: collateralType,
  },
} = require('../../deployments/meta.json');

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

  let snapshot;
  let initialBalance;
  let initialRewardsAmount;

  before('Create snapshot', async () => {
    snapshot = await provider.send('evm_snapshot', []);
    log('Create snapshot', { snapshot });

    initialBalance = await getTokenBalance({
      walletAddress: distributorAddress,
      tokenAddress: payoutToken,
    });
    log('Initial balance', { initialBalance });

    initialRewardsAmount = await getTokenRewardsDistributorRewardsAmount({ distributorAddress });
    log('Initial rewards amount', { initialRewardsAmount });
  });

  after('Restore snapshot', async () => {
    log('Restore snapshot', { snapshot });
    await provider.send('evm_revert', [snapshot]);
  });

  it('should sync time of the fork', async () => {
    await syncTime();
  });

  it('should validate Rewards Distributor info', async () => {
    const info = await getTokenRewardsDistributorInfo({ distributorAddress });
    assert.equal(info.name, 'Spartan Council Pool Rewards', 'name');
    assert.equal(info.poolId, 1, 'poolId');
    assert.equal(info.collateralType, collateralType, 'collateralType');
    assert.equal(
      `${info.payoutToken}`.toLowerCase(),
      `${payoutToken}`.toLowerCase(),
      'payoutToken'
    );
    assert.equal(info.precision, 10 ** 18, 'precision');
    assert.equal(`${info.token}`.toLowerCase(), `${payoutToken}`.toLowerCase(), 'token');
    assert.equal(info.rewardManager, rewardManager, 'rewardManager');
    assert.equal(info.shouldFailPayout, false, 'shouldFailPayout');
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

  it('should create user account', async () => {
    assert.equal(
      await getAccountOwner({ accountId }),
      ethers.constants.AddressZero,
      'New wallet should not have an account yet'
    );
    await createAccount({ wallet, accountId });
    assert.equal(await getAccountOwner({ accountId }), address);
  });

  it(`should set fUSDC balance to 1_000`, async () => {
    const { tokenAddress } = await getCollateralConfig('fUSDC');
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fUSDC' }),
      0,
      'New wallet has 0 fUSDC balance'
    );
    await setMintableTokenBalance({
      privateKey,
      tokenAddress,
      balance: 1_000,
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'fUSDC' }), 1_000);
  });

  it('should approve fUSDC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fUSDC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket fUSDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'fUSDC',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fUSDC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  it(`should wrap 1_000 fUSDC`, async () => {
    const balance = await wrapCollateral({ wallet, symbol: 'fUSDC', amount: 1_000 });
    assert.equal(balance, 1_000);
  });

  it('should approve sUSDC spending for CoreProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sUSDC',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      false,
      'New wallet has not allowed CoreProxy sUSDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'sUSDC',
      spenderAddress: require('../../deployments/CoreProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sUSDC',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      true
    );
  });

  it(`should deposit 1_000 sUSDC into the system`, async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 1_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 1_000,
    });

    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 0);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 1_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it('should make a price update', async () => {
    // We must sync timestamp of the fork before making price updates
    await syncTime();

    // delegating collateral and views requiring price will fail if there's no price update within the last hour,
    // so we send off a price update just to be safe
    await doPriceUpdate({
      wallet,
      marketId: 100,
      settlementStrategyId: require('../../deployments/extras.json').eth_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 200,
      settlementStrategyId: require('../../deployments/extras.json').btc_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 300,
      settlementStrategyId: require('../../deployments/extras.json').snx_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 400,
      settlementStrategyId: require('../../deployments/extras.json').sol_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 500,
      settlementStrategyId: require('../../deployments/extras.json').wif_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 600,
      settlementStrategyId: require('../../deployments/extras.json').w_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 700,
      settlementStrategyId: require('../../deployments/extras.json').ena_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 800,
      settlementStrategyId: require('../../deployments/extras.json').doge_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 900,
      settlementStrategyId: require('../../deployments/extras.json').avax_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 1000,
      settlementStrategyId: require('../../deployments/extras.json').op_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 1100,
      settlementStrategyId: require('../../deployments/extras.json').ordi_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 1200,
      settlementStrategyId: require('../../deployments/extras.json').pepe_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 1300,
      settlementStrategyId: require('../../deployments/extras.json').rune_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 1400,
      settlementStrategyId: require('../../deployments/extras.json').bonk_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 1500,
      settlementStrategyId: require('../../deployments/extras.json').ftm_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 1600,
      settlementStrategyId: require('../../deployments/extras.json').arb_pyth_settlement_strategy,
    });
    await doPriceUpdate({
      wallet,
      marketId: 1700,
      settlementStrategyId: require('../../deployments/extras.json').matic_pyth_settlement_strategy,
    });
  });

  it(`should delegate 1_000 sUSDC into the Spartan Council pool`, async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 1_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 1_000,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 1_000,
      totalAssigned: 1_000,
      totalLocked: 0,
    });
  });

  it('should fund RewardDistributor with 1_000 fwSNX', async () => {
    await setPermissionlessTokenBalance({ privateKey, tokenAddress: payoutToken, balance: 1_000 });

    await transferToken({
      privateKey,
      tokenAddress: payoutToken,
      targetWalletAddress: distributorAddress,
      amount: 1_000,
    });

    assert.equal(
      Math.floor(
        await getTokenBalance({ walletAddress: distributorAddress, tokenAddress: payoutToken })
      ),
      Math.floor(initialBalance + 1_000),
      'Rewards Distributor has 1_000 extra fwSNX on its balance'
    );
  });

  it('should distribute 1_000 fwSNX rewards', async () => {
    const poolId = 1;
    const poolOwner = await getPoolOwner({ poolId });
    log({ poolOwner });

    await provider.send('anvil_impersonateAccount', [poolOwner]);
    const signer = provider.getSigner(poolOwner);

    const amount = ethers.utils.parseUnits(`${1_000}`, 18); // the number must be in 18 decimals
    const start = Math.floor(Date.now() / 1_000);
    const duration = 10;

    await distributeRewards({
      wallet: signer,
      distributorAddress,
      poolId,
      collateralType,
      amount,
      start,
      duration,
    });

    await provider.send('anvil_stopImpersonatingAccount', [poolOwner]);

    assert.equal(
      await getTokenRewardsDistributorRewardsAmount({ distributorAddress }),
      initialRewardsAmount + 1_000,
      'should have 1_000 extra tokens in rewards'
    );
  });

  it('should claim fwSNX rewards', async () => {
    const poolId = 1;

    const availableRewards = await getAvailableRewards({
      accountId,
      poolId,
      collateralType,
      distributorAddress,
    });

    assert.ok(availableRewards > 0, 'should have some rewards to claim');

    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: payoutToken }),
      0,
      'Wallet has 0 fwSNX balance BEFORE claim'
    );

    await claimRewards({
      wallet,
      accountId,
      poolId,
      collateralType,
      distributorAddress,
    });

    const postClaimBalance = await getTokenBalance({
      walletAddress: address,
      tokenAddress: payoutToken,
    });
    assert.ok(postClaimBalance > 0, 'Wallet has some non-zero fwSNX balance AFTER claim');

    assert.equal(
      Math.floor(await getTokenRewardsDistributorRewardsAmount({ distributorAddress })),
      Math.floor(initialRewardsAmount + 1_000 - postClaimBalance),
      'should deduct claimed token amount from total distributor rewards amount'
    );
  });
});
