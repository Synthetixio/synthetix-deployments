const assert = require('assert');
const { getLpPosition } = require('../../tasks/getLpPosition');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { getCollateralConfig } = require('../../tasks/getCollateralConfig');
const { ethers } = require('ethers');
const { syncTime } = require('../../tasks/syncTime');
const { contractWrite } = require('../../tasks/contractWrite');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

describe.skip(require('path').basename(__filename, '.e2e.js'), function () {
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
    const walletAddress = '0xa41778C9b64937af21579074d54008FBd221C7D6'; // random rich person's wallet
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
    const lpPosition = await getLpPosition({ accountId, poolId: 1, symbol: 'SNX' });
    const newDebt = lpPosition.debt;
    log({ newDebt });
    assert.deepEqual(newDebt, debt);

    log('the account should  have the same collaterals as before');
    const accountInfo = await getAccountCollateral({ accountId, symbol: 'SNX' });
    log({ accountInfo });
    assert.deepEqual(accountInfo.totalAssigned, accountInfo.totalDeposited);
    // here we just assert that we have more than enough deposited. calculating the actual amount expected would required reading into reward escrow and doing some complicated stuff to figure out already vested amounts and etc.
    assert(accountInfo.totalDeposited - accountInfo.totalLocked >= snxBalance);

    log('the account should not be in liquidatable state');
    const liquidationRatio = parseFloat(
      ethers.utils.formatUnits((await getCollateralConfig('SNX')).liquidationRatioD18)
    );

    log({
      liquidationRatio,
      accountRatio: lpPosition.positionCratio,
      vaultRatio: lpPosition.vaultCratio,
    });

    // the account should still be healthy after migration (massive sanity check)
    assert(lpPosition.positionCratio >= liquidationRatio);
    assert(lpPosition.vaultCratio >= liquidationRatio);
  });

  // note: this test effectively has to run after the test above
  it('should allow conversion of sUSD tokens', async () => {
    const walletAddress = '0x722f0a6F970F8B144F5e92aB3f3BeaFA280b282f'; // random whale
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
});
