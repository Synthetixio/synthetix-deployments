const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { syncTime } = require('../../tasks/syncTime');
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

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);
  const wallet = ethers.Wallet.createRandom().connect(provider);
  // const wallet = new ethers.Wallet('0xab', provider);
  // const accountId = 1337;
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

  it('should set fWETH balance to 1_000', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fWETH' }),
      0,
      'New wallet has 0 fWETH balance'
    );
    const { tokenAddress } = await getCollateralConfig('fWETH');
    await setMintableTokenBalance({ privateKey, tokenAddress, balance: 1_000 });
    assert.equal(await getCollateralBalance({ address, symbol: 'fWETH' }), 1_000);
  });

  it('should approve fWETH spending for CoreProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fWETH',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      false,
      'New wallet has not allowed CoreProxy fWETH spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'fWETH',
      spenderAddress: require('../../deployments/CoreProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fWETH',
        spenderAddress: require('../../deployments/CoreProxy.json').address,
      }),
      true
    );
  });

  it('should deposit 500 fWETH into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'fWETH' }), 1_000);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'fWETH' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({ privateKey, symbol: 'fWETH', accountId, amount: 500 });

    assert.equal(await getCollateralBalance({ address, symbol: 'fWETH' }), 500);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'fWETH' }), {
      totalDeposited: 500,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it('should delegate 500 fWETH into the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'fWETH' }), {
      totalDeposited: 500,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'fWETH',
      accountId,
      amount: 500,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'fWETH' }), {
      totalDeposited: 500,
      totalAssigned: 500,
      totalLocked: 0,
    });
  });

  it.skip('enable all bfp features', async () => {
    const owner = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'owner',
    });
    log({ owner });
    await contractWrite({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'enableAllFeatures',
      impersonate: owner,
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

  it('should approve fWETH spending for BfpMarketProxy', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fWETH',
        spenderAddress: require('../../deployments/BfpMarketProxy.json').address,
      }),
      false,
      'New wallet has not allowed BfpMarketProxy fWETH spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'fWETH',
      spenderAddress: require('../../deployments/BfpMarketProxy.json').address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fWETH',
        spenderAddress: require('../../deployments/BfpMarketProxy.json').address,
      }),
      true
    );
  });

  it('should deposit 500 fWETH collateral into the bfp', async () => {
    const marketId = require('../../deployments/extras.json').eth_market_id;
    const collateralAddress = require('../../deployments/extras.json').weth_address;

    const oldDigest = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getAccountDigest',
      args: [accountId, marketId],
    });
    log({ oldDigest });

    const oldDepositedWeth = oldDigest.depositedCollaterals.find(
      (c) => c.collateralAddress === collateralAddress
    );
    log({ oldDepositedWeth });

    assert.equal(
      parseFloat(ethers.utils.formatEther(oldDepositedWeth.available)),
      0,
      'New account has 0 deposited WETH'
    );

    await contractWrite({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'modifyCollateral',
      args: [accountId, marketId, collateralAddress, ethers.utils.parseEther(String(500))],
    });

    const newDigest = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getAccountDigest',
      args: [accountId, marketId],
    });
    log({ newDigest });

    const newDepositedWeth = newDigest.depositedCollaterals.find(
      (c) => c.collateralAddress === collateralAddress
    );
    log({ newDepositedWeth });

    assert.equal(parseFloat(ethers.utils.formatEther(newDepositedWeth.available)), 500);
  });
});
