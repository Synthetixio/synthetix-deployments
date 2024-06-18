#!/usr/bin/env node

const { ethers } = require('ethers');
const { doPriceUpdateForPyth } = require('./doPriceUpdateForPyth');
const { syncTime } = require('./syncTime');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const splitIntoChunks = (array, chunkSize) => {
  let chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

async function doAllPriceUpdates({ wallet }) {
  const extras = require('../deployments/extras.json');

  // We must sync timestamp of the fork before making price updates
  await syncTime();

  const priceVerificationContract =
    require('../deployments/extras.json').pyth_price_verification_address;
  const feedIds = Object.entries(extras)
    .filter(
      ([key]) =>
        key.startsWith('pyth_feed_id_') || (key.startsWith('pyth') && key.endsWith('FeedId'))
    )
    .map(([_key, value]) => value);
  log({ feeds: feedIds.length, feedIds });
  const batches = splitIntoChunks(feedIds, 50);

  for (const batch of batches) {
    await doPriceUpdateForPyth({ wallet, feedId: batch, priceVerificationContract });
  }
}

module.exports = {
  doAllPriceUpdates,
};

if (require.main === module) {
  require('../inspect');
  const [pk] = process.argv.slice(2);
  if (!pk) {
    const bin = `./${require('path').basename(__filename)}`;
    throw new Error(
      [
        //
        'Usage:',
        `  ${bin} $PK`,
        '',
      ].join('\n')
    );
  }
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);
  doAllPriceUpdates({
    wallet,
  }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
