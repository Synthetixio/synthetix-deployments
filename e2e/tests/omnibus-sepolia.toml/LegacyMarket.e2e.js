const assert = require('assert');
const { migrateLegacyMarket } = require('../../tasks/migrateLegacyMarket');
const { getLpPosition } = require('../../tasks/getLpPosition');
const { getAccountCollateral } = require('../../tasks/getAccountCollateral');
const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const run = function () {
  let LegacyMarketProxy;
  let CoreProxy;
  let V2x;

  // some big wallets
  // https://etherscan.io/token/0x89FCb32F29e509cc42d0C8b6f058C993013A843F#balances
  const accounts = ['0x87B56A29C8406E2D9847e17e9Ced5aaD483a438c'];

  const accountDebtBalances = [];
  const accountSnxBalances = [];

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  LegacyMarketProxy = new ethers.Contract(
    require('../../deployments/LegacyMarketProxy.json').address,
    require('../../deployments/LegacyMarketProxy.json').abi,
    provider
  );

  CoreProxy = new ethers.Contract(
    require('../../deployments/CoreProxy.json').address,
    require('../../deployments/CoreProxy.json').abi,
    provider
  );

  V2x = new ethers.Contract(
    require('../../deployments/V2x.json').address,
    require('../../deployments/V2x.json').abi,
    provider
  );

  let snapshot;

  before('record before debts', async () => {
    for (const account of accounts) {
      log('read before balances');
      accountSnxBalances.push(parseFloat(ethers.utils.formatEther(await V2x.balanceOf(account))));
      accountDebtBalances.push(
        parseFloat(
          ethers.utils.formatEther(
            await V2x.debtBalanceOf(account, ethers.utils.formatBytes32String('sUSD'))
          )
        )
      );
    }
    snapshot = await provider.send('evm_snapshot', []);
  });

  it('should migrate some really big accounts', async () => {
    let accountId = 80800;
    for (const account of accounts) {
      log('migrate account', account);
      const wallet = provider.getSigner(await LegacyMarketProxy.owner());
      await migrateLegacyMarket({ account, toAccountId: accountId++, wallet });
    }
  });

  it('should have nothing left on v2x', async () => {
    for (const account of accounts) {
      assert.equal(parseFloat(ethers.utils.formatEther(await V2x.balanceOf(account))), 0);
      assert.equal(
        parseFloat(
          ethers.utils.formatEther(
            await V2x.debtBalanceOf(account, ethers.utils.formatBytes32String('sUSD'))
          )
        ),
        0
      );
    }
  });

  it('the really big accounts should have the same debts as before', async () => {
    for (const [i] of accounts.entries()) {
      assert.deepEqual(
        (await getLpPosition({ accountId: 80800 + i, poolId: 1, symbol: 'SNX' })).debt,
        accountDebtBalances[i]
      );
    }
  });

  it('the really big accounts should have the same collaterals as before', async () => {
    for (const [i] of accounts.entries()) {
      const accountInfo = await getAccountCollateral({ accountId: 80800 + i, symbol: 'SNX' });
      assert.deepEqual(accountInfo.totalAssigned, accountInfo.totalDeposited);
      // here we just assert that we have more than enough deposited. calculating the actual amount expected would required reading into rewardescrow and doing some complicated stuff to figure out already vested amounts and etc.
      assert(accountInfo.totalDeposited - accountInfo.totalLocked > accountSnxBalances[i]);
    }
  });

  after('restore snapshot', async () => {
    await provider.send('evm_revert', [snapshot]);
  });
};

describe('LegacyMarket', function () {
  this.timeout(1800000);
  run();
});
