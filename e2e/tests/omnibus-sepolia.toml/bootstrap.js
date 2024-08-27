const { ethers } = require('ethers');
require('../../inspect');

Promise.resolve()
  //
  .then(() => {
    const extras = require('../../deployments/extras.json');
    const { ensurePoolConfiguration } = require('../../ensurePoolConfiguration');
    return ensurePoolConfiguration([
      {
        marketId: extras.legacy_market_id,
        weightD18: 99,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.synth_usde_market_id,
        weightD18: 1,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
    ]);
  });
