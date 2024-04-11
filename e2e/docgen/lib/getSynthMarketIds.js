function getSynthMarketIds() {
  const settings = require('../../deployments/settings.json');

  return [
    // We cannot get the list of markets from contract, can only hardcode it
    settings.synth_btc_market_id,
    settings.synth_eth_market_id,
    settings.synth_snx_market_id,
    settings.synth_usdc_market_id,
    settings.synth_op_market_id,
    settings.synth_link_market_id,
  ].filter(Boolean);
}

function getSettlementStrategyId(synthMarketId) {
  const settings = require('../../deployments/settings.json');
  switch (synthMarketId) {
    case settings.synth_btc_market_id:
      return settings.synth_btc_settlement_strategy;
    case settings.synth_eth_market_id:
      return settings.synth_eth_settlement_strategy;
    case settings.synth_snx_market_id:
      return settings.synth_snx_settlement_strategy;
    case settings.synth_usdc_market_id:
      return settings.synth_usdc_settlement_strategy;
    case settings.synth_op_market_id:
      return settings.synth_op_settlement_strategy;
    case settings.synth_link_market_id:
      return settings.synth_link_settlement_strategy;
  }
}

module.exports = {
  getSynthMarketIds,
  getSettlementStrategyId,
};
