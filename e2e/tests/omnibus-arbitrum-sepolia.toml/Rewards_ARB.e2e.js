const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { getAccountOwner } = require('../../tasks/getAccountOwner');
const { createAccount } = require('../../tasks/createAccount');
const { getCollateralConfig } = require('../../tasks/getCollateralConfig');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { approveCollateral } = require('../../tasks/approveCollateral');
const { depositCollateral } = require('../../tasks/depositCollateral');
const { delegateCollateral } = require('../../tasks/delegateCollateral');
const { syncTime } = require('../../tasks/syncTime');
const { getTokenBalance } = require('../../tasks/getTokenBalance');
const { transferToken } = require('../../tasks/transferToken');
const { distributeRewards } = require('../../tasks/distributeRewards');
const { getPoolOwner } = require('../../tasks/getPoolOwner');
const { getTokenRewardsDistributorInfo } = require('../../tasks/getTokenRewardsDistributorInfo');
const {
  getTokenRewardsDistributorRewardsAmount,
} = require('../../tasks/getTokenRewardsDistributorRewardsAmount');
const { getAvailableRewards } = require('../../tasks/getAvailableRewards');
const { claimRewards } = require('../../tasks/claimRewards');

const {
  address: distributorAddress,
} = require('../../deployments/RewardsDistributor_1_fARB_fARB.json');
const rewardsDistributors = require('../../deployments/rewardsDistributors.json');
const rewardsDistributor = rewardsDistributors.find((rd) => rd.address === distributorAddress);
log({ rewardsDistributor });

const payoutToken = rewardsDistributor.payoutToken.address;
const rewardManager = rewardsDistributor.rewardManager;
const collateralType = rewardsDistributor.collateralType.address;

log({ distributorAddress, payoutToken, rewardManager });

describe.skip(require('path').basename(__filename, '.e2e.js'), function () {
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

    initialRewardsAmount = Math.round(
      await getTokenRewardsDistributorRewardsAmount({ distributorAddress })
    );
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
    log(info);
    assert.equal(info.name, 'Spartan Council Pool ARB Rewards for ARB LP', 'name');
    assert.equal(info.poolId, 1, 'poolId');
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

  it(`should set fARB balance to 1_000`, async () => {
    const { tokenAddress } = await getCollateralConfig('fARB');
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fARB' }),
      0,
      'New wallet has 0 fARB balance'
    );
    await setMintableTokenBalance({
      privateKey,
      tokenAddress,
      balance: 1_000,
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'fARB' }), 1_000);
  });

  it('should approve fARB spending for Core system', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fARB',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      false,
      'New wallet has not allowed CoreProxy fARB spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'fARB',
      spenderAddress: require('../../deployments/CoreProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fARB',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      true
    );
  });

  it(`should deposit 1_000 fARB into the system`, async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'fARB' }), 1_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'fARB' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({
      privateKey,
      symbol: 'fARB',
      accountId,
      amount: 1_000,
    });

    assert.equal(await getCollateralBalance({ address, symbol: 'fARB' }), 0);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'fARB' }), {
      totalDeposited: 1_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it(`should delegate 1_000 fARB into the Spartan Council pool`, async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'fARB' }), {
      totalDeposited: 1_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'fARB',
      accountId,
      amount: 1_000,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'fARB' }), {
      totalDeposited: 1_000,
      totalAssigned: 1_000,
      totalLocked: 0,
    });
  });

  it('should fund RewardDistributor with 2_000 fARB', async () => {
    await setMintableTokenBalance({ privateKey, tokenAddress: payoutToken, balance: 2_000 });

    await transferToken({
      privateKey,
      tokenAddress: payoutToken,
      targetWalletAddress: distributorAddress,
      amount: 2_000,
    });

    assert.equal(
      Math.floor(
        await getTokenBalance({ walletAddress: distributorAddress, tokenAddress: payoutToken })
      ),
      Math.floor(initialBalance + 2_000),
      'Rewards Distributor has 2_000 extra fARB on its balance'
    );
  });

  it('should distribute 1_000 fARB vault rewards and 1_000 fARB pool rewards', async () => {
    await syncTime();

    const poolId = 1;
    const poolOwner = await getPoolOwner({ poolId });
    log({ poolOwner });

    await provider.send('anvil_impersonateAccount', [poolOwner]);
    const signer = provider.getSigner(poolOwner);

    const amount = ethers.utils.parseUnits(`${1_000}`, 18);
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

    await distributeRewards({
      wallet: signer,
      distributorAddress,
      poolId,
      collateralType: ethers.constants.AddressZero,
      amount,
      start,
      duration,
    });

    await provider.send('anvil_stopImpersonatingAccount', [poolOwner]);

    assert.equal(
      Math.round(await getTokenRewardsDistributorRewardsAmount({ distributorAddress })),
      Math.round(initialRewardsAmount + 2_000),
      'should have 2_000 extra tokens in rewards'
    );
  });

  it.skip('should claim fARB rewards', async () => {
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
      'Wallet has 0 fARB balance BEFORE claim'
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
    log({ postClaimBalance });
    assert.ok(postClaimBalance > 0, 'Wallet has some non-zero fARB balance AFTER claim');

    assert.equal(
      Math.round(await getTokenRewardsDistributorRewardsAmount({ distributorAddress })),
      Math.round(initialRewardsAmount + 2_000 - postClaimBalance),
      'should deduct claimed token amount from total distributor rewards amount'
    );
  });
});
