#!/usr/bin/env node

const { ethers } = require('ethers');
const { setEthBalance } = require('./setEthBalance');
const { getCollateralConfig } = require('./getCollateralConfig');
const SpotMarketProxyDeployment = require('../deployments/SpotMarketProxy.json');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function setSpotWrapper({ marketId, symbol, targetAmount }) {
  const config = await getCollateralConfig(symbol);
  log({
    marketId,
    symbol,
    tokenAddress: config.tokenAddress,
    targetAmount,
  });

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const SpotMarketProxy = new ethers.Contract(
    SpotMarketProxyDeployment.address,
    SpotMarketProxyDeployment.abi,
    provider
  );

  const owner = await SpotMarketProxy.getMarketOwner(marketId);
  const signer = provider.getSigner(owner);
  log({ owner });

  await setEthBalance({ address: owner, balance: 1000 });

  await provider.send('anvil_impersonateAccount', [owner]);

  const args = [
    //
    marketId,
    config.tokenAddress,
    ethers.utils.parseEther(`${targetAmount}`),
  ];
  const gasLimit = await SpotMarketProxy.connect(signer)
    .estimateGas.setWrapper(...args)
    .catch(parseError);
  const tx = await SpotMarketProxy.connect(signer)
    .setWrapper(...args, { gasLimit: gasLimit.mul(2) })
    .catch(parseError);
  await tx.wait().then(log).catch(parseError);
  await provider.send('anvil_stopImpersonatingAccount', [owner]);
}

module.exports = {
  setSpotWrapper,
};

if (require.main === module) {
  require('../inspect');
  const [marketId, symbol, targetAmount] = process.argv.slice(2);
  setSpotWrapper({ marketId, symbol, targetAmount }).then(console.log);
}
