const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

function extractSynthMarkets() {
  const extras = require('../../deployments/extras.json');
  const synthMarkets = Object.fromEntries(
    Object.entries(extras)
      .filter(([key]) => key.startsWith('synth_') && key.endsWith('_market_id'))
      .map(([key, value]) => {
        const symbol = key.replace('synth_', '').replace('_market_id', '');
        return [symbol, parseInt(value)];
      })
  );
  log({ synthMarkets });
  return synthMarkets;
}

module.exports = {
  extractSynthMarkets,
};
