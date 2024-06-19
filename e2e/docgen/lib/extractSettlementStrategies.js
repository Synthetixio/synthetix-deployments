const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

function extractSettlementStrategies() {
  const extras = require('../../deployments/extras.json');

  const settlementStrategies = Object.fromEntries(
    Object.entries(extras)
      .filter(([key]) => key.startsWith('synth_') && key.endsWith('_settlement_strategy'))
      .map(([key, value]) => {
        const symbol = key.replace('synth_', '').replace('_settlement_strategy', '');
        return [symbol, value];
      })
  );
  log({ settlementStrategies });

  return settlementStrategies;
}

module.exports = {
  extractSettlementStrategies,
};
