const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { getCollateralConfig } = require('../../tasks/getCollateralConfig');
const { getCollateralBalance } = require('../../tasks/getCollateralBalance');
const { isCollateralApproved } = require('../../tasks/isCollateralApproved');
const { approveCollateral } = require('../../tasks/approveCollateral');
const { setUSDCTokenBalance } = require('../../tasks/setUSDCTokenBalance');
const { wrapCollateral } = require('../../tasks/wrapCollateral');
const { unwrapCollateral } = require('../../tasks/unwrapCollateral');
const { syncTime } = require('../../tasks/syncTime');

const extras = require('../../deployments/extras.json');
const CoreProxyDeployment = require('../../deployments/CoreProxy.json');
const SpotMarketProxyDeployment = require('../../deployments/SpotMarketProxy.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

describe(require('path').basename(__filename, '.e2e.js'), function () {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const address = wallet.address;
  const privateKey = wallet.privateKey;

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
    log({ wallet: wallet.address, pk: wallet.privateKey });
    assert.ok(address);
  });

  it('should set ETH balance to 100', async () => {
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 100 });
    assert.equal(await getEthBalance({ address }), 100);
  });

  it('should set USDC balance to 100_000', async () => {
    assert.equal(
      await getCollateralBalance({ address, symbol: 'USDC' }),
      0,
      'New wallet has 0 USDC balance'
    );
    await setUSDCTokenBalance({ wallet, balance: 100_000 });
    assert.equal(await getCollateralBalance({ address, symbol: 'USDC' }), 100_000);
  });

  it('should approve USDC spending for SpotMarket', async () => {
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDC',
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      false,
      'New wallet has not allowed SpotMarket USDC spending'
    );
    await approveCollateral({
      privateKey,
      symbol: 'USDC',
      spenderAddress: SpotMarketProxyDeployment.address,
    });
    assert.equal(
      await isCollateralApproved({
        address,
        symbol: 'USDC',
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      true
    );
  });

  it('should wrap maximum USDC from allowed global limit of 50_000', async () => {
    const currentMarketCollateral = parseFloat(
      ethers.utils.formatUnits(
        await CoreProxy.getMarketCollateralValue(extras.synth_usdc_market_id)
      )
    );
    log({ currentMarketCollateral });
    assert.ok(currentMarketCollateral < 50_000);
    const maxWrap = Math.floor(50_000 - currentMarketCollateral);
    log({ maxWrap });
    assert.notEqual(maxWrap, 0, 'check that we can wrap more than 0 USDC');
    const balance = await wrapCollateral({ wallet, symbol: 'USDC', amount: maxWrap });
    log({ balance });
    assert.equal(balance, maxWrap);
  });

  it('should reject wrapping even $1 more USDC', async () => {
    const newMarketCollateral = parseFloat(
      ethers.utils.formatUnits(
        await CoreProxy.getMarketCollateralValue(extras.synth_usdc_market_id)
      )
    );
    assert.ok(
      50_000 - newMarketCollateral < 1,
      'Less than 1 USDC left before reaching max collateral limit'
    );
    await assert.rejects(async () => await wrapUsdc({ wallet, amount: 1 }));
  });

  it('should unwrap all the sUSDC back to USDC and reduce market collateral', async () => {
    const sUsdcBalance = await getCollateralBalance({ address, symbol: 'sUSDC' });
    log({ sUsdcBalance });
    const balance = await unwrapCollateral({ wallet, symbol: 'USDC', amount: sUsdcBalance });
    log({ balance });
    assert.equal(balance, 0);
    assert.equal(await getCollateralBalance({ address, symbol: 'USDC' }), 100_000);
  });
});
