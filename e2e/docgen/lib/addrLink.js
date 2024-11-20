const { extractChain } = require('viem');
const chains = require('viem/chains');

function url(chainId, address) {
  const chain = extractChain({ chains: Object.values(chains), id: Number(chainId) });
  if (!chain) {
    throw new Error(`Incorrect chainId: ${chainId}`);
  }
  return `${chain.blockExplorers.default.url}/address/${address}`;
}

function addrLink(chainId, address) {
  if (!(chainId && address)) {
    return 'n/a';
  }
  return `[${address}](${url(chainId, address)})`;
}

function addrHtmlLink(chainId, address) {
  if (!(chainId && address)) {
    return 'n/a';
  }
  return `<a href="${url(chainId, address)}"><code>${address}</code></a>`;
}

module.exports = {
  addrLink,
  addrHtmlLink,
};
