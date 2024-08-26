#!/usr/bin/env node

const { contractRead } = require('./contractRead');
const { contractWrite } = require('./contractWrite');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function liquidate({ wallet, accountId }) {
  log({ accountId });
  return await contractWrite({
    wallet,
    contract: 'PerpsMarketProxy',
    func: 'liquidate',
    args: [accountId],
    impersonate: await contractRead({
      wallet,
      contract: 'PerpsMarketProxy',
      func: 'owner',
    }),
  });
}

module.exports = {
  liquidate,
};
