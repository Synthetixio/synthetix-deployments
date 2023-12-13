#!/usr/bin/env node

const { ethers } = require('ethers');
const { EvmPriceServiceConnection } = require('@pythnetwork/pyth-evm-js');
const { parseError } = require('../parseError');
const { getPerpsSettlementStrategy } = require('./getPerpsSettlementStrategy');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const PYTH_MAINNET_ENDPOINT = 'https://hermes.pyth.network';

const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
  'function oracleId() view external returns (bytes32)',
  'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
];
const priceService = new EvmPriceServiceConnection(PYTH_MAINNET_ENDPOINT);

function base64ToHex(str) {
  const raw = Buffer.from(str, 'base64');
  return '0x' + raw.toString('hex');
}

async function fulfillOracleQuery({ wallet, marketId, settlementStrategyId, commitmentTime }) {
  const { feedId, priceVerificationContract, commitmentPriceDelay } =
    await getPerpsSettlementStrategy({ marketId, settlementStrategyId });

  log({ feedId, priceVerificationContract, commitmentPriceDelay });

  const timestamp = commitmentTime + commitmentPriceDelay.toNumber();
  const [offchainData] = await priceService.getVaa(feedId, timestamp);
  const UPDATE_TYPE = 2;
  const offchainDataEncoded = ethers.utils.defaultAbiCoder.encode(
    ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
    [UPDATE_TYPE, timestamp, [feedId], [base64ToHex(offchainData)]]
  );

  const PriceVerificationContract = new ethers.Contract(
    priceVerificationContract,
    ERC7412_ABI,
    wallet
  );

  const tx = await PriceVerificationContract.fulfillOracleQuery(offchainDataEncoded, {
    value: ethers.BigNumber.from(1), // 1 wei,
  }).catch(parseError);
  await tx.wait().catch(parseError);

  log({ feedId, updated: true });
}

module.exports = {
  fulfillOracleQuery,
};

if (require.main === module) {
  const [pk, marketId, settlementStrategyId] = process.argv.slice(2);
  if (!pk || !marketId || !settlementStrategyId) {
    const bin = `./${require('path').basename(__filename)}`;
    throw new Error(
      [
        //
        'Usage:',
        `  ${bin} pk marketId settlementStrategyId`,
        'Example (for BTC):',
        `  ${bin} pk 200 0`,
        '',
      ].join('\n')
    );
  }
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);
  fulfillOracleQuery({
    wallet,
    marketId,
    settlementStrategyId,
    commitmentTime: Date.now(),
  }).then(console.log);
}
