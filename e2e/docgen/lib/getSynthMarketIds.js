function getSynthMarketIds() {
  const extras = require('../../deployments/extras.json');

  return [
    // We cannot get the list of markets from contract, can only hardcode it
    extras.synth_btc_market_id,
    extras.synth_eth_market_id,
    extras.synth_snx_market_id,
    extras.synth_usdc_market_id,
    extras.synth_op_market_id,
    extras.synth_link_market_id,
  ].filter(Boolean);
}

function getSettlementStrategyId(synthMarketId) {
  const extras = require('../../deployments/extras.json');
  switch (synthMarketId) {
    case extras.synth_btc_market_id:
      return extras.synth_btc_settlement_strategy;
    case extras.synth_eth_market_id:
      return extras.synth_eth_settlement_strategy;
    case extras.synth_snx_market_id:
      return extras.synth_snx_settlement_strategy;
    case extras.synth_usdc_market_id:
      return extras.synth_usdc_settlement_strategy;
    case extras.synth_op_market_id:
      return extras.synth_op_settlement_strategy;
    case extras.synth_link_market_id:
      return extras.synth_link_settlement_strategy;
  }
}

module.exports = {
  getSynthMarketIds,
  getSettlementStrategyId,
};
