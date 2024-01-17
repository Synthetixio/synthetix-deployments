const { ethers } = require('ethers');
const { addrLink } = require('./lib/addrLink');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

async function contractsOwnership() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const { chainId } = await provider.getNetwork();

  const out = [];
  out.push('## Contracts ownership');
  out.push('');

  out.push('| System  | Owner | Nominated owner |');
  out.push('| --- | --- | --- |');

  const meta = require('../deployments/meta.json');
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

module.exports = {
  contractsOwnership,
};
