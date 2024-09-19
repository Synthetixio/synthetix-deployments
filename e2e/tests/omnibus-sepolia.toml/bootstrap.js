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
        weightD18: 70,
        maxDebtShareValueD18: ethers.utils.parseEther('3'),
      },
      {
        marketId: extras.synth_usde_market_id,
        weightD18: 1,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: '3', //old market, kept to avoid breaking the tests
        weightD18: 10,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
      {
        marketId: extras.eth_market_id,
        weightD18: 18,
        maxDebtShareValueD18: ethers.utils.parseEther('1'),
      },
    ]);
  });
