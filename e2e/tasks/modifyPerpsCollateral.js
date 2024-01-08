#!/usr/bin/env node

const { ethers } = require('ethers');
const { getPerpsCollateral } = require('./getPerpsCollateral');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function modifyPerpsCollateral({ wallet, accountId, deltaAmount }) {
  const sUSDMarketId = 0;

  const oldAmount = await getPerpsCollateral({ accountId });

  log({ address: wallet.address, accountId, deltaAmount, oldAmount });

  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    wallet
  );

  const args = [
    //
    accountId,
    sUSDMarketId,
    ethers.utils.parseEther(`${deltaAmount}`),
  ];
  const gasLimit = await PerpsMarketProxy.estimateGas.modifyCollateral(...args).catch(parseError);
  const tx = await PerpsMarketProxy.modifyCollateral(...args, { gasLimit: gasLimit.mul(2) }).catch(
    parseError
  );
  await tx.wait().catch(parseError);

  const currentAmount = await getPerpsCollateral({ accountId });
  log({ address: wallet.address, accountId, deltaAmount, currentAmount });
}

module.exports = {
  modifyPerpsCollateral,
};

if (require.main === module) {
  require('../inspect');
  const [privateKey, accountId, deltaAmount] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(privateKey, provider);
  modifyPerpsCollateral({ wallet, accountId, deltaAmount }).then(console.log);
}
