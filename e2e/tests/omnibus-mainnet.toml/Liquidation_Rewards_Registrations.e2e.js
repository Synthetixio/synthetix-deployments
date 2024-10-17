const crypto = require('crypto');
const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');
const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { syncTime } = require('../../tasks/syncTime');
const { contractRead } = require('../../tasks/contractRead');
const { getAccountOwner } = require('../../tasks/getAccountOwner');
const { createAccount } = require('../../tasks/createAccount');
const { getAvailableRewards } = require('../../tasks/getAvailableRewards');

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const accountId = parseInt(`1337${crypto.randomInt(1000)}`);
  const wallet = ethers.Wallet.createRandom().connect(provider);
  // const wallet = new ethers.Wallet('0xab', provider);
  // const accountId = 1337;
  const address = wallet.address;
  const poolId = '1';

  let registeredDistributors;
  let liquidationDistributors;
  let expectedDistributors;

  let snapshot;
  before('Create snapshot', async () => {
    snapshot = await provider.send('evm_snapshot', []);
    log('Create snapshot', { snapshot });
  });
  after('Restore snapshot', async () => {
    log('Restore snapshot', { snapshot });
    await provider.send('evm_revert', [snapshot]);
  });

  it('should sync time of the fork', async () => {
    await syncTime();
  });

  it('should collect all registered rewards distributors', async () => {
    const cannon = require('../../deployments/cannon.json');

    registeredDistributors = [];
    // walk over all the registration invokes and set isRegistered flag for deployed distributors
    for (const [key, value] of Object.entries(cannon?.state || {})) {
      if (key.startsWith('invoke.')) {
        const [, artifactName] = key.split('.');
        const events = value?.artifacts?.txns?.[artifactName]?.events?.RewardsDistributorRegistered;
        if (events) {
          for (const event of events) {
            const [poolId, collateralType, distributor] = event.args;
            registeredDistributors.push({ poolId, collateralType, distributor });
          }
        }
      }
    }
    log({ registeredDistributors });
  });

  it('should collect all expected distributors for perps liquidations', async () => {
    const supportedCollateralsIds = await contractRead({
      wallet,
      contract: 'BfpMarketProxy',
      func: 'getMarginCollateralConfiguration',
      args: [],
    });
    log({ supportedCollateralsIds });

    const systemToken = require('../../deployments/systemToken.json');
    const synthTokens = require('../../deployments/synthTokens.json');

    // We can only use synth tokens and system token as collaterals
    // We do NOT need a rewards distributor for system token
    const supportedCollaterals = supportedCollateralsIds
      .map((id) => {
        const synthMarketId = id.toString();
        if (synthMarketId === '0') {
          return {
            synthMarketId,
            ...systemToken,
          };
        }
        return synthTokens.find((token) => token.synthMarketId === synthMarketId);
      })
      .filter(Boolean);
    log({ supportedCollaterals });

    const liquidatableCollaterals = supportedCollaterals
      // We do not need rewards distributor for system token
      .filter((collateral) => collateral.address !== systemToken.address);

    expectedDistributors = [];
    for (const liquidatableCollateral of liquidatableCollaterals) {
      const { distributor, poolDelegatedCollateralTypes } = await contractRead({
        wallet,
        contract: 'BfpMarketProxy',
        func: 'getRegisteredDistributor',
        args: [liquidatableCollateral.synthMarketId],
      });
      for (const collateralType of poolDelegatedCollateralTypes) {
        expectedDistributors.push({
          poolId,
          collateralType,
          distributor,
        });
      }
    }
    log({ expectedDistributors });
  });

  it('should ensure each perps collateral has rewards distributor registered', async () => {
    for (const expectedDistributor of expectedDistributors) {
      const registeredDistributor = registeredDistributors.find(
        ({ poolId, collateralType, distributor }) =>
          collateralType === expectedDistributor.collateralType &&
          distributor === expectedDistributor.distributor &&
          poolId === expectedDistributor.poolId
      );
      log({ expectedDistributor, registeredDistributor });
      assert.ok(
        registeredDistributor,
        'Every expected rewards distributor for liquidations is registered'
      );
    }
  });

  it('should create new random wallet', async () => {
    log({ wallet: wallet.address, pk: wallet.privateKey });
    assert.ok(wallet.address);
  });

  it('should set ETH balance to 100', async () => {
    const address = wallet.address;
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 100 });
    assert.equal(await getEthBalance({ address }), 100);
  });

  it('should create user account', async () => {
    assert.equal(
      await getAccountOwner({ accountId }),
      ethers.constants.AddressZero,
      'New wallet should not have an account yet'
    );
    await createAccount({ wallet, accountId });
    assert.equal(await getAccountOwner({ accountId }), address);
  });

  it('should verify that new wallet has no liquidation rewards without "reward is not found" revert', async () => {
    for (const rewardsDistributor of expectedDistributors) {
      const collateralType = rewardsDistributor.collateralType;
      const distributor = rewardsDistributor.distributor;
      log({ accountId, poolId, collateralType, distributor });

      const availableRewards = await getAvailableRewards({
        accountId,
        poolId,
        collateralType,
        distributorAddress: distributor,
      });
      log({ availableRewards });
      assert.equal(availableRewards, 0, 'new wallet should have no liquidation rewards');
    }
  });
});
