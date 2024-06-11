const { extractChain } = require('viem');
const chains = require('viem/chains');

function addrLink(chainId, address) {
  const chain = extractChain({ chains: Object.values(chains), id: Number(chainId) });
  return `[${address}](${chain.blockExplorers.default.url}/address/${address})`;
}

function addrHtmlLink(chainId, address) {
  const chain = extractChain({ chains: Object.values(chains), id: Number(chainId) });
  return `<a href="${chain.blockExplorers.default.url}/address/${address}"><code>${address}</code></a>`;
}

module.exports = {
  addrLink,
  addrHtmlLink,
};
