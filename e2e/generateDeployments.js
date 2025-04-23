#!/usr/bin/env node

require('./inspect');

const path = require('path');
const fs = require('fs/promises');
const { ethers } = require('ethers');
const { generateSolidity } = require('abi-to-sol');
const prettier = require('prettier');

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgCyan = '\x1b[36m';

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const provider = new ethers.providers.JsonRpcProvider(
  process.env.RPC_URL || 'http://127.0.0.1:8545'
);

const bn = (num) => ethers.BigNumber.from(num).toString();

const [cannonState] = process.argv.slice(2);
if (!cannonState) {
  console.error(`${fgRed}ERROR: Expected 1 argument${fgReset}`);
  console.error(`Usage: ${fgGreen}node e2e/generateDeployments ${fgCyan}cannonState${fgReset}`);
  console.error(
    `Example: ${fgGreen}node e2e/generateDeployments ${fgCyan}/tmp/cannonState.json${fgReset}`
  );
  process.exit(1);
}

async function prettySol(sol) {
  return await prettier.format(sol, {
    parser: 'solidity-parse',
    plugins: ['prettier-plugin-solidity'],
    printWidth: 10_000,
    tabWidth: 4,
    useTabs: false,
    singleQuote: false,
    bracketSpacing: false,
  });
}

async function sol(name, abi) {
  return prettySol(
    generateSolidity({
      abi,
      name: `I${name}`,
      outputSource: false,
      prettifyOutput: false,
      solidityVersion: '^0.8.21',
      license: 'MIT',
      outputAttribution: false,
    })
  );
}

function dedupedAbi(abi) {
  const deduped = new Set();
  const readableAbi = [];
  const jsonAbi = [];
  abi.forEach((line) => {
    const fragment = ethers.utils.Fragment.from(line);
    if (fragment) {
      const minimal =
        fragment.type === 'error'
          ? fragment.format(ethers.utils.FormatTypes.sighash)
          : fragment.format(ethers.utils.FormatTypes.minimal);
      if (!deduped.has(minimal)) {
        readableAbi.push(fragment.format(ethers.utils.FormatTypes.full));
        deduped.add(minimal);
        jsonAbi.push(line);
      }
    }
  });
  return { readableAbi, jsonAbi };
}

async function fetchTokenInfo(address) {
  if (!fetchTokenInfo.cache) {
    fetchTokenInfo.cache = {};
  }
  if (!fetchTokenInfo.cache[address]) {
    const contract = new ethers.Contract(
      address,
      [
        'function symbol() view returns (string)',
        'function name() view returns (string)',
        'function decimals() view returns (uint8)',
      ],
      provider
    );
    const [symbol, name, decimals] = await Promise.all([
      contract.symbol(),
      contract.name(),
      contract.decimals(),
    ]);
    fetchTokenInfo.cache[address] = { address, symbol, name, decimals };
  }
  return fetchTokenInfo.cache[address];
}

async function fetchOracleInfo({ nodeId, OracleManagerProxy }) {
  if (!fetchOracleInfo.cache) {
    fetchOracleInfo.cache = {};
  }
  if (!fetchOracleInfo.cache[nodeId]) {
    const oracle = {};
    const OracleContract = new ethers.Contract(
      OracleManagerProxy.address,
      OracleManagerProxy.abi,
      provider
    );
    const oracleInfo = await OracleContract.getNode(nodeId);
    if (oracleInfo.nodeType === 8) {
      [oracle.constPrice] = ethers.utils.defaultAbiCoder.decode(['uint256'], oracleInfo.parameters);
      oracle.constPrice = `${oracle.constPrice}`;
    }
    if (oracleInfo.nodeType === 2) {
      [oracle.externalContract] = ethers.utils.defaultAbiCoder.decode(
        ['address'],
        oracleInfo.parameters
      );
    }
    if (oracleInfo.nodeType === 7 && oracleInfo.parents?.[0]) {
      // staleness circuit breaker
      [oracle.stalenessTolerance] = ethers.utils.defaultAbiCoder.decode(
        ['uint256'],
        oracleInfo.parameters
      );
      oracle.stalenessTolerance = `${oracle.stalenessTolerance}`;
      for (const parentOracleId of oracleInfo.parents) {
        const parentOracleInfo = await OracleContract.getNode(parentOracleId).catch(() => {});
        if (parentOracleInfo && parentOracleInfo.nodeType === 5) {
          // pyth aggregator type
          [_, oracle.pythFeedId] = ethers.utils.defaultAbiCoder.decode(
            ['address', 'bytes32', 'bool'],
            parentOracleInfo.parameters
          );
          break;
        }
      }
    }
    fetchOracleInfo.cache[nodeId] = oracle;
  }
  return fetchOracleInfo.cache[nodeId];
}

