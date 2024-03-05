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
const { setSpotWrapper } = require('../../tasks/setSpotWrapper');
const {
  configureMaximumMarketCollateral,
} = require('../../tasks/configureMaximumMarketCollateral');
const { syncTime } = require('../../tasks/syncTime');

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

  let snapshot;

  before('Create snapshot', async () => {
    snapshot = await provider.send('evm_snapshot', []);
    log('Create snapshot', { snapshot });
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

  it('should set fUSDC balance to 10_000_000', async () => {
    const { tokenAddress } = await getCollateralConfig('fUSDC');
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fUSDC' }),
      0,
      'New wallet has 0 fUSDC balance'
    );
    await setMintableTokenBalance({ privateKey, tokenAddress, balance: 10_000_000 });
    assert.equal(await getCollateralBalance({ address, symbol: 'fUSDC' }), 10_000_000);
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

  it('should increase max collateral for the test to 10_000_000', async () => {
    await configureMaximumMarketCollateral({
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      symbol: 'fUSDC',
      targetAmount: String(10_000_000),
    });
    await setSpotWrapper({
      marketId: require('../../deployments/extras.json').synth_usdc_market_id,
      symbol: 'fUSDC',
      targetAmount: String(10_000_000),
    });
  });

  it('should wrap 5_000_000 fUSDC', async () => {
    const balance = await wrapCollateral({ wallet, symbol: 'fUSDC', amount: 5_000_000 });
    assert.equal(balance, 5_000_000);
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

  it('should deposit 4_900_000 sUSDC into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 5_000_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({ privateKey, symbol: 'sUSDC', accountId, amount: 4_900_000 });

    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 100_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 4_900_000,
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
  });

  it('should delegate 4_800_000 sUSDC into the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 4_900_000,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 4_800_000,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 4_900_000,
      totalAssigned: 4_800_000,
      totalLocked: 0,
    });
  });

  it('should set fwSNX balance to 1_000_000', async () => {
    const { setPermissionlessTokenBalance } = require('../../tasks/setPermissionlessTokenBalance');
    const { getTokenBalance } = require('../../tasks/getTokenBalance');

    const {
      contracts: { FakeCollateralfwSNX: tokenAddress },
    } = require('../../deployments/meta.json');

    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress }),
      0,
      'New wallet has 0 fwSNX balance'
    );
    await setPermissionlessTokenBalance({ privateKey, tokenAddress, balance: 1_000_000 });
    assert.equal(await getTokenBalance({ walletAddress: address, tokenAddress }), 1_000_000);
  });

  it('should distribute 1_000_000 fwSNX rewards', async () => {
    const { getTokenBalance } = require('../../tasks/getTokenBalance');
    const { transferToken } = require('../../tasks/transferToken');
    const { parseError } = require('../../parseError');
    const { gasLog } = require('../../gasLog');

    const deployments = require('../../deployments/cannon.json');
    const rd =
      deployments?.state?.[`provision.spartan_council_pool_rewards`]?.artifacts?.imports
        ?.spartan_council_pool_rewards?.contracts?.RewardsDistributor;

    assert.ok(rd);

    const RewardsDistributor = new ethers.Contract(rd.address, rd.abi, provider);

    const poolId = 1;
    const { tokenAddress: collateralType } = await getCollateralConfig('sUSDC');

    assert.equal(await RewardsDistributor.name(), 'Spartan Council Pool Rewards');
    assert.equal(await RewardsDistributor.collateralType(), collateralType);

    const {
      contracts: { FakeCollateralfwSNX: payoutToken },
    } = require('../../deployments/meta.json');
    const CoreProxy = new ethers.Contract(
      require('../../deployments/CoreProxy.json').address,
      require('../../deployments/CoreProxy.json').abi,
      provider
    );

    assert.equal(await RewardsDistributor.token(), payoutToken, 'token');
    assert.equal(await RewardsDistributor.payoutToken(), payoutToken, 'payoutToken');
    assert.equal(await RewardsDistributor.poolId(), poolId, 'poolId');
    assert.equal(await RewardsDistributor.precision(), 1e18, 'precision');
    assert.equal(await RewardsDistributor.rewardManager(), CoreProxy.address, 'rewardManager');
    assert.equal(parseFloat(ethers.utils.formatEther(await RewardsDistributor.rewardsAmount())), 0);

    assert.equal(
      await getTokenBalance({
        walletAddress: RewardsDistributor.address,
        tokenAddress: payoutToken,
      }),
      0
    );
    await transferToken({
      privateKey,
      tokenAddress: payoutToken,
      targetWalletAddress: RewardsDistributor.address,
      amount: 1_000_000,
    });
    assert.equal(
      await getTokenBalance({
        walletAddress: RewardsDistributor.address,
        tokenAddress: payoutToken,
      }),
      1_000_000
    );

    const poolOwner = await CoreProxy.getPoolOwner(poolId);
    log({ poolOwner });
    await provider.send('anvil_impersonateAccount', [poolOwner]);
    const signer = provider.getSigner(poolOwner);

    const amount = ethers.utils.parseEther(`${1_000_000}`);
    const start = Math.floor(Date.now() / 1000);
    const duration = 10;
    const args = [
      //
      poolId,
      collateralType,
      amount,
      start,
      duration,
    ];
    log({ poolId, collateralType, amount, start, duration });
    const gasLimit = await RewardsDistributor.connect(signer)
      .estimateGas.distributeRewards(...args)
      .catch(parseError);
    const tx = await RewardsDistributor.connect(signer)
      .distributeRewards(...args, { gasLimit: gasLimit.mul(2) })
      .catch(parseError);
    await tx
      .wait()
      .then((txn) => log(txn.events) || txn, parseError)
      .then(gasLog({ action: 'RewardsDistributor.distributeRewards', log }));

    await provider.send('anvil_stopImpersonatingAccount', [poolOwner]);

    assert.equal(
      parseFloat(ethers.utils.formatEther(await RewardsDistributor.rewardsAmount())),
      1_000_000
    );
  });

  it('should claim fwSNX rewards', async () => {
    const poolId = 1;

    const deployments = require('../../deployments/cannon.json');
    const rd =
      deployments?.state?.[`provision.spartan_council_pool_rewards`]?.artifacts?.imports
        ?.spartan_council_pool_rewards?.contracts?.RewardsDistributor;

    assert.ok(rd);
    const distributor = rd.address;

    const CoreProxy = new ethers.Contract(
      require('../../deployments/CoreProxy.json').address,
      require('../../deployments/CoreProxy.json').abi,
      provider
    );

    const { tokenAddress: collateralType } = await getCollateralConfig('sUSDC');

    const availableRewards = parseFloat(
      ethers.utils.formatEther(
        await CoreProxy.getAvailableRewards(accountId, poolId, collateralType, distributor)
      )
    );
    log({ availableRewards });
    assert.ok(availableRewards > 0, 'should have some rewards to claim');

    const {
      contracts: { FakeCollateralfwSNX: payoutToken },
    } = require('../../deployments/meta.json');
    const { getTokenBalance } = require('../../tasks/getTokenBalance');

    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: payoutToken }),
      0,
      'Wallet has 0 fwSNX balance BEFORE claim'
    );

    const { parseError } = require('../../parseError');
    const { gasLog } = require('../../gasLog');

    const args = [
      //
      accountId,
      poolId,
      collateralType,
      distributor,
    ];
    log({ accountId, poolId, collateralType, distributor });
    const gasLimit = await CoreProxy.connect(wallet)
      .estimateGas.claimRewards(...args)
      .catch(parseError);
    const tx = await CoreProxy.connect(wallet)
      .claimRewards(...args, { gasLimit: gasLimit.mul(2) })
      .catch(parseError);
    await tx
      .wait()
      .then((txn) => log(txn.events) || txn, parseError)
      .then(gasLog({ action: 'CoreProxy.claimRewards', log }));

    assert.ok(
      (await getTokenBalance({ walletAddress: address, tokenAddress: payoutToken })) > 0,
      'Wallet has some non-zero fwSNX balance AFTER claim'
    );
  });
});
