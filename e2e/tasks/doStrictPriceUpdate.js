#!/usr/bin/env node

const { ethers } = require('ethers');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { getPythVaa } = require('../getPythVaa');
const { getPerpsSettlementStrategy } = require('./getPerpsSettlementStrategy');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
  'function oracleId() view external returns (bytes32)',
  'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
];

async function doStrictPriceUpdate({ wallet, marketId, settlementStrategyId, commitmentTime }) {
  const { feedId, priceVerificationContract, commitmentPriceDelay } =
    await getPerpsSettlementStrategy({ marketId, settlementStrategyId });

  const timestamp = commitmentTime + commitmentPriceDelay.toNumber();

  log({
    marketId,
    feedId,
    priceVerificationContract,
    commitmentPriceDelay,
    timestamp: new Date(timestamp * 1000),
    now: new Date(),
  });

  const offchainData = await getPythVaa({ pythPriceFeedId: feedId, timestamp });

  const UPDATE_TYPE = 2;
  const offchainDataEncoded = ethers.utils.defaultAbiCoder.encode(
    ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
    [UPDATE_TYPE, timestamp, [feedId], [offchainData]]
  );

  const PythContract = new ethers.Contract(
    require('../deployments/extras.json').pyth_price_verification_address ||
      require('../deployments/extras.json').pythPriceVerificationAddress,
    ['function singleUpdateFeeInWei() view external returns (uint256)'],
    wallet
  );
  const singleFeeAmount = await PythContract.singleUpdateFeeInWei();

  const PriceVerificationContract = new ethers.Contract(
    priceVerificationContract,
    ERC7412_ABI,
    wallet
  );

  const tx = await PriceVerificationContract.fulfillOracleQuery(offchainDataEncoded, {
    value: ethers.BigNumber.from(singleFeeAmount), // 1 wei,
  }).catch(parseError);
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, parseError)
    .then(gasLog({ action: 'PriceVerificationContract.fulfillOracleQuery', log }));

  log({ marketId, feedId, updated: true });
}

module.exports = {
  doStrictPriceUpdate,
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
  doStrictPriceUpdate({
    wallet,
    marketId,
    settlementStrategyId,
    commitmentTime: Date.now(),
  }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
