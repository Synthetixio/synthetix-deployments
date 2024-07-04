#!/usr/bin/env node

const { EvmPriceServiceConnection } = require('@pythnetwork/pyth-evm-js');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const PYTH_MAINNET_ENDPOINT = process.env.PYTH_MAINNET_ENDPOINT || 'https://hermes.pyth.network';

async function getPythPrice({ feedId }) {
  const priceService = new EvmPriceServiceConnection(PYTH_MAINNET_ENDPOINT);
  const feeds = await priceService.getLatestPriceFeeds([feedId]);
  log({ feedId });
  if (!feeds || feeds.length !== 1) {
    throw Error(`Price feed not found, feed id: ${feedId}`);
  }
  const [feed] = feeds;
  const uncheckedPrice = feed.getPriceUnchecked();
  const price = uncheckedPrice.getPriceAsNumberUnchecked();
  log({ feedId, price });
  return price;
}

module.exports = {
  getPythPrice,
};

if (require.main === module) {
  require('../inspect');
  const [feedId] = process.argv.slice(2);
  getPythPrice({ feedId }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
