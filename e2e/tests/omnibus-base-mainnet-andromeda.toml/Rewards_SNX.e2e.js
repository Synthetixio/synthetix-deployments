const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
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
const { setTokenBalance } = require('../../tasks/setTokenBalance');
const { syncTime } = require('../../tasks/syncTime');
const { getTokenBalance } = require('../../tasks/getTokenBalance');
const { transferToken } = require('../../tasks/transferToken');
const { distributeRewards } = require('../../tasks/distributeRewards');
const { getPoolOwner } = require('../../tasks/getPoolOwner');
const { getTokenRewardsDistributorInfo } = require('../../tasks/getTokenRewardsDistributorInfo');
const {
  getTokenRewardsDistributorRewardedAmount,
} = require('../../tasks/getTokenRewardsDistributorRewardedAmount');
const { getAvailablePoolRewards } = require('../../tasks/getAvailablePoolRewards');
const { claimPoolRewards } = require('../../tasks/claimPoolRewards');
const { setSpotWrapper } = require('../../tasks/setSpotWrapper');
const {
  configureMaximumMarketCollateral,
} = require('../../tasks/configureMaximumMarketCollateral');
const { wait } = require('../../wait');

const rewardsDistributors = require('../../deployments/rewardsDistributors.json');
const rewardsDistributor = rewardsDistributors.find(
  (rd) =>
    rd.isRegistered && !rd.collateralType && rd.poolId === '1' && rd.name === 'SNX Pool Rewards'
);
log({ rewardsDistributor });

const distributorAddress = rewardsDistributor.address;
const payoutTokenAddress = rewardsDistributor.payoutToken.address;
const rewardManager = rewardsDistributor.rewardManager;

log({ distributorAddress, payoutTokenAddress, rewardManager });

function round(val) {
  const milli = `${Math.floor(val * 1000)}`;
  return parseFloat(milli.slice(0, -3).concat('.').concat(milli.slice(-3)));
}

