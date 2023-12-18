#!/usr/bin/env node

const { ethers } = require('ethers');
const PerpsMarketProxyDeployment = require('../deployments/PerpsMarketProxy.json');
const { parseError } = require('../parseError');
const { getPerpsPosition } = require('./getPerpsPosition');
const { getPerpsSettlementStrategy } = require('./getPerpsSettlementStrategy');
const { getPythPrice } = require('./getPythPrice');
const { doStrictPriceUpdate } = require('./doStrictPriceUpdate');
const { EvmPriceServiceConnection } = require('@pythnetwork/pyth-evm-js');
const PYTH_MAINNET_ENDPOINT = 'https://hermes.pyth.network';
const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
  'function oracleId() view external returns (bytes32)',
  'function fulfillOracleQuery(bytes calldata signedOffchainData) payable external',
];
function base64ToHex(str) {
  const raw = Buffer.from(str, 'base64');
  return '0x' + raw.toString('hex');
}

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);
const wait = (ms) =>
  new Promise((resolve) => {
    require('debug')(`e2e:wait`)('Start', { ms });
    setTimeout(() => {
      require('debug')(`e2e:wait`)('Finish', { ms });
      resolve();
    }, ms);
  });

async function openPerpsOrder({ wallet, accountId, marketId, sizeDelta, settlementStrategyId }) {
  log({ address: wallet.address, accountId, marketId });
  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    wallet
  );

  const oldOpenPosition = await getPerpsPosition({ accountId, marketId });
  log({ oldOpenPosition });

  const { feedId } = await getPerpsSettlementStrategy({ marketId, settlementStrategyId });
  log({ feedId });

  const pythPrice = await getPythPrice({ feedId });
  log({ pythPrice });
  const commitOrderArgs = [
    {
      marketId,
      accountId,
      sizeDelta: ethers.utils.parseEther(`${sizeDelta}`),
      settlementStrategyId,
      acceptablePrice: ethers.utils.parseEther(
        Math.floor(pythPrice * (sizeDelta > 0 ? 2 : 0.5)).toString()
      ),
      referrer: ethers.constants.AddressZero,
      trackingCode: ethers.constants.HashZero,
    },
  ];
  const commitReceipt = (
    await PerpsMarketProxy.commitOrder(...commitOrderArgs, {
      gasLimit: (
        await PerpsMarketProxy.estimateGas.commitOrder(...commitOrderArgs).catch(parseError)
      ).mul(2),
    }).catch(parseError)
  )
    .wait()
    .catch(parseError);
  const block = await wallet.provider.getBlock(commitReceipt.blockNumber);
  const commitmentTime = block.timestamp;
  log({ commitmentTime });

  await wait(2_000);

  //  await doStrictPriceUpdate({ wallet, marketId, settlementStrategyId, commitmentTime });

  //  await wait(1_000);

  const settleOrderArgs = [accountId];
  await (
    await PerpsMarketProxy.settleOrder(accountId, {
      gasLimit: (
        await PerpsMarketProxy.estimateGas.settleOrder(...settleOrderArgs).catch(async (error) => {
          const errorData =
            error?.error?.error?.error?.data ||
            error?.error?.data?.data ||
            error?.error?.error?.data;
          const Errors = new ethers.Contract(
            ethers.constants.AddressZero,
            ERC7412_ABI,
            wallet.provider
          );
          const data = Errors.interface.parseError(errorData);
          if (
            data?.name === 'OracleDataRequired' &&
            data?.args?.oracleContract &&
            data?.args?.oracleQuery
          ) {
            const oracleContract = data?.args?.oracleContract;
            const oracleQuery = data?.args?.oracleQuery;
            const decoded = ethers.utils.defaultAbiCoder.decode(
              ['uint8', 'uint64', 'bytes32'],
              oracleQuery
            );
            const [updateType, timestamp, priceId] = decoded;
            log({ updateType, timestamp, priceId });
            const priceService = new EvmPriceServiceConnection(PYTH_MAINNET_ENDPOINT);
            log({ oracleContract, oracleQuery, decoded, updateType, timestamp, priceId });

            const [offchainData] = await priceService.getVaa(feedId, timestamp.toNumber());
            log({ offchainData: base64ToHex(offchainData) });

            const offchainDataEncoded = ethers.utils.defaultAbiCoder.encode(
              ['uint8', 'uint64', 'bytes32[]', 'bytes[]'],
              [updateType, timestamp, [feedId], [base64ToHex(offchainData)]]
            );
            log({ offchainDataEncoded });
            const PriceVerificationContract = new ethers.Contract(
              oracleContract,
              ERC7412_ABI,
              wallet
            );
            const tx = await PriceVerificationContract.fulfillOracleQuery(offchainDataEncoded, {
              value: ethers.BigNumber.from(1), // 1 wei,
            }).catch(parseError);
            await tx.wait().catch(parseError);
          }

          parseError(error);
        })
      ).mul(2),
    }).catch(parseError)
  )
    .wait()
    .catch(parseError);

  const newPosition = await getPerpsPosition({ accountId, marketId });
  log({ newPosition });
}

module.exports = {
  settlePerpsOrderWithPriceUpdate: openPerpsOrder,
};

if (require.main === module) {
  const [pk, accountId, marketId, sizeDelta, settlementStrategyId] = process.argv.slice(2);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(pk, provider);

  openPerpsOrder({ wallet, accountId, marketId, sizeDelta, settlementStrategyId }).then(
    console.log
  );
}
