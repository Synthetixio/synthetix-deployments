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

  const V2x = new ethers.Contract(
    require('../../deployments/V2x.json').address,
    require('../../deployments/V2x.json').abi,
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
    const walletAddress = '0x87B56A29C8406E2D9847e17e9Ced5aaD483a438c';
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
});
