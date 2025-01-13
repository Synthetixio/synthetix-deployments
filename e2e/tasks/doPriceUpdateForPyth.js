#!/usr/bin/env node

const { ethers } = require('ethers');
const { EvmPriceServiceConnection } = require('@pythnetwork/pyth-evm-js');
const { parseError } = require('../parseError');
const { gasLog } = require('../gasLog');
const { traceTxn } = require('../traceTxn');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const PYTH_MAINNET_ENDPOINT = process.env.PYTH_MAINNET_ENDPOINT || 'https://hermes.pyth.network';

const PYTH_ABI = [
  'constructor()',
  'error InsufficientFee()',
  'error InvalidArgument()',
  'error InvalidGovernanceDataSource()',
  'error InvalidGovernanceMessage()',
  'error InvalidGovernanceTarget()',
  'error InvalidUpdateData()',
  'error InvalidUpdateDataSource()',
  'error InvalidWormholeAddressToSet()',
  'error InvalidWormholeVaa()',
  'error NoFreshUpdate()',
  'error OldGovernanceMessage()',
  'error PriceFeedNotFound()',
  'error PriceFeedNotFoundWithinRange()',
  'error StalePrice()',
  'event AdminChanged(address previousAdmin, address newAdmin)',
  'event BatchPriceFeedUpdate(uint16 chainId, uint64 sequenceNumber)',
  'event BeaconUpgraded(address indexed beacon)',
  'event ContractUpgraded(address oldImplementation, address newImplementation)',
  'event DataSourcesSet(tuple(uint16 chainId, bytes32 emitterAddress)[] oldDataSources, tuple(uint16 chainId, bytes32 emitterAddress)[] newDataSources)',
  'event FeeSet(uint256 oldFee, uint256 newFee)',
  'event GovernanceDataSourceSet(tuple(uint16 chainId, bytes32 emitterAddress) oldDataSource, tuple(uint16 chainId, bytes32 emitterAddress) newDataSource, uint64 initialSequence)',
  'event Initialized(uint8 version)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event PriceFeedUpdate(bytes32 indexed id, uint64 publishTime, int64 price, uint64 conf)',
  'event Upgraded(address indexed implementation)',
  'event ValidPeriodSet(uint256 oldValidPeriod, uint256 newValidPeriod)',
  'event WormholeAddressSet(address oldWormholeAddress, address newWormholeAddress)',
  'function chainId() view returns (uint16)',
  'function executeGovernanceInstruction(bytes encodedVM)',
  'function getEmaPrice(bytes32 id) view returns (tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) price)',
  'function getEmaPriceNoOlderThan(bytes32 id, uint256 age) view returns (tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) price)',
  'function getEmaPriceUnsafe(bytes32 id) view returns (tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) price)',
  'function getPrice(bytes32 id) view returns (tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) price)',
  'function getPriceNoOlderThan(bytes32 id, uint256 age) view returns (tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) price)',
  'function getPriceUnsafe(bytes32 id) view returns (tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) price)',
  'function getUpdateFee(bytes[] updateData) view returns (uint256 feeAmount)',
  'function getUpdateFee(uint256 updateDataSize) view returns (uint256 feeAmount)',
  'function getValidTimePeriod() view returns (uint256)',
  'function governanceDataSource() view returns (tuple(uint16 chainId, bytes32 emitterAddress))',
  'function governanceDataSourceIndex() view returns (uint32)',
  'function hashDataSource(tuple(uint16 chainId, bytes32 emitterAddress) ds) pure returns (bytes32)',
  'function initialize(address wormhole, uint16[] dataSourceEmitterChainIds, bytes32[] dataSourceEmitterAddresses, uint16 governanceEmitterChainId, bytes32 governanceEmitterAddress, uint64 governanceInitialSequence, uint256 validTimePeriodSeconds, uint256 singleUpdateFeeInWei)',
  'function isValidDataSource(uint16 dataSourceChainId, bytes32 dataSourceEmitterAddress) view returns (bool)',
  'function isValidGovernanceDataSource(uint16 governanceChainId, bytes32 governanceEmitterAddress) view returns (bool)',
  'function lastExecutedGovernanceSequence() view returns (uint64)',
  'function latestPriceInfoPublishTime(bytes32 priceId) view returns (uint64)',
  'function owner() view returns (address)',
  'function parseAuthorizeGovernanceDataSourceTransferPayload(bytes encodedPayload) pure returns (tuple(bytes claimVaa) sgds)',
  'function parseGovernanceInstruction(bytes encodedInstruction) pure returns (tuple(uint8 module, uint8 action, uint16 targetChainId, bytes payload) gi)',
  'function parsePriceFeedUpdates(bytes[] updateData, bytes32[] priceIds, uint64 minPublishTime, uint64 maxPublishTime) payable returns (tuple(bytes32 id, tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) price, tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) emaPrice)[] priceFeeds)',
  'function parsePriceFeedUpdatesUnique(bytes[] updateData, bytes32[] priceIds, uint64 minPublishTime, uint64 maxPublishTime) payable returns (tuple(bytes32 id, tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) price, tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) emaPrice)[] priceFeeds)',
  'function parseRequestGovernanceDataSourceTransferPayload(bytes encodedPayload) pure returns (tuple(uint32 governanceDataSourceIndex) sgdsClaim)',
  'function parseSetDataSourcesPayload(bytes encodedPayload) pure returns (tuple(tuple(uint16 chainId, bytes32 emitterAddress)[] dataSources) sds)',
  'function parseSetFeePayload(bytes encodedPayload) pure returns (tuple(uint256 newFee) sf)',
  'function parseSetValidPeriodPayload(bytes encodedPayload) pure returns (tuple(uint256 newValidPeriod) svp)',
  'function parseSetWormholeAddressPayload(bytes encodedPayload) pure returns (tuple(address newWormholeAddress) sw)',
  'function parseUpgradeContractPayload(bytes encodedPayload) pure returns (tuple(address newImplementation) uc)',
  'function priceFeedExists(bytes32 id) view returns (bool)',
  'function proxiableUUID() view returns (bytes32)',
  'function pythUpgradableMagic() pure returns (uint32)',
  'function queryPriceFeed(bytes32 id) view returns (tuple(bytes32 id, tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) price, tuple(int64 price, uint64 conf, int32 expo, uint256 publishTime) emaPrice) priceFeed)',
  'function renounceOwnership()',
  'function singleUpdateFeeInWei() view returns (uint256)',
  'function transferOwnership(address newOwner)',
  'function updatePriceFeeds(bytes[] updateData) payable',
  'function updatePriceFeedsIfNecessary(bytes[] updateData, bytes32[] priceIds, uint64[] publishTimes) payable',
  'function upgradeTo(address newImplementation)',
  'function upgradeToAndCall(address newImplementation, bytes data) payable',
  'function validDataSources() view returns (tuple(uint16 chainId, bytes32 emitterAddress)[])',
  'function validTimePeriodSeconds() view returns (uint256)',
  'function version() pure returns (string)',
  'function wormhole() view returns (address)',
];
const priceService = new EvmPriceServiceConnection(PYTH_MAINNET_ENDPOINT);

