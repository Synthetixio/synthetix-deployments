const { ethers } = require('ethers');
require('../../inspect');

Promise.resolve()
  //
  .then(() => {
    const extras = require('../../deployments/extras.json');
    const { ensurePoolConfiguration } = require('../../ensurePoolConfiguration');
    return ensurePoolConfiguration([
      {
        marketId: extras.perps_super_market_id,
        weightD18: 50,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.synth_usdc_market_id,
        weightD18: 10,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.synth_btc_market_id,
        weightD18: 10,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.synth_eth_market_id,
        weightD18: 10,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.synth_usde_market_id,
        weightD18: 10,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.synth_sol_market_id,
        weightD18: 10,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
    ]);
  });
