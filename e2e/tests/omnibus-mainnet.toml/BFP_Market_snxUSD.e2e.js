const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { wait } = require('../../wait');

const { syncTime, getTimes } = require('../../tasks/syncTime');
const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { getAccountOwner } = require('../../tasks/getAccountOwner');
const { createAccount } = require('../../tasks/createAccount');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { approveCollateral } = require('../../tasks/approveCollateral');
const { depositCollateral } = require('../../tasks/depositCollateral');
const { delegateCollateral } = require('../../tasks/delegateCollateral');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { getCollateralConfig } = require('../../tasks/getCollateralConfig');
const { contractRead } = require('../../tasks/contractRead');
const { contractWrite } = require('../../tasks/contractWrite');
const { commitBfpOrder } = require('../../tasks/commitBfpOrder');
const { settleBfpOrder } = require('../../tasks/settleBfpOrder');
const { getBfpPosition } = require('../../tasks/getBfpPosition');
const { borrowUsd } = require('../../tasks/borrowUsd');
const { setConfigUint } = require('../../tasks/setConfigUint');
const { withdrawCollateral } = require('../../tasks/withdrawCollateral');
const { getConfigUint } = require('../../tasks/getConfigUint');
const { wrapEth } = require('../../tasks/wrapEth');

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);
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

  it('should set ETH balance to 1100', async () => {
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 1100 });
    assert.equal(await getEthBalance({ address }), 1100);
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

  it('should set WETH balance to 1_000', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'WETH' }),
      0,
      'New wallet has 0 WETH balance'
    );
    const { tokenAddress } = await getCollateralConfig('WETH');
    await wrapEth({ privateKey, amount: 1_000 });
    assert.equal(await getCollateralBalance({ address, symbol: 'WETH' }), 1_000);
  });

  it('should disable withdrawal timeout', async () => {
    await setConfigUint({ key: 'accountTimeoutWithdraw', value: 0 });
    assert.equal(await getConfigUint('accountTimeoutWithdraw'), 0);
  });

  it('should mint 100_000 sUSD using ETH collateral', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'sUSD' }),
      0,
      'New wallet has 0 sUSD balance'
    );
    await approveCollateral({
      privateKey,
      symbol: 'WETH',
      spenderAddress: require('../../deployments/CoreProxy.json').address,
    });
    await depositCollateral({ privateKey, symbol: 'WETH', accountId, amount: 500 });
    await delegateCollateral({
      privateKey,
      symbol: 'WETH',
      accountId,
      amount: 500,
      poolId: 1,
    });

    await borrowUsd({ wallet, accountId, symbol: 'WETH', amount: 100_000, poolId: 1 });

    // Verify the new sUSD balance
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSD' }), {
      totalDeposited: 100_000,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await withdrawCollateral({
      privateKey,
      accountId,
      amount: 100_000,
      symbol: 'sUSD',
    });

    assert.equal(await getCollateralBalance({ address, symbol: 'sUSD' }), 100_000);
  });

  it('should approve sUSD spending for CoreProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sUSD',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      false,
      'New wallet has not allowed CoreProxy sUSD spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'sUSD',
      spenderAddress: require('../../deployments/CoreProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sUSD',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      true
    );
  });

  it('should deposit 50_000 sUSD into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSD' }), 100_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSD' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({ privateKey, symbol: 'sUSD', accountId, amount: 50_000 });

    assert.equal(await getCollateralBalance({ address, symbol: 'sUSD' }), 50_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSD' }), {
      totalDeposited: 50000,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it('should create bfp account', async () => {
    const oldAccountOwner = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getAccountOwner',
      args: [accountId],
    });
    log({ accountId, oldAccountOwner });
    assert.equal(
      oldAccountOwner,
      ethers.constants.AddressZero,
      'New wallet should not have an account yet'
    );

    await contractWrite({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'createAccount(uint128)',
      args: [accountId],
    });

    const newAccountOwner = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getAccountOwner',
      args: [accountId],
    });
    log({ accountId, newAccountOwner });
    assert.equal(newAccountOwner, wallet.address);

    const permissions = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getAccountPermissions',
      args: [accountId],
    });

    log({ accountId, permissions });
  });

  it('should approve sUSD spending for BfpMarketProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sUSD',
        spenderAddress: require('../../deployments/BfpMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed BfpMarketProxy sUSD spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'sUSD',
      spenderAddress: require('../../deployments/BfpMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'sUSD',
        spenderAddress: require('../../deployments/BfpMarketProxy.json').address,
      }),
      true
    );
  });

  it('should deposit 50_000 sUSD collateral into the bfp', async () => {
    const marketId = require('../../deployments/extras.json').eth_market_id;
    const collateralAddress = require('../../deployments/systemToken.json').address;

    const oldDigest = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getAccountDigest',
      args: [accountId, marketId],
    });
    log({ oldDigest });

    const oldDepositedsUSD = oldDigest.depositedCollaterals.find(
      (c) => c.collateralAddress === collateralAddress
    );
    log({ oldDepositedsUSD });
    log(collateralAddress);

    assert.equal(
      parseFloat(ethers.utils.formatEther(oldDepositedsUSD.available)),
      0,
      'New account has 0 deposited sUSD'
    );

    await contractWrite({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'modifyCollateral',
      args: [accountId, marketId, collateralAddress, ethers.utils.parseEther(String(50000))],
    });

    const newDigest = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getAccountDigest',
      args: [accountId, marketId],
    });
    log({ newDigest });

    const newDepositedsUSD = newDigest.depositedCollaterals.find(
      (c) => c.collateralAddress === collateralAddress
    );
    log({ newDepositedsUSD });

    assert.equal(parseFloat(ethers.utils.formatEther(newDepositedsUSD.available)), 50_000);
  });

  it('should open a short', async () => {
    const marketId = require('../../deployments/extras.json').eth_market_id;
    const currentPosition = await getBfpPosition({ accountId, marketId });
    const collateralAddress = require('../../deployments/systemToken.json').address;

    assert.equal(currentPosition.positionSize, 0);

    // We must sync timestamp of the fork before making time-sensitive operations
    await syncTime();

    await wait(1000);

    const newDigest = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getAccountDigest',
      args: [accountId, marketId],
    });
    log({ newDigest });

    const newDepositedsUSD = newDigest.depositedCollaterals.find(
      (c) => c.collateralAddress === collateralAddress
    );
    log({ newDepositedsUSD });
    const { now, blockTimestamp } = getTimes(provider);
    const buffer = 1; // 1s
    const diff = now - blockTimestamp;

    //To resolve the time issues on CI some buffer time is needed
    if (diff < 0) {
      await wait(Math.abs(diff) + buffer * 1000);
    }
    await wait(15000);
    await commitBfpOrder({
      wallet,
      accountId,
      marketId,
      sizeDelta: -0.01,
    });
    await wait(10000);

    const newPosition = await settleBfpOrder({ wallet, accountId, marketId });

    assert.equal(newPosition.positionSize, -0.01);
  });

  it('should close the short', async () => {
    const marketId = require('../../deployments/extras.json').eth_market_id;
    const currentPosition = await getBfpPosition({ accountId, marketId });

    assert.equal(currentPosition.positionSize, -0.01);

    // We must sync timestamp of the fork before making time-sensitive operations
    await syncTime();

    await wait(1000);
    await commitBfpOrder({
      wallet,
      accountId,
      marketId,
      sizeDelta: 0.01,
    });

    const newPosition = await settleBfpOrder({ wallet, accountId, marketId });

    assert.equal(newPosition.positionSize, 0);
  });

  it('should withdrawAll', async () => {
    const marketId = require('../../deployments/extras.json').eth_market_id;

    const { collateralUsd } = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getMarginDigest',
      args: [accountId, marketId],
    });

    log({ collateralUsd });
    assert.ok(parseFloat(ethers.utils.formatUnits(collateralUsd)) > 0);

    await contractWrite({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'withdrawAllCollateral',
      args: [accountId, marketId],
    });

    const { collateralUsd: newCollateral } = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getMarginDigest',
      args: [accountId, marketId],
    });

    log({ newCollateral });
    assert.equal(newCollateral.toNumber(), 0);
  });
});
