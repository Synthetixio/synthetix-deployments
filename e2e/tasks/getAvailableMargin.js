#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getAvailableMargin({ accountId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );

  const availableMargin = await PerpsMarketProxy.getAvailableMargin(accountId).catch(parseError);
  log({ availableMargin });
  return parseFloat(ethers.utils.formatUnits(availableMargin));
}

module.exports = {
  getAvailableMargin,
};

if (require.main === module) {
  require('../inspect');
  const [accountId] = process.argv.slice(2);
  getAvailableMargin({ accountId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