async function extractRewardsDistributors(deployments) {
  const items = [];
  const contracts = {};
  const duplicates = {};
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('provision.')) {
      const [, artifactName] = key.split('.');
      const rewardsDistributor =
        value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributor ||
        // RewardsDistributorExternal is a wrapper over RewardsDistributor with identical functionality
        value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributorExternal;
      if (rewardsDistributor) {
        log({
          RewardsDistributor: {
            address: rewardsDistributor.address,
            constructorArgs: rewardsDistributor.constructorArgs,
            deployTxnHash: rewardsDistributor.deployTxnHash,
          },
        });

        let rewardManager;
        let poolId;
        let collateralTypeAddress;
        let payoutTokenAddress;
        let _payoutTokenDecimals;
        let name;
        let authorisedDistributor;
        if (
          value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributor &&
          rewardsDistributor.constructorArgs.length === 6
        ) {
          [
            //
            rewardManager,
            poolId,
            collateralTypeAddress,
            payoutTokenAddress,
            _payoutTokenDecimals,
            name,
          ] = rewardsDistributor.constructorArgs;
        }

        if (
          value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributor &&
          rewardsDistributor.constructorArgs.length === 5
        ) {
          [
            // new version has 5 arguments, without collateralTypeAddress
            rewardManager,
            poolId,
            payoutTokenAddress,
            _payoutTokenDecimals,
            name,
          ] = rewardsDistributor.constructorArgs;
        }

        if (
          value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributorExternal &&
          rewardsDistributor.constructorArgs.length === 7
        ) {
          [
            rewardManager,
            poolId,
            collateralTypeAddress,
            payoutTokenAddress,
            _payoutTokenDecimals,
            name,
            authorisedDistributor,
          ] = rewardsDistributor.constructorArgs;
        }

        if (
          value?.artifacts?.imports?.[artifactName]?.contracts?.RewardsDistributorExternal &&
          rewardsDistributor.constructorArgs.length === 6
        ) {
          [
            // new version has 6 arguments, without collateralTypeAddress
            rewardManager,
            poolId,
            payoutTokenAddress,
            _payoutTokenDecimals,
            name,
            authorisedDistributor,
          ] = rewardsDistributor.constructorArgs;
        }

        const collateralType = collateralTypeAddress
          ? await fetchTokenInfo(collateralTypeAddress)
          : undefined;
        const payoutToken = await fetchTokenInfo(payoutTokenAddress);

        const contractName = collateralTypeAddress
          ? `RewardsDistributor_${poolId}_${collateralType.symbol}_${payoutToken.symbol}`
          : `RewardsDistributor_${poolId}_${payoutToken.symbol}`;
        if (contractName in contracts) {
          duplicates[contractName] = contractName in duplicates ? duplicates[contractName] + 1 : 1;
          contracts[`${contractName}__${duplicates[contractName]}`] = rewardsDistributor;
        } else {
          contracts[`${contractName}`] = rewardsDistributor;
        }

        items.push({
          address: rewardsDistributor.address,
          name,
          poolId,
          collateralType,
          payoutToken,
          rewardManager,
          isRegistered: false,
        });
      }
    }
  }

  // walk over all the registration invokes and set isRegistered flag for deployed distributors
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.RewardsDistributorRegistered;
      if (events && events.length === 1) {
        // can only have one RewardsDistributorRegistered event
        log({ RewardsDistributorRegistered: events[0] });
        const [poolId, collateralType, address] = events[0].args;
        for (const rewardDistributor of items) {
          if (
            `${rewardDistributor.poolId}` === `${poolId}` &&
            `${rewardDistributor.address}`.toLowerCase() === `${address}`.toLowerCase()
          ) {
            rewardDistributor.isRegistered = true;
          }
        }
      }
    }
  }
  return {
    items,
    contracts,
  };
}

