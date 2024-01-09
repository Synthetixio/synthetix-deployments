#!/usr/bin/env node

const { ethers } = require('ethers');
const { EvmPriceServiceConnection } = require('@pythnetwork/pyth-evm-js');
const { parseError } = require('../parseError');
const { traceTxn } = require('../traceTxn');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const PYTH_MAINNET_ENDPOINT = 'https://hermes.pyth.network';

const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
  'function oracleId() view external returns (bytes32)',
  'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
];
const priceService = new EvmPriceServiceConnection(PYTH_MAINNET_ENDPOINT);

async function doPriceUpdateForFeed({ wallet, feedId, priceVerificationContract }) {
  log({ feedId, priceVerificationContract });
  const [offchainData] = await priceService.getPriceFeedsUpdateData([feedId]);
  const UPDATE_TYPE = 1;
  const stalenessTolerance = 10;

  log({ UPDATE_TYPE, stalenessTolerance, feedId, offchainData });

  const PriceVerificationContract = new ethers.Contract(
    priceVerificationContract,
    ERC7412_ABI,
    wallet
  );

  const args = [
    ethers.utils.defaultAbiCoder.encode(
      ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
      [UPDATE_TYPE, stalenessTolerance, [feedId], [offchainData]]
    ),
  ];

  const gasLimit = await PriceVerificationContract.estimateGas
    .fulfillOracleQuery(...args)
    .catch(parseError)
    .catch(() => ethers.BigNumber.from(10_000_000));
  const tx = await PriceVerificationContract.fulfillOracleQuery(...args, {
    gasLimit: gasLimit.mul(2),
    value: ethers.BigNumber.from(1), // 1 wei,
  });
  await tx
    .wait()
    .then(({ events }) => log({ events }))
    .catch(traceTxn(tx));
}

module.exports = {
  doPriceUpdateForFeed,
};

if (require.main === module) {
  require('../inspect');
  const [pk, feedId, priceVerificationContract] = process.argv.slice(2);
  if (!(pk && feedId && priceVerificationContract)) {
    const bin = `./${require('path').basename(__filename)}`;
    throw new Error(
      [
        //
        'Usage:',
        `  ${bin} $PK feedId priceVerificationContract`,
        '  Example (for BTC, Base Sepolia):',
        `    ${bin} $PK 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43 0xA2aa501b19aff244D90cc15a4Cf739D2725B5729`,
        '  Example (for ETH, Base Sepolia):',
        `    ${bin} $PK 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace 0xA2aa501b19aff244D90cc15a4Cf739D2725B5729`,
        '',
      ].join('\n')
    );
  }
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);
  doPriceUpdateForFeed({ wallet, feedId, priceVerificationContract }).then(log);
}
