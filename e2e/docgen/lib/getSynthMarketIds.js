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

module.exports = {
  getSynthMarketIds,
};
