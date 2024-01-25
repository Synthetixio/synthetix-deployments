#!/usr/bin/env node

const { ethers } = require('ethers');

async function getDefaultStalenessTolerance({ marketId }) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const PerpsMarketProxy = new ethers.Contract(
    require('../deployments/PerpsMarketProxy.json').address,
    require('../deployments/PerpsMarketProxy.json').abi,
    provider
  );
  const OracleManagerProxy = new ethers.Contract(
    require('../deployments/OracleManagerProxy.json').address,
    require('../deployments/OracleManagerProxy.json').abi,
    provider
  );

  const { feedId } = await PerpsMarketProxy.getPriceData(marketId);
  const { parameters } = await OracleManagerProxy.getNode(feedId);
  const [decoded] = ethers.utils.defaultAbiCoder.decode(['uint256'], parameters);
  return parseFloat(decoded.toString());
}

module.exports = {
  getDefaultStalenessTolerance,
};

if (require.main === module) {
  const [marketId] = process.argv.slice(2);
  if (!marketId) {
    const bin = `./${require('path').basename(__filename)}`;
    throw new Error(
      [
        //
        'Usage:',
        `  ${bin} marketId`,
        'Example (for BTC):',
        `  ${bin} 200 `,
        '',
      ].join('\n')
    );
  }
  getDefaultStalenessTolerance({ marketId }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
