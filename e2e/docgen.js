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

async function ownership() {
  const log = require('debug')('e2e:ownership');
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { chainId } = await provider.getNetwork();

  const out = [];

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

    ethers.constants.AddressZero;
    log({ name, address, owner, nominatedOwner });
    out.push(
      `| ${[
        name,
        owner === ethers.constants.AddressZero ? 'n/a' : addrLink(chainId, owner),
        nominatedOwner === ethers.constants.AddressZero ? 'n/a' : addrLink(chainId, nominatedOwner),
      ].join(' | ')} |`
    );
  }
  return out.join('\n');
}

async function run() {
  const out = [];
  out.push(await ownership());
  return out.join('\n');
}

run().then(prettyMd).then(console.log);
