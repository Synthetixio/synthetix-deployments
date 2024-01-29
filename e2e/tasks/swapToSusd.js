#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function swapToSusd({ wallet, marketId, amount }) {
  log({ address: wallet.address, marketId, amount });
  const SpotMarketProxy = new ethers.Contract(
    require('../deployments/SpotMarketProxy.json').address,
    require('../deployments/SpotMarketProxy.json').abi,
    wallet
  );

  const args = [
    ethers.BigNumber.from(marketId), // uint128 marketId
    ethers.utils.parseEther(`${amount}`), // uint256 synthAmount
    ethers.utils.parseEther(`${amount}`), // uint256 minUsdAmount (0% slippage!)
    ethers.constants.AddressZero, // address referrer
  ];
  const gasLimit = await SpotMarketProxy.estimateGas.sell(...args).catch(parseError);
  const tx = await SpotMarketProxy.sell(...args, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn) || txn, parseError)
    .then(gasLog({ action: 'SpotMarketProxy.sell', log }));
}

module.exports = {
  swapToSusd,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, marketId, amount] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  swapToSusd({ wallet, marketId, amount }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
