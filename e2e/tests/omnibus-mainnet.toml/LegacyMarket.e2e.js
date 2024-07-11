const assert = require('assert');
const { getLpPosition } = require('../../tasks/getLpPosition');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { ethers } = require('ethers');
const { syncTime } = require('../../tasks/syncTime');
const { contractWrite } = require('../../tasks/contractWrite');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const LegacyMarketProxy = new ethers.Contract(
    require('../../deployments/LegacyMarketProxy.json').address,
    require('../../deployments/LegacyMarketProxy.json').abi,
    provider
  );

  const USDProxy = new ethers.Contract(
    require('../../deployments/USDProxy.json').address,
    require('../../deployments/USDProxy.json').abi,
    provider
  );

  const AccountProxy = new ethers.Contract(
    require('../../deployments/AccountProxy.json').address,
    require('../../deployments/AccountProxy.json').abi,
    provider
  );

  const V2x = new ethers.Contract(
    require('../../deployments/V2x.json').address,
    require('../../deployments/V2x.json').abi,
    provider
  );

  const V2xUsd = new ethers.Contract(
    require('../../deployments/V2xUsd.json').address,
    require('../../deployments/V2xUsd.json').abi,
    provider
  );

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

  it('should migrate account', async () => {
    const accountId = 80800;
    const walletAddress = '0x99F4176EE457afedFfCB1839c7aB7A030a5e4A92'; // pdao address (for now)
    const snxBalance = parseFloat(ethers.utils.formatEther(await V2x.balanceOf(walletAddress)));
    const debt = parseFloat(
      ethers.utils.formatEther(
        await V2x.debtBalanceOf(walletAddress, ethers.utils.formatBytes32String('sUSD'))
      )
    );
    log({ snxBalance, debt });

    const owner = await LegacyMarketProxy.owner();
    await provider.send('anvil_impersonateAccount', [owner]);
    const wallet = provider.getSigner(owner);

    log('migrate account', { walletAddress, accountId });

    await contractWrite({
      wallet,
      contract: 'LegacyMarketProxy',
      func: 'migrateOnBehalf',
      args: [walletAddress, accountId],
    });
    await provider.send('anvil_stopImpersonatingAccount', [owner]);

    log('should have nothing left on v2x');
    assert.equal(parseFloat(ethers.utils.formatEther(await V2x.balanceOf(walletAddress))), 0);
    assert.equal(
      parseFloat(
        ethers.utils.formatEther(
          await V2x.debtBalanceOf(walletAddress, ethers.utils.formatBytes32String('sUSD'))
        )
      ),
      0
    );

    log('the account should have the same debt as before');
    const newDebt = (await getLpPosition({ accountId, poolId: 1, symbol: 'SNX' })).debt;
    log({ newDebt });
    assert.deepEqual(newDebt, debt);

    log('the account should  have the same collaterals as before');
    const accountInfo = await getAccountCollateral({ accountId, symbol: 'SNX' });
    log({ accountInfo });
    assert.deepEqual(accountInfo.totalAssigned, accountInfo.totalDeposited);
    // here we just assert that we have more than enough deposited. calculating the actual amount expected would required reading into reward escrow and doing some complicated stuff to figure out already vested amounts and etc.
    assert(accountInfo.totalDeposited - accountInfo.totalLocked >= snxBalance);
  });

  // note: this test effectively has to run after the test above
  it('should allow conversion of sUSD tokens', async () => {
    const walletAddress = '0x99F4176EE457afedFfCB1839c7aB7A030a5e4A92'; // pdao address (for now)
    const oldUsdBalance =
      parseFloat(ethers.utils.formatEther(await V2xUsd.balanceOf(walletAddress))) - 1;
    log({ oldUsdBalance, oldUsdBalance });

    const migratedBalance = oldUsdBalance / 10;

    if (!oldUsdBalance) {
      return;
    }

    await provider.send('anvil_impersonateAccount', [walletAddress]);
    const wallet = provider.getSigner(walletAddress);

    log('mint newusd', { walletAddress, oldUsdBalance });

    await contractWrite({
      wallet,
      contract: 'V2xUsd',
      func: 'approve',
      args: [LegacyMarketProxy.address, ethers.utils.parseEther(migratedBalance.toString())],
    });

    await contractWrite({
      wallet,
      contract: 'LegacyMarketProxy',
      func: 'convertUSD',
      args: [ethers.utils.parseEther(migratedBalance.toString())],
    });
    await provider.send('anvil_stopImpersonatingAccount', [walletAddress]);

    const oldUsdBalanceAfter = parseFloat(
      ethers.utils.formatEther(await V2xUsd.balanceOf(walletAddress))
    );

    assert(oldUsdBalanceAfter < oldUsdBalance);

    const newUsdBalanceAfter = parseFloat(
      ethers.utils.formatEther(await USDProxy.balanceOf(walletAddress))
    );

    assert.equal(newUsdBalanceAfter, migratedBalance);
  });

  it('should liquidate an account below c-ratio', async () => {
    const liqableAccount = '0x3ad921041f2b53ab819e6c87a7f186f1b7b4d0ac';

    const liquidator = '0x42f9134E9d3Bf7eEE1f8A5Ac2a4328B059E7468c';
    await provider.send('anvil_impersonateAccount', [liquidator]);
    const wallet = provider.getSigner(liquidator);

    log('migrate to liquidate', { liqableAccount });

    await contractWrite({
      wallet,
      contract: 'LegacyMarketProxy',
      func: 'migrateOnBehalf',
      args: [liqableAccount, 818182],
    });
    await provider.send('anvil_stopImpersonatingAccount', [liquidator]);

    const liqAccountBalance = parseFloat(
      ethers.utils.formatEther(await V2x.balanceOf(liqableAccount))
    );

    assert.equal(liqAccountBalance, 0);

    try {
      await AccountProxy.ownerOf(818182);
    } catch (err) {
      assert(err.toString().includes('TokenDoesNotExist'));
    }
  });
});
