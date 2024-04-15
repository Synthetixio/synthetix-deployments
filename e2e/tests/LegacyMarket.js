const { migrateLegacyMarket } = require('../tasks/migrateLegacyMarket');
const { ethers } = require('ethers');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

exports.run = function () {
  let LegacyMarketProxy;
  let CoreProxy;

  it('should migrate some really big accounts', async () => {
    // some big wallets
    // https://etherscan.io/token/0x89FCb32F29e509cc42d0C8b6f058C993013A843F#balances
    const accounts = [
      '0x99F4176EE457afedFfCB1839c7aB7A030a5e4A92',
      '0x8cA24021E3Ee3B5c241BBfcee0712554D7Dc38a1',
      '0x27Cc4d6bc95b55a3a981BF1F1c7261CDa7bB0931',
      '0xcb68110C43C97b6051FEd5e2Bacc2814aDaD1688',
      '0x722f0a6F970F8B144F5e92aB3f3BeaFA280b282f',
    ];

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

    for (const account of accounts) {
      log('migrate account', account);
      const wallet = provider.getSigner(await LegacyMarketProxy.owner());
      await migrateLegacyMarket({ account, toAccountId, wallet });
    }
  });

  it('the really big accounts should have the same debts as before', async () => {});

  it('the really big accounts should have the same collaterals as before', async () => {});
};
