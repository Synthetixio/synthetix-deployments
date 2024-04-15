const { migrateLegacyMarket } = require('../tasks/migrateLegacyMarket');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

exports.run = function () {
  it('should migrate all remaining accounts', async () => {
    await migrateLegacyMarket({ address, balance: 100 });
  });
};
