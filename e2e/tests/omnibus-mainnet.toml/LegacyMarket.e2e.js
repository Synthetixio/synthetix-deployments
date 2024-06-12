const assert = require('assert');
const { migrateLegacyMarket } = require('../tasks/migrateLegacyMarket');
const { getLpPosition } = require('../tasks/getLpPosition');
const { getAccountCollateral } = require('../tasks/getAccountCollateral');
const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

exports.run = function () {
  let LegacyMarketProxy;
  let CoreProxy;
  let V2xSnx;

  // some big wallets
  // https://etherscan.io/token/0x89FCb32F29e509cc42d0C8b6f058C993013A843F#balances
  const accounts = [
    '0x99F4176EE457afedFfCB1839c7aB7A030a5e4A92',
    '0x8cA24021E3Ee3B5c241BBfcee0712554D7Dc38a1',
    '0x27Cc4d6bc95b55a3a981BF1F1c7261CDa7bB0931',
    '0xcb68110C43C97b6051FEd5e2Bacc2814aDaD1688',
    '0x722f0a6F970F8B144F5e92aB3f3BeaFA280b282f',
  ];

  const accountDebtBalances = [];
  const accountSnxBalances = [];

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  LegacyMarketProxy = new ethers.Contract(
    require('../deployments/LegacyMarketProxy.json').address,
    require('../deployments/LegacyMarketProxy.json').abi,
    provider
  );

  CoreProxy = new ethers.Contract(
    require('../deployments/CoreProxy.json').address,
    require('../deployments/CoreProxy.json').abi,
    provider
  );

  V2xSnx = new ethers.Contract(
    require('../deployments/V2xSnx.json').address,
    require('../deployments/V2xSnx.json').abi,
    provider
  );

  let snapshot;

  before('record before debts', async () => {
    for (const account of accounts) {
      log('read before balances');
      accountSnxBalances.push(
        parseFloat(ethers.utils.formatEther(await V2xSnx.balanceOf(account)))
      );
      accountDebtBalances.push(
        parseFloat(
          ethers.utils.formatEther(
            await V2xSnx.debtBalanceOf(account, ethers.utils.formatBytes32String('sUSD'))
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
      assert.equal(parseFloat(ethers.utils.formatEther(await V2xSnx.balanceOf(account))), 0);
      assert.equal(
        parseFloat(
          ethers.utils.formatEther(
            await V2xSnx.debtBalanceOf(account, ethers.utils.formatBytes32String('sUSD'))
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
