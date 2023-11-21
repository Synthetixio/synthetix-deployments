const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const CoreProxyDeployment = require('../../deployments/CoreProxy.json');
const meta = require('../../deployments/meta.json');

// const TESTNET_DEPLOYER = '0x48914229deDd5A9922f44441ffCCfC2Cb7856Ee9';
const DAO_GNOSIS_SAFE = '0xb48AecD3CA86a7bE44baEbB6b8BAb77CDf612D14';

describe('Ownership checks', function () {
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    provider
  );

  it('should validate Proxies ownership', async () => {
    const abi = [
      'function owner() view returns (address)',
      'function nominatedOwner() view returns (address)',
    ];
    log({ contracts: meta.contracts });
    const owners = Object.fromEntries(
      await Promise.all(
        Object.entries(meta.contracts).map(async ([name, address]) => {
          const Contract = new ethers.Contract(address, abi, provider);
          const [owner, nominatedOwner] = await Promise.all([
            Contract.owner().catch(() => ethers.constants.AddressZero),
            Contract.nominatedOwner().catch(() => ethers.constants.AddressZero),
          ]);
          return [name, { name, owner, nominatedOwner }];
        })
      )
    );
    log({ owners });

    assert.deepEqual(owners.CoreProxy, {
      name: 'CoreProxy',
      owner: DAO_GNOSIS_SAFE,
      nominatedOwner: ethers.constants.AddressZero,
    });

    assert.deepEqual(owners.AccountProxy, {
      name: 'AccountProxy',
      owner: meta.contracts.CoreProxy,
      nominatedOwner: ethers.constants.AddressZero,
    });

    assert.deepEqual(owners.USDProxy, {
      name: 'USDProxy',
      owner: meta.contracts.CoreProxy,
      nominatedOwner: ethers.constants.AddressZero,
    });

    assert.deepEqual(owners.OracleManagerProxy, {
      name: 'OracleManagerProxy',
      owner: DAO_GNOSIS_SAFE,
      nominatedOwner: ethers.constants.AddressZero,
    });

    assert.deepEqual(owners.SpotMarketProxy, {
      name: 'SpotMarketProxy',
      owner: DAO_GNOSIS_SAFE,
      nominatedOwner: ethers.constants.AddressZero,
    });

    assert.deepEqual(owners.PerpsMarketProxy, {
      name: 'PerpsMarketProxy',
      owner: DAO_GNOSIS_SAFE,
      nominatedOwner: ethers.constants.AddressZero,
    });

    assert.deepEqual(owners.PerpsAccountProxy, {
      name: 'PerpsAccountProxy',
      owner: meta.contracts.PerpsMarketProxy,
      nominatedOwner: ethers.constants.AddressZero,
    });

    assert.deepEqual(owners.FakeCollateralTKN, {
      name: 'FakeCollateralTKN',
      owner: ethers.constants.AddressZero,
      nominatedOwner: ethers.constants.AddressZero,
    });
  });

  it('should validate approved pools ownership', async () => {
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
        owner: DAO_GNOSIS_SAFE,
        isPreferred: true,
        nominatedOwner: ethers.constants.AddressZero,
      },
    });
  });
});
