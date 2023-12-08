const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { isTokenApproved } = require('../../tasks/isTokenApproved');
const { approveToken } = require('../../tasks/approveToken');
const { getTokenBalance } = require('../../tasks/getTokenBalance');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { wrapUsdc } = require('../../tasks/wrapUsdc');
const { getAccountOwner } = require('../../tasks/getAccountOwner');
const { createAccount } = require('../../tasks/createAccount');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { depositCollateral } = require('../../tasks/depositCollateral');
const { delegateCollateral } = require('../../tasks/delegateCollateral');
const { setConfigUint } = require('../../tasks/setConfigUint');
const { getConfigUint } = require('../../tasks/getConfigUint');
const { withdrawCollateral } = require('../../tasks/withdrawCollateral');
const { mineBlock } = require('../../tasks/mineBlock');
const { burnDebt } = require('../../tasks/burnDebt');
const { swapToSusd } = require('../../tasks/swapToSusd');

const extras = require('../../deployments/extras.json');
const USDProxyDeployment = require('../../deployments/USDProxy.json');
const CoreProxyDeployment = require('../../deployments/CoreProxy.json');
const SpotMarketProxyDeployment = require('../../deployments/SpotMarketProxy.json');
const USDCDeployment = require('../../deployments/FakeCollateralfUSDC.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

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

  it('should set USDC balance to 10_000_000', async () => {
    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: USDCDeployment.address }),
      0,
      'New wallet has 0 USDC balance'
    );
    await setMintableTokenBalance({
      privateKey,
      tokenAddress: USDCDeployment.address,
      balance: 10_000_000,
    });
    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: USDCDeployment.address }),
      10_000_000
    );
  });

  it('should approve USDC spending for SpotMarket', async () => {
    assert.equal(
      await isTokenApproved({
        walletAddress: address,
        tokenAddress: USDCDeployment.address,
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      false,
      'New wallet has not allowed SpotMarket USDC spending'
    );
    await approveToken({
      privateKey,
      tokenAddress: USDCDeployment.address,
      spenderAddress: SpotMarketProxyDeployment.address,
    });
    assert.equal(
      await isTokenApproved({
        walletAddress: address,
        tokenAddress: USDCDeployment.address,
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      true
    );
  });

  it('should wrap 500 USDC', async () => {
    const balance = await wrapUsdc({ wallet, amount: 500 });
    assert.equal(balance, 500);
  });

  it('should atomic swap 50 sUSDC to sUSD to burn debt', async () => {
    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: USDProxyDeployment.address }),
      0
    );
    await swapToSusd({ wallet, marketId: extras.synth_usdc_market_id, amount: 50 });
    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: USDProxyDeployment.address }),
      50
    );
  });

  it('should approve sUSD spending for CoreProxy', async () => {
    assert.equal(
      await isTokenApproved({
        walletAddress: address,
        tokenAddress: USDProxyDeployment.address,
        spenderAddress: CoreProxyDeployment.address,
      }),
      false,
      'New wallet has not allowed CoreProxy sUSDC spending'
    );
    await approveToken({
      privateKey,
      tokenAddress: USDProxyDeployment.address,
      spenderAddress: CoreProxyDeployment.address,
    });
    assert.equal(
      await isTokenApproved({
        walletAddress: address,
        tokenAddress: USDProxyDeployment.address,
        spenderAddress: CoreProxyDeployment.address,
      }),
      true
    );
  });

  it('should deposit 30 sUSD into the system', async () => {
    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: USDProxyDeployment.address }),
      50
    );

    const CoreProxy = new ethers.Contract(
      CoreProxyDeployment.address,
      CoreProxyDeployment.abi,
      wallet
    );

    let [totalDeposited, totalAssigned, totalLocked] = await CoreProxy.getAccountCollateral(
      accountId,
      USDProxyDeployment.address
    );

    assert.deepEqual(
      {
        totalDeposited: parseFloat(ethers.utils.formatUnits(totalDeposited)),
        totalAssigned: parseFloat(ethers.utils.formatUnits(totalAssigned)),
        totalLocked: parseFloat(ethers.utils.formatUnits(totalLocked)),
      },
      { totalDeposited: 0, totalAssigned: 0, totalLocked: 0 }
    );

    const tx = await CoreProxy.deposit(
      ethers.BigNumber.from(accountId),
      USDProxyDeployment.address,
      ethers.utils.parseEther(`30`),
      { gasLimit: 10_000_000 }
    );
    await tx.wait();

    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: USDProxyDeployment.address }),
      20
    );
    [totalDeposited, totalAssigned, totalLocked] = await CoreProxy.getAccountCollateral(
      accountId,
      USDProxyDeployment.address
    );
    assert.deepEqual(
      {
        totalDeposited: parseFloat(ethers.utils.formatUnits(totalDeposited)),
        totalAssigned: parseFloat(ethers.utils.formatUnits(totalAssigned)),
        totalLocked: parseFloat(ethers.utils.formatUnits(totalLocked)),
      },
      { totalDeposited: 30, totalAssigned: 0, totalLocked: 0 }
    );
  });

  it('should approve sUSDC spending for CoreProxy', async () => {
    assert.equal(
      await isTokenApproved({
        walletAddress: address,
        tokenAddress: extras.synth_usdc_token_address,
        spenderAddress: CoreProxyDeployment.address,
      }),
      false,
      'New wallet has not allowed CoreProxy sUSDC spending'
    );
    await approveToken({
      privateKey,
      tokenAddress: extras.synth_usdc_token_address,
      spenderAddress: CoreProxyDeployment.address,
    });
    assert.equal(
      await isTokenApproved({
        walletAddress: address,
        tokenAddress: extras.synth_usdc_token_address,
        spenderAddress: CoreProxyDeployment.address,
      }),
      true
    );
  });

  it('should deposit 400 sUSDC into the system', async () => {
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 450);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 0,
      totalAssigned: 0,
      totalLocked: 0,
    });

    await depositCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 400,
    });

    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 50);
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 400,
      totalAssigned: 0,
      totalLocked: 0,
    });
  });

  it('should delegate 300 sUSDC into the Spartan Council pool', async () => {
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 400,
      totalAssigned: 0,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 300,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 400,
      totalAssigned: 300,
      totalLocked: 0,
    });
  });

  it('should undelegate 200 sUSDC from the Spartan Council pool', async () => {
    const CoreProxy = new ethers.Contract(
      CoreProxyDeployment.address,
      CoreProxyDeployment.abi,
      provider
    );

    //    log({
    //      getPositionDebt: await (
    //        await CoreProxy.connect(wallet).getPositionDebt(
    //          accountId,
    //          1,
    //          extras.synth_usdc_token_address
    //        )
    //      ).wait(),
    //    });

    await mineBlock();
    await burnDebt({ wallet, accountId, symbol: 'sUSDC', poolId: 1 });
    //    const debt = await CoreProxy.callStatic.getPositionDebt(
    //      accountId,
    //      1,
    //      extras.synth_usdc_token_address
    //    );
    //    log({ debt });
    //    if (debt.gt(0)) {
    //      const burn = CoreProxy.populateTransaction.burnUsd(
    //        BigNumber.from(accountId),
    //        BigNumber.from(poolId),
    //        collateralTypeAddress,
    //        debtChangeAbs.toBN()
    //      );
    //
    //      // burn
    //    }
    //    if (debt.lt(0)) {
    //      // mint
    //    }

    //        "function burnUsd(uint128 accountId, uint128 poolId, address collateralType, uint256 amount)",

    const tx = await CoreProxy.connect(wallet).delegateCollateral(
      ethers.BigNumber.from(accountId),
      ethers.BigNumber.from(1),
      extras.synth_usdc_token_address,
      ethers.utils.parseEther(`100`),
      ethers.utils.parseEther(`1`),
      { gasLimit: 10_000_000 }
    );
    const result = await tx.wait();
    log({ result });
    return;

    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 400,
      totalAssigned: 300,
      totalLocked: 0,
    });
    await delegateCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 100,
      poolId: 1,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 400,
      totalAssigned: 100,
      totalLocked: 0,
    });
  });

  it('should not be able to withdraw because of accountTimeoutWithdraw', async () => {
    await setConfigUint({ key: 'accountTimeoutWithdraw', value: 100 });
    assert.equal(await getConfigUint('accountTimeoutWithdraw'), 100);

    await assert.rejects(
      async () =>
        await withdrawCollateral({
          privateKey,
          symbol: 'sUSDC',
          accountId,
          amount: 200,
        })
    );
  });

  it('should withdraw 200 sUSDC', async () => {
    await setConfigUint({ key: 'accountTimeoutWithdraw', value: 0 });
    assert.equal(await getConfigUint('accountTimeoutWithdraw'), 0);
    await withdrawCollateral({
      privateKey,
      symbol: 'sUSDC',
      accountId,
      amount: 200,
    });
    assert.deepEqual(await getAccountCollateral({ accountId, symbol: 'sUSDC' }), {
      totalDeposited: 200,
      totalAssigned: 100,
      totalLocked: 0,
    });
    assert.equal(await getCollateralBalance({ address, symbol: 'sUSDC' }), 300);
  });
});
