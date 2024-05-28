#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function spotBuy({
  wallet,
  marketId,
  usdAmount,
  minAmountReceived,
  referrer = ethers.constants.AddressZero,
}) {
  log({ address: wallet.address, marketId, usdAmount, minAmountReceived });
  const SpotMarketProxy = new ethers.Contract(
    require('../deployments/SpotMarketProxy.json').address,
    require('../deployments/SpotMarketProxy.json').abi,
    wallet
  );

  const args = [
    ethers.BigNumber.from(marketId),
    ethers.utils.parseEther(`${usdAmount}`),
    ethers.utils.parseEther(`${minAmountReceived}`),
    referrer,
  ];
  const gasLimit = await SpotMarketProxy.estimateGas.buy(...args).catch(parseError);
  const tx = await SpotMarketProxy.buy(...args, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'SpotMarketProxy.buy', log }));
}

module.exports = {
  spotBuy,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, marketId, usdAmount, minAmountReceived, referrer] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  spotBuy({ wallet, marketId, usdAmount, minAmountReceived, referrer }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