async function extractSynths(deployments) {
  const synthTokens = {};
  const spotMarkets = {};
  const contracts = {};
  const duplicates = {};

  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.SynthRegistered;
      if (events && events.length === 1) {
        // can only have one SynthRegistered event
        log({ SynthRegistered: events[0] });
        let [synthMarketId_, address] = events[0].args;
        const synthMarketId = bn(synthMarketId_);
        spotMarkets[synthMarketId] = { id: synthMarketId };
        synthTokens[synthMarketId] = { synthMarketId };

        const spotFactory =
          deployments?.state?.['provision.spotFactory']?.artifacts?.imports?.spotFactory;
        if (spotFactory) {
          const SpotMarketProxy = new ethers.Contract(
            spotFactory.contracts.SpotMarketProxy.address,
            spotFactory.contracts.SpotMarketProxy.abi,
            provider
          );

          if (!address) {
            // For old spot market we did not emit token address and need to get it dynamically
            // TODO: remove after optimism-mainnet upgraded
            address = await SpotMarketProxy.getSynth(synthMarketId);
          }

          if (address) {
            const synthToken = await fetchTokenInfo(address);
            spotMarkets[synthMarketId].synthToken = synthToken;
            Object.assign(synthTokens[synthMarketId], synthToken);
            const contractName = `SynthToken_${synthToken.symbol}`;
            if (contractName in contracts) {
              duplicates[contractName] =
                contractName in duplicates ? duplicates[contractName] + 1 : 1;
              contracts[`${contractName}__${duplicates[contractName]}`] = {
                address,
                abi: [],
              };
            } else {
              contracts[`${contractName}`] = {
                address,
                abi: [],
              };
            }
          }

          const { atomicFixedFee, asyncFixedFee, wrapFee, unwrapFee } =
            await SpotMarketProxy.getMarketFees(synthMarketId);
          const feeCollector = await SpotMarketProxy.getFeeCollector(synthMarketId);
          const marketUtilizationFees =
            await SpotMarketProxy.getMarketUtilizationFees(synthMarketId);
          spotMarkets[synthMarketId].fees = {
            atomicFixedFee: bn(atomicFixedFee),
            asyncFixedFee: bn(asyncFixedFee),
            wrapFee: bn(wrapFee),
            unwrapFee: bn(unwrapFee),
            marketUtilizationFees: bn(marketUtilizationFees),
            feeCollector,
          };
        }
      }
    }
  }

  // walk over all the setWrapper invokes and find wrapped token info for each synth
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      let events;

      events = value?.artifacts?.txns?.[artifactName]?.events?.WrapperSet;
      if (events && events.length === 1) {
        const [synthMarketId_, wrapCollateralType, maxWrappableAmount] = events[0].args;
        const synthMarketId = bn(synthMarketId_);
        if (synthMarketId in spotMarkets) {
          const token = await fetchTokenInfo(wrapCollateralType);
          spotMarkets[synthMarketId].token = token;
          synthTokens[synthMarketId].token = token;
          spotMarkets[synthMarketId].maxWrappableAmount = maxWrappableAmount;
          synthTokens[synthMarketId].maxWrappableAmount = maxWrappableAmount;
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.AtomicFixedFeeSet;
      if (events && events.length === 1) {
        const [synthMarketId_, atomicFixedFee] = events[0].args;
        const synthMarketId = bn(synthMarketId_);
        if (synthMarketId in spotMarkets) {
          spotMarkets[synthMarketId].atomicFixedFee = atomicFixedFee;
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.MarketSkewScaleSet;
      if (events && events.length === 1) {
        const [synthMarketId_, skewScale] = events[0].args;
        const synthMarketId = bn(synthMarketId_);
        if (synthMarketId in spotMarkets) {
          spotMarkets[synthMarketId].skewScale = skewScale;
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.CollateralLeverageSet;
      if (events && events.length === 1) {
        const [synthMarketId_, collateralLeverage] = events[0].args;
        const synthMarketId = bn(synthMarketId_);
        if (synthMarketId in spotMarkets) {
          spotMarkets[synthMarketId].collateralLeverage = collateralLeverage;
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.SynthPriceDataUpdated;
      if (events && events.length === 1) {
        const [synthMarketId_, buyFeedId, sellFeedId, strictStalenessTolerance] = events[0].args;
        const synthMarketId = bn(synthMarketId_);
        if (synthMarketId in spotMarkets) {
          spotMarkets[synthMarketId].synthPriceData = {
            buyFeedId,
            sellFeedId,
            strictStalenessTolerance,
          };
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.SettlementStrategySet;
      if (events && events.length === 1) {
        const [synthMarketId_, settlementStrategyId, settlementStrategy] = events[0].args;
        const synthMarketId = bn(synthMarketId_);
        if (synthMarketId in spotMarkets) {
          spotMarkets[synthMarketId].settlementStrategyId = settlementStrategyId;
          spotMarkets[synthMarketId].settlementStrategy = {
            settlementStrategyId,
            ...settlementStrategy,
          };
        }
      }
    }
  }

  return {
    spotMarkets: {
      markets: spotMarkets,
    },
    synthTokens: Object.values(synthTokens),
    contracts,
  };
}

async function extractMintableTokens(deployments) {
  const items = [];
  const contracts = {};
  const duplicates = {};
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('provision.')) {
      const [, artifactName] = key.split('.');
      const mintableToken = value?.artifacts?.imports?.[artifactName]?.contracts?.MintableToken;
      if (mintableToken) {
        log({
          MintableToken: {
            address: mintableToken.address,
            constructorArgs: mintableToken.constructorArgs,
            deployTxnHash: mintableToken.deployTxnHash,
          },
        });
        const token = await fetchTokenInfo(mintableToken.address);

        const contractName = `MintableToken_${token.symbol}`;
        if (contractName in contracts) {
          duplicates[contractName] = contractName in duplicates ? duplicates[contractName] + 1 : 1;
          contracts[`${contractName}__${duplicates[contractName]}`] = mintableToken;
        } else {
          contracts[`${contractName}`] = mintableToken;
        }

        items.push(token);
      }
    }
  }

  return {
    items,
    contracts,
  };
}

async function extractCollaterals(deployments) {
  const items = [];
  const contracts = {};
  const duplicates = {};
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.CollateralConfigured;
      if (events && events.length === 1) {
        // can only have one CollateralConfigured event
        log({ CollateralConfigured: events[0] });
        const [address, params] = events[0].args;
        const token = await fetchTokenInfo(address);

        let depositingEnabled,
          issuanceRatioD18,
          liquidationRatioD18,
          liquidationRewardD18,
          oracleNodeId,
          tokenAddress,
          minDelegationD18;
        if (Array.isArray(params)) {
          // TODO: cleanup after optimism-mainnet upgraded
          [
            depositingEnabled,
            issuanceRatioD18,
            liquidationRatioD18,
            liquidationRewardD18,
            oracleNodeId,
            tokenAddress,
            minDelegationD18,
          ] = params;
        } else {
          ({
            depositingEnabled,
            issuanceRatioD18,
            liquidationRatioD18,
            liquidationRewardD18,
            oracleNodeId,
            tokenAddress,
            minDelegationD18,
          } = params);
        }

        const contractName = `CollateralToken_${token.symbol}`;
        if (contractName in contracts) {
          duplicates[contractName] = contractName in duplicates ? duplicates[contractName] + 1 : 1;
          contracts[`${contractName}__${duplicates[contractName]}`] = {
            address,
            abi: [],
          };
        } else {
          contracts[`${contractName}`] = {
            address,
            abi: [],
          };
        }

        items.push({
          ...token,
          depositingEnabled,
          oracleNodeId,
          tokenAddress,
          issuanceRatioD18: bn(issuanceRatioD18),
          liquidationRatioD18: bn(liquidationRatioD18),
          liquidationRewardD18: bn(liquidationRewardD18),
          minDelegationD18: bn(minDelegationD18),
        });
      }
    }
  }

  return {
    items,
    contracts,
  };
}

async function extractPythFeeds(deployments) {
  const items = [];
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.NodeRegistered;
      if (events && events.length === 1) {
        // can only have one NodeRegistered event
        log({ NodeRegistered: events[0] });
        const [_oracleNodeId, nodeType, parameters] = events[0].args;
        if (nodeType === 5) {
          // pyth aggregator type
          const [_priceVerificationAddress, feedId] = ethers.utils.defaultAbiCoder.decode(
            ['address', 'bytes32', 'bool'],
            parameters
          );
          items.push(feedId);
        }
      }
    }
  }

  return items;
}

async function extractPerpsMarkets(deployments) {
  // walk over all the MarketCreated events
  const meta = {};
  const markets = {};
  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');
      const events = value?.artifacts?.txns?.[artifactName]?.events?.MarketCreated;
      if (events && events.length === 1) {
        log({ MarketCreated: events[0] });
        const [perpsMarketId_, name, symbol] = events[0].args;
        const id = bn(perpsMarketId_);
        markets[id] = {
          id,
          symbol,
          name,
        };
      }
    }
  }

  for (const [key, value] of Object.entries(deployments?.state || {})) {
    if (key.startsWith('invoke.')) {
      const [, artifactName] = key.split('.');

      let events;

      events = value?.artifacts?.txns?.[artifactName]?.events?.SettlementStrategySet;
      if (events && events.length === 1) {
        const [perpsMarketId_, settlementStrategyId, settlementStrategy] = events[0].args;
        const perpsMarketId = bn(perpsMarketId_);
        settlementStrategy.settlementStrategyId = settlementStrategyId;
        if (perpsMarketId in markets) {
          markets[perpsMarketId].settlementStrategyId = settlementStrategyId;
          markets[perpsMarketId].settlementStrategy = settlementStrategy;
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.FundingParametersSet;
      if (events && events.length === 1) {
        const [perpsMarketId_, skewScale, maxFundingVelocity] = events[0].args;
        const perpsMarketId = bn(perpsMarketId_);
        if (perpsMarketId in markets) {
          markets[perpsMarketId].fundingParameters = {
            skewScale: bn(skewScale),
            maxFundingVelocity: bn(maxFundingVelocity),
          };
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.LiquidationParametersSet;
      if (events && events.length === 1) {
        const [
          perpsMarketId_,
          initialMarginRatioD18,
          minimumInitialMarginRatioD18,
          maintenanceMarginScalarD18,
          flagRewardRatioD18,
          minimumPositionMargin,
        ] = events[0].args;
        const perpsMarketId = bn(perpsMarketId_);
        if (perpsMarketId in markets) {
          markets[perpsMarketId].liquidationParameters = {
            initialMarginRatioD18: bn(initialMarginRatioD18),
            minimumInitialMarginRatioD18: bn(minimumInitialMarginRatioD18),
            maintenanceMarginScalarD18: bn(maintenanceMarginScalarD18),
            flagRewardRatioD18: bn(flagRewardRatioD18),
            minimumPositionMargin: bn(minimumPositionMargin),
          };
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.LockedOiRatioSet;
      if (events && events.length === 1) {
        log({ LockedOiRatioSet: events[0] });
        const [perpsMarketId_, lockedOiRatio] = events[0].args;
        const perpsMarketId = bn(perpsMarketId_);
        if (perpsMarketId in markets) {
          markets[perpsMarketId].lockedOiRatio = bn(lockedOiRatio);
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.MaxLiquidationParametersSet;
      if (events && events.length === 1) {
        log({ MaxLiquidationParametersSet: events[0] });
        const [
          perpsMarketId_,
          maxLiquidationLimitAccumulationMultiplier,
          maxSecondsInLiquidationWindow,
          maxLiquidationPd,
          endorsedLiquidator,
        ] = events[0].args;
        const perpsMarketId = bn(perpsMarketId_);
        if (perpsMarketId in markets) {
          markets[perpsMarketId].maxLiquidationParameters = {
            maxLiquidationLimitAccumulationMultiplier: bn(
              maxLiquidationLimitAccumulationMultiplier
            ),
            maxSecondsInLiquidationWindow: bn(maxSecondsInLiquidationWindow),
            maxLiquidationPd: bn(maxLiquidationPd),
            endorsedLiquidator,
          };
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.MaxMarketSizeSet;
      if (events && events.length === 1) {
        log({ MaxMarketSizeSet: events[0] });
        const [perpsMarketId_, maxMarketSize] = events[0].args;
        const perpsMarketId = bn(perpsMarketId_);
        if (perpsMarketId in markets) {
          markets[perpsMarketId].maxMarketSize = bn(maxMarketSize);
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.MaxMarketValueSet;
      if (events && events.length === 1) {
        log({ MaxMarketValueSet: events[0] });
        const [perpsMarketId_, maxMarketValue] = events[0].args;
        const perpsMarketId = bn(perpsMarketId_);
        if (perpsMarketId in markets) {
          markets[perpsMarketId].maxMarketValue = bn(maxMarketValue);
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.OrderFeesSet;
      if (events && events.length === 1) {
        log({ OrderFeesSet: events[0] });
        const [perpsMarketId_, makerFee, takerFee] = events[0].args;
        const perpsMarketId = bn(perpsMarketId_);
        if (perpsMarketId in markets) {
          markets[perpsMarketId].orderFees = {
            makerFee: bn(makerFee),
            takerFee: bn(takerFee),
          };
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.MarketPriceDataUpdated;
      if (events && events.length === 1) {
        log({ MarketPriceDataUpdated: events[0] });
        const [perpsMarketId_, feedId, strictStalenessTolerance] = events[0].args;
        const perpsMarketId = bn(perpsMarketId_);
        if (perpsMarketId in markets) {
          markets[perpsMarketId].marketPriceData = {
            feedId,
            strictStalenessTolerance: bn(strictStalenessTolerance),
          };
        }
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.KeeperRewardGuardsSet;
      if (events && events.length === 1) {
        log({ KeeperRewardGuardsSet: events[0] });
        const [
          minKeeperRewardUsd,
          minKeeperProfitRatioD18,
          maxKeeperRewardUsd,
          maxKeeperScalingRatioD18,
        ] = events[0].args;
        meta.keeperRewardGuards = {
          minKeeperRewardUsd: bn(minKeeperRewardUsd),
          minKeeperProfitRatioD18: bn(minKeeperProfitRatioD18),
          maxKeeperRewardUsd: bn(maxKeeperRewardUsd),
          maxKeeperScalingRatioD18: bn(maxKeeperScalingRatioD18),
        };
      }

      events = value?.artifacts?.txns?.[artifactName]?.events?.InterestRateParametersSet;
      if (events && events.length === 1) {
        log({ InterestRateParametersSet: events[0] });
        const [
          lowUtilizationInterestRateGradient,
          interestRateGradientBreakpoint,
          highUtilizationInterestRateGradient,
        ] = events[0].args;
        meta.interestRateParameters = {
          lowUtilizationInterestRateGradient: bn(lowUtilizationInterestRateGradient),
          interestRateGradientBreakpoint: bn(interestRateGradientBreakpoint),
          highUtilizationInterestRateGradient: bn(highUtilizationInterestRateGradient),
        };
      }
    }
  }

  return {
    ...meta,
    markets,
  };
}

async function run() {
  const deployments = require(path.resolve(cannonState));

  await fs.rm(`${__dirname}/deployments`, { recursive: true, force: true });
  await fs.mkdir(`${__dirname}/deployments`, { recursive: true });
  await fs.mkdir(`${__dirname}/deployments/abi`, { recursive: true });
  await fs.mkdir(`${__dirname}/deployments/sol`, { recursive: true });

  log('Writing', `deployments/cannon1.json`);
  await fs.writeFile(`${__dirname}/deployments/cannon1.json`, JSON.stringify(deployments, null, 2));
  log('Writing', `deployments/cannon.json`);
  await fs.writeFile(
    `${__dirname}/deployments/cannon.json`,
    JSON.stringify(
      deployments,
      (key, value) => {
        if (key === 'abi' && Array.isArray(value)) {
          return dedupedAbi(value).readableAbi;
        }
        if (key === 'depends' && Array.isArray(value)) {
          return Array.from(new Set(value)).sort();
        }
        return value;
      },
      2
    )
  );

  const network = await provider.getNetwork();
  // some old deploys do not have chainId in cannon state
  const chainId = parseInt(`${deployments.chainId || network.chainId}`);
  const meta = {
    chainId,
    name: deployments.def.name,
    preset: deployments.def.preset ?? 'main',
    version: deployments.def.version,
    generator: deployments.generator,
    timestamp: deployments.timestamp,
    miscUrl: deployments.miscUrl,
  };
  log('Generating deployments info for', meta);
  const extras = {};
  const contracts = {};

  const system = deployments?.state?.['provision.system']?.artifacts?.imports?.system;
  if (system) {
    contracts.CoreProxy = system.contracts.CoreProxy;
    contracts.AccountProxy = system.contracts.AccountProxy;
    contracts.USDProxy = system.contracts.USDProxy;
    contracts.OracleManagerProxy = system.imports.oracle_manager.contracts.Proxy;
  }

  const legacyMarket =
    deployments?.state?.['provision.legacyMarket']?.artifacts?.imports?.legacyMarket;
  if (legacyMarket) {
    contracts.LegacyMarketProxy = legacyMarket.contracts.Proxy;
    contracts.V2x = legacyMarket.imports.v2x.contracts.Synthetix;
    contracts.V2xUsd = legacyMarket.imports.v2x.contracts.SynthsUSD;
    Object.assign(extras, {
      legacy_market_id: legacyMarket?.extras?.marketId,
    });
  }

  const treasuryMarket =
    deployments?.state?.['provision.treasury_market']?.artifacts?.imports?.treasury_market;
  if (treasuryMarket) {
    contracts.TreasuryMarketProxy = treasuryMarket.contracts.Proxy;
    Object.assign(extras, {
      treasury_market_id: treasuryMarket?.extras?.marketId,
    });
  }

  const trustedMulticallForwarder =
    system?.imports?.trusted_multicall_forwarder ??
    system?.imports?.oracle_manager?.imports?.trusted_multicall_forwarder;
  if (trustedMulticallForwarder) {
    contracts.TrustedMulticallForwarder =
      trustedMulticallForwarder.contracts.TrustedMulticallForwarder;
  }

  const spotFactory =
    deployments?.state?.['provision.spotFactory']?.artifacts?.imports?.spotFactory;
  if (spotFactory) {
    contracts.SpotMarketProxy = spotFactory.contracts.SpotMarketProxy;
  }

  const perpsFactory =
    deployments?.state?.['provision.perpsFactory']?.artifacts?.imports?.perpsFactory;
  if (perpsFactory) {
    contracts.PerpsMarketProxy = perpsFactory.contracts.PerpsMarketProxy;
    contracts.PerpsAccountProxy =
      perpsFactory.contracts.PerpsAccountProxy ?? perpsFactory.contracts.AccountProxy;
    Object.assign(extras, {
      perps_super_market_id: perpsFactory?.extras?.superMarketId,
    });
  }

  const bfp_market_factory =
    deployments?.state?.['provision.bfp_market_factory']?.artifacts?.imports?.bfp_market_factory;
  if (bfp_market_factory) {
    contracts.BfpMarketProxy = bfp_market_factory.contracts.BfpMarketProxy;
    contracts.BfpAccountProxy = bfp_market_factory.contracts.PerpAccountProxy;
    contracts.BfpRewardDistributor = bfp_market_factory.contracts.PerpRewardDistributor;
  }

  const pyth_erc7412_wrapper =
    deployments?.state?.['provision.pyth_erc7412_wrapper']?.artifacts?.imports
      ?.pyth_erc7412_wrapper;
  if (pyth_erc7412_wrapper) {
    contracts.PythERC7412Wrapper = pyth_erc7412_wrapper.contracts.PythERC7412Wrapper;
  }

  if (contracts.USDProxy) {
    const systemToken = await fetchTokenInfo(contracts.USDProxy.address);
    log('Writing', `deployments/systemToken.json`);
    await fs.writeFile(
      `${__dirname}/deployments/systemToken.json`,
      JSON.stringify(systemToken, null, 2)
    );
  }

  const { items: mintableTokens, contracts: mintableTokenContracts } =
    await extractMintableTokens(deployments);
  log('Writing', `deployments/mintableTokens.json`);
  await fs.writeFile(
    `${__dirname}/deployments/mintableTokens.json`,
    JSON.stringify(mintableTokens, null, 2)
  );
  Object.assign(contracts, mintableTokenContracts);

  const { items: collateralTokens, contracts: collateralTokenContracts } =
    await extractCollaterals(deployments);
  for (const collateralToken of collateralTokens) {
    collateralToken.oracle = await fetchOracleInfo({
      nodeId: collateralToken.oracleNodeId,
      OracleManagerProxy: contracts.OracleManagerProxy,
    });
  }
  log('Writing', `deployments/collateralTokens.json`);
  await fs.writeFile(
    `${__dirname}/deployments/collateralTokens.json`,
    JSON.stringify(collateralTokens, null, 2)
  );
  Object.assign(contracts, collateralTokenContracts);

  // Extract all Pyth Feeds
  const pythFeeds = await extractPythFeeds(deployments);
  await fs.writeFile(`${__dirname}/deployments/pythFeeds.json`, JSON.stringify(pythFeeds, null, 2));

  // Extract all extras
  Object.values(deployments?.state).forEach((step) => {
    Object.assign(extras, step?.artifacts?.settings);
    Object.assign(extras, step?.artifacts?.extras);
  });

  // Fixes for older deployments
  Object.assign(extras, {
    usdc_address: extras?.usdc_address ?? deployments?.def?.setting?.usdc_address?.defaultValue,
    snx_address: extras?.snx_address ?? deployments?.def?.setting?.snx_address?.defaultValue,
  });

  const {
    spotMarkets,
    synthTokens,
    contracts: synthTokenContracts,
  } = await extractSynths(deployments);
  log('Writing', `deployments/synthTokens.json`);
  await fs.writeFile(
    `${__dirname}/deployments/synthTokens.json`,
    JSON.stringify(synthTokens, null, 2)
  );
  log('Writing', `deployments/spotMarkets.json`);
  await fs.writeFile(
    `${__dirname}/deployments/spotMarkets.json`,
    JSON.stringify(spotMarkets, null, 2)
  );
  Object.assign(contracts, synthTokenContracts);

  const { items: rewardsDistributors, contracts: rewardsDistributorContracts } =
    await extractRewardsDistributors(deployments);
  log('Writing', `deployments/rewardsDistributors.json`);
  await fs.writeFile(
    `${__dirname}/deployments/rewardsDistributors.json`,
    JSON.stringify(rewardsDistributors, null, 2)
  );
  Object.assign(contracts, rewardsDistributorContracts);

  const perpsMarkets = await extractPerpsMarkets(deployments);
  log('Writing', `deployments/perpsMarkets.json`);
  await fs.writeFile(
    `${__dirname}/deployments/perpsMarkets.json`,
    JSON.stringify(perpsMarkets, null, 2)
  );

  Object.assign(meta, {
    contracts: Object.fromEntries(
      Object.entries(contracts).map(([name, { address }]) => [name, address])
    ),
  });

  contracts.AllErrors = {
    address: ethers.constants.AddressZero,
    abi: Object.values(contracts).flatMap(({ abi }) => abi.filter((item) => item.type === 'error')),
  };

  log('Writing', `deployments/meta.json`);
  await fs.writeFile(`${__dirname}/deployments/meta.json`, JSON.stringify(meta, null, 2));

  log('Writing', `deployments/extras.json`);
  await fs.writeFile(`${__dirname}/deployments/extras.json`, JSON.stringify(extras, null, 2));

  for (const [name, { address, abi }] of Object.entries(contracts)) {
    const { readableAbi, jsonAbi } = dedupedAbi(abi);

    if (readableAbi.length > 0) {
      log('Writing', `deployments/${name}.json`, { address });
      await fs.writeFile(
        `${__dirname}/deployments/${name}.json`,
        JSON.stringify({ address, abi: readableAbi }, null, 2)
      );
      log('Writing', `deployments/abi/${name}.json`);
      await fs.writeFile(
        `${__dirname}/deployments/abi/${name}.json`,
        JSON.stringify(jsonAbi, null, 2)
      );
      log('Writing', `deployments/sol/I${name}.sol`);
      await fs.writeFile(`${__dirname}/deployments/sol/I${name}.sol`, await sol(name, jsonAbi));
      log('Writing', `deployments/abi/${name}.readable.json`);
      await fs.writeFile(
        `${__dirname}/deployments/abi/${name}.readable.json`,
        JSON.stringify(readableAbi, null, 2)
      );
    }
  }
}

run();
