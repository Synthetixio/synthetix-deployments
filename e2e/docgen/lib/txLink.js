const { extractChain } = require('viem');
const chains = require('viem/chains');

function txLink(chainId, address) {
  const chain = extractChain({ chains: Object.values(chains), id: Number(chainId) });
  return `[${address}](${chain.blockExplorers.default.url}/tx/${address})`;
}

function txHtmlLink(chainId, address) {
  const chain = extractChain({ chains: Object.values(chains), id: Number(chainId) });
  return `<a href="${chain.blockExplorers.default.url}/tx/${address}"><code>${address}</code></a>`;
}

module.exports = {
  txLink,
  txHtmlLink,
};
