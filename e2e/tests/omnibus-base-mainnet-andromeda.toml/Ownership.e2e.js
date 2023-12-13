const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const CoreProxyDeployment = require('../../deployments/CoreProxy.json');
const meta = require('../../deployments/meta.json');

const MAINNET_DEPLOYER = '0xEde8a407913A874Dd7e3d5B731AFcA135D30375E';
//const DAO_GNOSIS_SAFE = '0x';

// While we develop rapidly,
// we want to quickly deploy, and keep testnet deployer as the owner temporarily
// TODO: switch to DAO_GNOSIS_SAFE when stable
const OWNER_ADDRESS = MAINNET_DEPLOYER;

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    provider
  );

  const contractOwnershipAbi = [
    'function owner() view returns (address)',
    'function nominatedOwner() view returns (address)',
  ];

  it('should validate CoreProxy owned by DAO Safe', async () => {
    const { CoreProxy: address } = meta.contracts;
    const Contract = new ethers.Contract(address, contractOwnershipAbi, provider);
    const [owner, nominatedOwner] = await Promise.all([
      Contract.owner().catch(() => ethers.constants.AddressZero),
      Contract.nominatedOwner().catch(() => ethers.constants.AddressZero),
    ]);
    log({ name: 'CoreProxy', address, owner, nominatedOwner });
    assert.equal(owner, OWNER_ADDRESS);
    assert.equal(nominatedOwner, ethers.constants.AddressZero);
  });

  it('should validate AccountProxy owned by CoreProxy Contract', async () => {
    const { AccountProxy: address } = meta.contracts;
    const Contract = new ethers.Contract(address, contractOwnershipAbi, provider);
    const [owner, nominatedOwner] = await Promise.all([
      Contract.owner().catch(() => ethers.constants.AddressZero),
      Contract.nominatedOwner().catch(() => ethers.constants.AddressZero),
    ]);
    log({ name: 'AccountProxy', address, owner, nominatedOwner });
    assert.equal(owner, meta.contracts.CoreProxy);
    assert.equal(nominatedOwner, ethers.constants.AddressZero);
  });

  it('should validate USDProxy owned by CoreProxy Contract', async () => {
    const { USDProxy: address } = meta.contracts;
    const Contract = new ethers.Contract(address, contractOwnershipAbi, provider);
    const [owner, nominatedOwner] = await Promise.all([
      Contract.owner().catch(() => ethers.constants.AddressZero),
      Contract.nominatedOwner().catch(() => ethers.constants.AddressZero),
    ]);
    log({ name: 'USDProxy', address, owner, nominatedOwner });
    assert.equal(owner, meta.contracts.CoreProxy);
    assert.equal(nominatedOwner, ethers.constants.AddressZero);
  });

  it('should validate OracleManagerProxy owned by DAO Safe', async () => {
    const { OracleManagerProxy: address } = meta.contracts;
    const Contract = new ethers.Contract(address, contractOwnershipAbi, provider);
    const [owner, nominatedOwner] = await Promise.all([
      Contract.owner().catch(() => ethers.constants.AddressZero),
      Contract.nominatedOwner().catch(() => ethers.constants.AddressZero),
    ]);
    log({ name: 'OracleManagerProxy', address, owner, nominatedOwner });

    assert.equal(owner, OWNER_ADDRESS);
    assert.equal(nominatedOwner, ethers.constants.AddressZero);
  });

  it('should validate SpotMarketProxy owned by DAO Safe', async () => {
    const { SpotMarketProxy: address } = meta.contracts;
    const Contract = new ethers.Contract(address, contractOwnershipAbi, provider);
    const [owner, nominatedOwner] = await Promise.all([
      Contract.owner().catch(() => ethers.constants.AddressZero),
      Contract.nominatedOwner().catch(() => ethers.constants.AddressZero),
    ]);
    log({ name: 'SpotMarketProxy', address, owner, nominatedOwner });

    assert.equal(owner, OWNER_ADDRESS);
    assert.equal(nominatedOwner, ethers.constants.AddressZero);
  });

  it('should validate PerpsMarketProxy owned by DAO Safe', async () => {
    const { PerpsMarketProxy: address } = meta.contracts;
    const Contract = new ethers.Contract(address, contractOwnershipAbi, provider);
    const [owner, nominatedOwner] = await Promise.all([
      Contract.owner().catch(() => ethers.constants.AddressZero),
      Contract.nominatedOwner().catch(() => ethers.constants.AddressZero),
    ]);
    log({ name: 'PerpsMarketProxy', address, owner, nominatedOwner });

    assert.equal(owner, OWNER_ADDRESS);
    assert.equal(nominatedOwner, ethers.constants.AddressZero);
  });

  it('should validate PerpsAccountProxy owned by PerpsMarketProxy Contract', async () => {
    const { PerpsAccountProxy: address } = meta.contracts;
    const Contract = new ethers.Contract(address, contractOwnershipAbi, provider);
    const [owner, nominatedOwner] = await Promise.all([
      Contract.owner().catch(() => ethers.constants.AddressZero),
      Contract.nominatedOwner().catch(() => ethers.constants.AddressZero),
    ]);
    log({ name: 'PerpsAccountProxy', address, owner, nominatedOwner });

    assert.equal(owner, meta.contracts.PerpsMarketProxy);
    assert.equal(nominatedOwner, ethers.constants.AddressZero);
  });

  it('should validate approved pools owned by DAO Safe', async () => {
    const approvedPools = await CoreProxy.getApprovedPools();
    const preferredPool = await CoreProxy.getPreferredPool();
    log({ approvedPools, preferredPool });
    const pools = Object.fromEntries(
      await Promise.all(
        [{ poolId: preferredPool, isPreferred: true }]
          .concat(approvedPools.map((poolId) => ({ poolId, isPreferred: false })))
          .map(async ({ poolId, isPreferred }) => {
            const [name, owner, nominatedOwner] = await Promise.all([
              CoreProxy.getPoolName(poolId),
              CoreProxy.getPoolOwner(poolId),
              CoreProxy.getNominatedPoolOwner(poolId),
            ]);
            return [poolId, { isPreferred, name, owner, nominatedOwner }];
          })
      )
    );
    log({ pools });
    assert.deepEqual(pools, {
      1: {
        name: 'Spartan Council Pool',
        owner: OWNER_ADDRESS,
        isPreferred: true,
        nominatedOwner: ethers.constants.AddressZero,
      },
    });
  });
});
