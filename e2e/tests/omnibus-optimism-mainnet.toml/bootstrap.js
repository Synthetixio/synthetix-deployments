const { ethers } = require('ethers');
require('../../inspect');

Promise.resolve()
  //
  .then(() => {
    const extras = require('../../deployments/extras.json');
    const { ensurePoolConfiguration } = require('../../ensurePoolConfiguration');
    return ensurePoolConfiguration([
      {
        marketId: extras.synth_eth_market_id,
        weightD18: 1,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
    ]);
  });
