const { ethers } = require('ethers');
const prettier = require('prettier');

const prettierOptions = {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'es5',
};

async function prettyJson(obj) {
  return await prettier.format(JSON.stringify(obj, null, 2), {
    parser: 'json',
    ...prettierOptions,
  });
}

async function prettyMd(md) {
  return await prettier.format(md, { parser: 'markdown', ...prettierOptions });
}

function addrLink(chainId, address) {
  switch (chainId) {
    case 1:
      return `[${address}](https://etherscan.io/address/${address})`;
    case 5:
      return `[${address}](https://goerli.etherscan.io/address/${address})`;
    case 11155111:
      return `[${address}](https://sepolia.etherscan.io/address/${address})`;
    case 10:
      return `[${address}](https://optimistic.etherscan.io/address/${address})`;
    case 420:
      return `[${address}](https://goerli-optimism.etherscan.io/address/${address})`;
    case 80001:
      return `[${address}](https://mumbai.polygonscan.com/address/${address})`;
    case 8453:
      return `[${address}](https://basescan.org/address/${address})`;
    case 84531:
      return `[${address}](https://goerli.basescan.org/address/${address})`;
    case 84532:
      return `[${address}](https://sepolia.basescan.org/address/${address})`;
  }
}

async function contractsOwnership() {
  const log = require('debug')('e2e:contractsOwnership');
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { chainId } = await provider.getNetwork();

  const out = [];
  out.push('## Contracts ownership');
  out.push('');

  out.push('| System  | Owner | Nominated owner |');
  out.push('| --- | --- | --- |');

  const meta = require('./deployments/meta.json');
  const abi = [
    'function owner() view returns (address)',
    'function nominatedOwner() view returns (address)',
  ];
  for (const [name, address] of Object.entries(meta.contracts)) {
    const Contract = new ethers.Contract(address, abi, provider);
    const [owner, nominatedOwner] = await Promise.all([
      Contract.owner().catch(() => ethers.constants.AddressZero),
      Contract.nominatedOwner().catch(() => ethers.constants.AddressZero),
    ]);
    log({ name, address, owner, nominatedOwner });
    out.push(
      `| ${[
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

async function poolsOwnership() {
  const log = require('debug')('e2e:poolsOwnership');
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { chainId } = await provider.getNetwork();

  const out = [];
  out.push('## Pools ownership');
  out.push('');

  out.push('| Pool ID | Pool name | Preferred | Owner | Nominated owner |');
  out.push('| --- | --- | --- | --- | --- |');

  const CoreProxyDeployment = require('./deployments/CoreProxy.json');

  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    provider
  );
  const [approvedPools, preferredPool] = await Promise.all([
    CoreProxy.getApprovedPools().then((ids) => ids.map((id) => id.toNumber())),
    CoreProxy.getPreferredPool().then((id) => id.toNumber()),
  ]);
  log({ approvedPools, preferredPool });
  const pools = await Promise.all(
    [{ poolId: preferredPool, isPreferred: true }]
      .concat(approvedPools.map((poolId) => ({ poolId, isPreferred: false })))
      .map(async ({ poolId, isPreferred }) => {
        const [name, owner, nominatedOwner] = await Promise.all([
          CoreProxy.getPoolName(poolId),
          CoreProxy.getPoolOwner(poolId),
          CoreProxy.getNominatedPoolOwner(poolId),
        ]);
        return { poolId, name, isPreferred, owner, nominatedOwner };
      })
  );
  log({ pools });
  for (const { poolId, name, isPreferred, owner, nominatedOwner } of pools) {
    out.push(
      `| ${[
        poolId,
        name,
        isPreferred ? '✅' : '',
        owner === ethers.constants.AddressZero ? 'n/a' : addrLink(chainId, owner),
        nominatedOwner === ethers.constants.AddressZero ? 'n/a' : addrLink(chainId, nominatedOwner),
      ].join(' | ')} |`
    );
  }

  out.push('');
  out.push('');

  return out.join('\n');
}

async function marketsOwnership() {
  const log = require('debug')('e2e:poolsOwnership');
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { chainId } = await provider.getNetwork();

  const MARKET_IDS = [1];

  const out = [];
  out.push('## Markets ownership');
  out.push('');

  out.push('| Market ID | Market name | Owner | Nominated owner |');
  out.push('| --- | --- | --- | --- |');

  const SpotMarketProxyDeployment = require('./deployments/SpotMarketProxy.json');

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

async function run() {
  const out = [];
  out.push(await contractsOwnership().catch(() => ''));
  out.push(await poolsOwnership().catch(() => ''));
  out.push(await marketsOwnership().catch(() => ''));
  return out.join('\n');
}

run().then(prettyMd).then(console.log);
