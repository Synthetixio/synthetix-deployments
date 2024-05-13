#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function spotSell({
  wallet,
  marketId,
  synthAmount,
  minUsdAmount,
  referrer = ethers.constants.AddressZero,
}) {
  log({ address: wallet.address, marketId, synthAmount, minUsdAmount });
  const SpotMarketProxy = new ethers.Contract(
    require('../deployments/SpotMarketProxy.json').address,
    require('../deployments/SpotMarketProxy.json').abi,
    wallet
  );

  const args = [
    ethers.BigNumber.from(marketId),
    ethers.utils.parseEther(`${synthAmount}`),
    ethers.utils.parseEther(`${minUsdAmount}`),
    referrer,
  ];
  const gasLimit = await SpotMarketProxy.estimateGas.sell(...args).catch(parseError);
  const tx = await SpotMarketProxy.sell(...args, { gasLimit: gasLimit.mul(2) }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'SpotMarketProxy.sell', log }));
}

module.exports = {
  spotSell,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, marketId, synthAmount, minUsdAmount, referrer] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  spotSell({ wallet, marketId, synthAmount, minUsdAmount, referrer }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
