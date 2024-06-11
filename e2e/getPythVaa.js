const { EvmPriceServiceConnection } = require('@pythnetwork/pyth-evm-js');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const PYTH_MAINNET_ENDPOINT = 'https://hermes.pyth.network';
const priceService = new EvmPriceServiceConnection(PYTH_MAINNET_ENDPOINT);

function base64ToHex(str) {
  const raw = Buffer.from(str, 'base64');
  return '0x' + raw.toString('hex');
}

async function getPythVaa({ pythPriceFeedId, timestamp }) {
  log({ pythPriceFeedId, timestamp });

  const [priceUpdateData] = await priceService.getVaa(pythPriceFeedId, timestamp);
  return base64ToHex(priceUpdateData);
}

module.exports = {
  getPythVaa,
};
