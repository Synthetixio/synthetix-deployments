#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function getCanLiquidate({ accountId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );

  const canLiquidate = await PerpsMarketProxy.canLiquidate(accountId).catch(parseError);
  log({ canLiquidate });
  return canLiquidate;
}

module.exports = {
  getCanLiquidate,
};

if (require.main === module) {
  require('../inspect');
  const [accountId] = process.argv.slice(2);
  getCanLiquidate({ accountId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
