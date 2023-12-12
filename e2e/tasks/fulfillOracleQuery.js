#!/usr/bin/env node

const { ethers } = require('ethers');
const { EvmPriceServiceConnection } = require('@pythnetwork/pyth-evm-js');
const oracles = require('../deployments/oracles.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const PYTH_MAINNET_ENDPOINT = 'https://xc-mainnet.pyth.network';
const PYTH_TESTNET_ENDPOINT = 'https://xc-testnet.pyth.network';

const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
  'function oracleId() view external returns (bytes32)',
  'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
];
const priceService = new EvmPriceServiceConnection(PYTH_MAINNET_ENDPOINT);

async function getPrice(feedId) {
  const priceFeed = await priceService.getLatestPriceFeeds([feedId]);
  if (priceFeed) {
    return priceFeed[0].getPriceUnchecked();
  }
  throw Error(`Price feed not found, feed id: ${feedId}`);
}
  const offchainDataEncoded = ethers.utils.defaultAbiCoder.encode(
    ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
    [1, oracle.staleness, [oracle.feedId], [offchainData]]
  );
  const OracleBTC = new ethers.Contract(oracle.address, ERC7412_ABI, wallet);

  const tx = await OracleBTC.fulfillOracleQuery(offchainDataEncoded, {
    value: ethers.BigNumber.from(1), // 1 wei,
    gasLimit: 10_000_000,
  });
  await tx.wait();
  log({ symbol, updated: true });
}

module.exports = {
  fulfillOracleQuery,
};

if (require.main === module) {
  const [pk, testnet, symbol] = process.argv.slice(2);
  if (!pk || !testnet || !symbol) {
    const bin = `./${require('path').basename(__filename)}`;
    throw new Error(
      [
        'Usage:',
        `  ${bin} pk testnet symbol`,
        'Example:',
        `  ${bin} 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 testnet BTC`,
        '',
      ].join('\n')
    );
  }
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);
  fulfillOracleQuery({ wallet, symbol, isTestnet: testnet === 'testnet' }).then(console.log);
}
