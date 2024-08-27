const { ethers } = require('ethers');
require('../../inspect');

Promise.resolve()
  //
  .then(() => {
    const extras = require('../../deployments/extras.json');
    const { ensurePoolConfiguration } = require('../../ensurePoolConfiguration');
    return ensurePoolConfiguration([
      {
        marketId: extras.synth_dai_market_id,
        weightD18: 1,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.synth_usdc_market_id,
        weightD18: 1,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.synth_btc_market_id,
        weightD18: 1,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.synth_eth_market_id,
        weightD18: 1,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.perps_super_market_id,
        weightD18: 98,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
    ]);
  });
