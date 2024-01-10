const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { getCollateralConfig } = require('../../tasks/getCollateralConfig');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { approveCollateral } = require('../../tasks/approveCollateral');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { wrapCollateral } = require('../../tasks/wrapCollateral');
const { unwrapCollateral } = require('../../tasks/unwrapCollateral');
const { syncTime } = require('../../tasks/syncTime');

const extras = require('../../deployments/extras.json');
const CoreProxyDeployment = require('../../deployments/CoreProxy.json');
const SpotMarketProxyDeployment = require('../../deployments/SpotMarketProxy.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

describe(require('path').basename(__filename, '.e2e.js'), function () {
  let wallet;
  let address;
  let privateKey;
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );

  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    provider
  );

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

  it('should create new random wallet', async () => {
    wallet = ethers.Wallet.createRandom().connect(provider);
    address = wallet.address;
    privateKey = wallet.privateKey;
    assert.ok(address);
  });

  it('should set ETH balance to 100', async () => {
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 100 });
    assert.equal(await getEthBalance({ address }), 100);
  });

  it('should set fUSDC balance to 10_000_000', async () => {
    const { tokenAddress } = await getCollateralConfig('fUSDC');
    assert.equal(
      await getCollateralBalance({ address, symbol: 'fUSDC' }),
      0,
      'New wallet has 0 fUSDC balance'
    );
    await setMintableTokenBalance({ privateKey, tokenAddress, balance: 10_000_000 });
    assert.equal(await getCollateralBalance({ address, symbol: 'fUSDC' }), 10_000_000);
  });

  it('should approve fUSDC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fUSDC',
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      false,
      'New wallet has not allowed SpotMarket fUSDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'fUSDC',
      spenderAddress: SpotMarketProxyDeployment.address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'fUSDC',
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      true
    );
  });

  it('should wrap maximum fUSDC from allowed global limit of $5_000_000', async () => {
    const currentMarketCollateral = parseFloat(
      ethers.utils.formatUnits(
        await CoreProxy.getMarketCollateralValue(extras.synth_usdc_market_id)
      )
    );
    assert.ok(currentMarketCollateral < 5_000_000);
    const maxWrap = Math.floor(5_000_000 - currentMarketCollateral);
    assert.notEqual(maxWrap, 0, 'check that we can wrap more than 0 fUSDC');
    const balance = await wrapCollateral({ wallet, symbol: 'fUSDC', amount: maxWrap });
    assert.equal(balance, maxWrap);
  });

  it('should reject wrapping even $1 more fUSDC', async () => {
    const newMarketCollateral = parseFloat(
      ethers.utils.formatUnits(
        await CoreProxy.getMarketCollateralValue(extras.synth_usdc_market_id)
      )
    );
    assert.ok(
      5_000_000 - newMarketCollateral < 1,
      'Less than 1 fUSDC left before reaching max collateral limit'
    );
    await assert.rejects(async () => await wrapCollateral({ wallet, symbol: 'fUSDC', amount: 1 }));
  });

  it('should unwrap all the sUSDC back to fUSDC and reduce market collateral', async () => {
    const sUsdcBalance = await getCollateralBalance({ address, symbol: 'sUSDC' });
    const balance = await unwrapCollateral({ wallet, symbol: 'fUSDC', amount: sUsdcBalance });
    assert.equal(balance, 0);
    assert.equal(await getCollateralBalance({ address, symbol: 'fUSDC' }), 10_000_000);
  });
});
