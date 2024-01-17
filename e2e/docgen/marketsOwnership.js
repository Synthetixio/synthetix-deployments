const { ethers } = require('ethers');
const { addrLink } = require('./lib/addrLink');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const MARKET_IDS = [
  // We cannot get the list of markets from contract, can only hardcode it
  1,
];

async function marketsOwnership() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { chainId } = await provider.getNetwork();

  const out = [];
  out.push('## Markets ownership');
  out.push('');

  out.push('| Market ID | Market name | Owner | Nominated owner |');
  out.push('| --- | --- | --- | --- |');

  const SpotMarketProxyDeployment = require('../deployments/SpotMarketProxy.json');

  const SpotMarketProxy = new ethers.Contract(
    SpotMarketProxyDeployment.address,
    SpotMarketProxyDeployment.abi,
    provider
  );
  const markets = await Promise.all(
    MARKET_IDS.map(async (marketId) => {
      const [name, owner, nominatedOwner] = await Promise.all([
        SpotMarketProxy.name(marketId),
        SpotMarketProxy.getMarketOwner(marketId),
        // TODO: enable when we have contract view function
        // SpotMarketProxy.getNominatedMarketOwner(marketId),
        Promise.resolve(ethers.constants.AddressZero),
      ]);
      return { marketId, name, owner, nominatedOwner };
    })
  );
  log({ markets });
  for (const { marketId, name, owner, nominatedOwner } of markets) {
    out.push(
      `| ${[
        marketId,
        name,
        owner === ethers.constants.AddressZero ? 'n/a' : addrLink(chainId, owner),
        nominatedOwner === ethers.constants.AddressZero ? 'n/a' : addrLink(chainId, nominatedOwner),
      ].join(' | ')} |`
    );
  }

  out.push('');
  out.push('');
  return out.join('\n');
}

module.exports = {
  marketsOwnership,
};