describe.skip(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

  let snapshot;
  let initialDistributorBalance;
  let initialDistributorRewardedAmount;

  before('Create snapshot', async () => {
    snapshot = await provider.send('evm_snapshot', []);
    log('Create snapshot', { snapshot });
    initialDistributorBalance = round(
      await getTokenBalance({
        walletAddress: distributorAddress,
        tokenAddress: payoutTokenAddress,
      })
    );
    log({ initialDistributorBalance });
    initialDistributorRewardedAmount = round(
      await getTokenRewardsDistributorRewardedAmount({ distributorAddress })
    );
    log({ initialDistributorRewardedAmount });
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
    assert.equal(info.name, 'SNX Pool Rewards', 'name');
    assert.equal(info.poolId, 1, 'poolId');
    assert.equal(info.collateralType, undefined, 'collateralType');
    assert.equal(
      `${info.payoutToken}`.toLowerCase(),
      `${payoutTokenAddress}`.toLowerCase(),
      'payoutToken'
    );
    assert.equal(info.precision, 10 ** 18, 'precision');
    assert.equal(`${info.token}`.toLowerCase(), `${payoutTokenAddress}`.toLowerCase(), 'token');
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

  it(`should set USDC balance to 1_000`, async () => {
    const { tokenAddress } = await getCollateralConfig('USDC');
    assert.equal(
      await getCollateralBalance({ address, symbol: 'USDC' }),
      0,
      'New wallet has 0 USDC balance'
    );
    await setTokenBalance({
      wallet,
      balance: 1_000,
      tokenAddress,
      friendlyWhale: '0xcdac0d6c6c59727a65f871236188350531885c43',
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'USDC' }), 1_000);
  });

  it('should approve USDC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed SpotMarket USDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'USDC',
      spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDC',
        spenderAddress: require('../../deployments/SpotMarketProxy.json').address,
      }),
      true
    );
  });

  it('should increase max collateral for the test to 1_000_000_000_000', async () => {
    await configureMaximumMarketCollateral({
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      symbol: 'USDC',
      targetAmount: String(1_000_000_000_000),
    });
    await setSpotWrapper({
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      symbol: 'USDC',
      targetAmount: String(1_000_000_000_000),
    });
  });

  it(`should wrap 1_000 USDC`, async () => {
    const balance = await wrapCollateral({
      wallet,
      symbol: 'USDC',
      synthAddress: require('../../deployments/extras.json').synth_usdc_token_address,
      synthMarketId: require('../../deployments/extras.json').synth_usdc_market_id,
      amount: 1_000,
    });
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

  it('should fund RewardDistributor with 1_000 SNX', async () => {
    const tmpWallet = ethers.Wallet.createRandom().connect(provider);
    await setEthBalance({ address: tmpWallet.address, balance: 100 });
    await setTokenBalance({
      wallet: tmpWallet,
      balance: 1_000,
      tokenAddress: payoutTokenAddress,
      friendlyWhale: '0xcc79bfa7a3212d94390c358e88afcd39294549ca',
    });

    await transferToken({
      privateKey: tmpWallet.privateKey,
      tokenAddress: payoutTokenAddress,
      targetWalletAddress: distributorAddress,
      amount: 1_000,
    });

    assert.equal(
      round(
        await getTokenBalance({
          walletAddress: distributorAddress,
          tokenAddress: payoutTokenAddress,
        })
      ),
      round(initialDistributorBalance + 1_000),
      'Rewards Distributor has 1_000 extra SNX on its balance'
    );
  });

  it('should distribute 1_000 SNX rewards', async () => {
    const poolId = 1;
    const poolOwner = await getPoolOwner({ poolId });
    log({ poolOwner });
    await setEthBalance({ address: poolOwner, balance: 100 });

    const preDistributeBalance = round(
      await getTokenBalance({ walletAddress: address, tokenAddress: payoutTokenAddress })
    );
    log({ preDistributeBalance });
    assert.equal(preDistributeBalance, 0, 'Wallet has 0 SNX balance BEFORE distribution');

    await provider.send('anvil_impersonateAccount', [poolOwner]);
    const signer = provider.getSigner(poolOwner);

    const amount = ethers.utils.parseUnits(`${1_000}`, 18); // the number must be in 18 decimals
    const start = Math.floor(Date.now() / 1_000);
    const duration = 1;

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
      round(await getTokenRewardsDistributorRewardedAmount({ distributorAddress })),
      round(initialDistributorRewardedAmount + 1_000),
      'should have 1_000 extra tokens in rewards'
    );

    const postDistributeBalance = round(
      await getTokenBalance({ walletAddress: address, tokenAddress: payoutTokenAddress })
    );
    log({ postDistributeBalance });
    assert.equal(postDistributeBalance, 0, 'Wallet has 0 SNX balance AFTER distribution');
  });

  it('should wait for SNX rewards to be distributed', async () => {
    await wait(2000);
    await syncTime();
  });

  it('should claim SNX rewards', async () => {
    const poolId = 1;

    const { tokenAddress } = await getCollateralConfig('sUSDC');
    const availableRewards = await getAvailablePoolRewards({
      accountId,
      poolId,
      collateralType: tokenAddress,
      distributorAddress,
    });
    log({ availableRewards });
    assert.ok(availableRewards > 0, 'should have some rewards to claim');

    const preClaimBalance = round(
      await getTokenBalance({
        walletAddress: address,
        tokenAddress: payoutTokenAddress,
      })
    );
    log({ preClaimBalance });
    assert.equal(preClaimBalance, 0, 'Wallet has 0 SNX balance BEFORE claim');

    const preClaimDistributorBalance = round(
      await getTokenBalance({
        walletAddress: distributorAddress,
        tokenAddress: payoutTokenAddress,
      })
    );
    log({ preClaimDistributorBalance });

    await claimPoolRewards({
      wallet,
      accountId,
      poolId,
      collateralType: tokenAddress,
      distributorAddress,
    });

    const postClaimBalance = round(
      await getTokenBalance({
        walletAddress: address,
        tokenAddress: payoutTokenAddress,
      })
    );
    log({ postClaimBalance });
    assert.ok(postClaimBalance > 0, 'Wallet has some non-zero SNX balance AFTER claim');

    const postClaimClaimDistributorBalance = round(
      await getTokenBalance({
        walletAddress: distributorAddress,
        tokenAddress: payoutTokenAddress,
      })
    );
    log({ postClaimClaimDistributorBalance });

    log({
      preClaimDistributorBalance,
      postClaimBalance,
      postClaimClaimDistributorBalance,
    });
    assert.ok(
      postClaimClaimDistributorBalance < preClaimDistributorBalance,
      'Distributor balance reduced AFTER claim'
    );
  });
});
