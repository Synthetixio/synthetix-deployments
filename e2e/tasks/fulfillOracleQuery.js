#!/usr/bin/env node

const { ethers } = require('ethers');
const { EvmPriceServiceConnection } = require('@pythnetwork/pyth-evm-js');
const { parseError } = require('../parseError');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const PYTH_MAINNET_ENDPOINT = 'https://hermes.pyth.network';

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

function base64ToHex(str) {
  const raw = Buffer.from(str, 'base64');
  return '0x' + raw.toString('hex');
}

async function fulfillOracleQuery({
  wallet,
  priceVerificationContractAddress,
  oracleFeedId,
  timestamp,
}) {
  log({ oracleFeedId });
  const [offchainData] = await priceService.getVaa(oracleFeedId, timestamp);
  const UPDATE_TYPE = 2;
  const offchainDataEncoded = ethers.utils.defaultAbiCoder.encode(
    ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
    [UPDATE_TYPE, timestamp, [oracleFeedId], [base64ToHex(offchainData)]]
  );

  const PriceVerificationContract = new ethers.Contract(
    priceVerificationContractAddress,
    ERC7412_ABI,
    wallet
  );
  try {
    const tx = await PriceVerificationContract.fulfillOracleQuery(offchainDataEncoded, {
      value: ethers.BigNumber.from(1), // 1 wei,
    });
    await tx.wait();
  } catch (error) {
    parseError(error);
  }

  log({ oracleFeedId, updated: true });
}

module.exports = {
  getPrice,
  fulfillOracleQuery,
};

if (require.main === module) {
  const [pk, symbol] = process.argv.slice(2);
  if (!pk || !symbol) {
    const bin = `./${require('path').basename(__filename)}`;
    throw new Error(
      [
        'Usage:',
        `  ${bin} pk symbol`,
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
  fulfillOracleQuery({ wallet, symbol }).then(console.log);
}
