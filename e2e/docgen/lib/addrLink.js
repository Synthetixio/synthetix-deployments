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

function addrHtmlLink(chainId, address) {
  switch (chainId) {
    case 1:
      return `<a href="https://etherscan.io/address/${address}"><code>${address}</code></a>`;
    case 5:
      return `<a href="https://goerli.etherscan.io/address/${address}"><code>${address}</code></a>`;
    case 11155111:
      return `<a href="https://sepolia.etherscan.io/address/${address}"><code>${address}</code></a>`;
    case 10:
      return `<a href="https://optimistic.etherscan.io/address/${address}"><code>${address}</code></a>`;
    case 420:
      return `<a href="https://goerli-optimism.etherscan.io/address/${address}"><code>${address}</code></a>`;
    case 80001:
      return `<a href="https://mumbai.polygonscan.com/address/${address}"><code>${address}</code></a>`;
    case 8453:
      return `<a href="https://basescan.org/address/${address}"><code>${address}</code></a>`;
    case 84531:
      return `<a href="https://goerli.basescan.org/address/${address}"><code>${address}</code></a>`;
    case 84532:
      return `<a href="https://sepolia.basescan.org/address/${address}"><code>${address}</code></a>`;
  }
}

module.exports = {
  addrLink,
  addrHtmlLink,
};
