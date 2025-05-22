#!/usr/bin/env node

const { ethers } = require('ethers');
const { EvmPriceServiceConnection } = require('@pythnetwork/pyth-evm-js');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { getPerpsSettlementStrategy } = require('./getPerpsSettlementStrategy');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const PYTH_MAINNET_ENDPOINT = process.env.PYTH_MAINNET_ENDPOINT || 'https://hermes.pyth.network';

const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
  'function oracleId() view external returns (bytes32)',
  'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
  'function singleUpdateFeeInWei() view external returns (uint256)',
];
const priceService = new EvmPriceServiceConnection(PYTH_MAINNET_ENDPOINT);

async function doPriceUpdate({ wallet, marketId, settlementStrategyId }) {
  if (!settlementStrategyId) {
    log({ message: 'SKIP', marketId, settlementStrategyId });
    return;
  }

  const { feedId, priceVerificationContract } = await getPerpsSettlementStrategy({
    marketId,
    settlementStrategyId,
  });

  log({ marketId, feedId, priceVerificationContract });

  const [offchainData] = await priceService.getPriceFeedsUpdateData([feedId]);
  const UPDATE_TYPE = 1;
  const stalenessTolerance = 10;
  const offchainDataEncoded = ethers.utils.defaultAbiCoder.encode(
    ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
    [UPDATE_TYPE, stalenessTolerance, [feedId], [offchainData]]
  );

  const PriceVerificationContract = new ethers.Contract(
    priceVerificationContract,
    ERC7412_ABI,
    wallet
  );

  const PythContract = new ethers.Contract(
    require('../deployments/extras.json').pyth_price_verification_address ||
      require('../deployments/extras.json').pythPriceVerificationAddress,
    ['function singleUpdateFeeInWei() view external returns (uint256)'],
    wallet
  );
  const singleFeeAmount = await PythContract.singleUpdateFeeInWei();
  const tx = await PriceVerificationContract.fulfillOracleQuery(offchainDataEncoded, {
    value: ethers.BigNumber.from(singleFeeAmount),
  }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'PriceVerificationContract.fulfillOracleQuery', log }));

  log({ marketId, feedId, updated: true });
}

module.exports = {
  doPriceUpdate,
};

if (require.main === module) {
  require('../inspect');
  const [pk, marketId, settlementStrategyId] = process.argv.slice(2);
  if (!pk || !marketId || !settlementStrategyId) {
    const bin = `./${require('path').basename(__filename)}`;
    throw new Error(
      [
        //
        'Usage:',
        `  ${bin} $PK marketId settlementStrategyId`,
        'Example (for BTC):',
        `  ${bin} $PK 200 0`,
        '',
      ].join('\n')
    );
  }
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);
  doPriceUpdate({
    wallet,
    marketId,
    settlementStrategyId,
  }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