async function doPriceUpdateForPyth({ wallet, feedId, priceVerificationContract }) {
  const feedIds = Array.isArray(feedId) ? feedId : [feedId];

  const [offchainData] = await priceService.getPriceFeedsUpdateData(feedIds);
  log({ feedIds, priceVerificationContract, offchainData });

  const PriceVerificationContract = new ethers.Contract(
    priceVerificationContract,
    PYTH_ABI,
    wallet
  );

  const fee = feedIds.length;

  const args = [
    //
    [offchainData],
  ];

  const gasLimit = await PriceVerificationContract.estimateGas
    .updatePriceFeeds(...args, {
      value: ethers.BigNumber.from(fee),
    })
    .catch(parseError)
    .catch(() => ethers.BigNumber.from(10_000_000));

  const tx = await PriceVerificationContract.updatePriceFeeds(...args, {
    gasLimit: gasLimit.mul(2),
    value: ethers.BigNumber.from(fee),
  });
  await tx
    .wait()
    .then((txn) => log(txn.events) || txn, traceTxn(tx))
    .then(gasLog({ action: 'PriceVerificationContract.updatePriceFeeds', log }));
}

module.exports = {
  doPriceUpdateForPyth,
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
  doPriceUpdateForPyth({ wallet, feedId, priceVerificationContract }).then((data) =>
    console.log(JSON.stringify(data, null, 2))
  );
}
