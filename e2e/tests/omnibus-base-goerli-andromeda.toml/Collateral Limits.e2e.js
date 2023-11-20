const assert = require('assert');
const { ethers } = require('ethers');
require('../../inspect');

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { isTokenApproved } = require('../../tasks/isTokenApproved');
const { approveToken } = require('../../tasks/approveToken');
const { getTokenBalance } = require('../../tasks/getTokenBalance');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { wrapUsdc } = require('../../tasks/wrapUsdc');
const { unwrapUsdc } = require('../../tasks/unwrapUsdc');

const extras = require('../../deployments/extras.json');
const CoreProxyDeployment = require('../../deployments/CoreProxy.json');
const SpotMarketProxyDeployment = require('../../deployments/SpotMarketProxy.json');
const USDCDeployment = require('../../deployments/FakeCollateralTKN.json');

describe('Collateral Limits', function () {
  let wallet;
  let address;
  let privateKey;
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

  const CoreProxy = new ethers.Contract(
    CoreProxyDeployment.address,
    CoreProxyDeployment.abi,
    provider
  );

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

  it('should set USDC balance to 10_000_000', async () => {
    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: USDCDeployment.address }),
      0,
      'New wallet has 0 USDC balance'
    );
    await setMintableTokenBalance({
      privateKey,
      tokenAddress: USDCDeployment.address,
      balance: 10_000_000,
    });
    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: USDCDeployment.address }),
      10_000_000
    );
  });

  it('should approve USDC spending for SpotMarket', async () => {
    assert.equal(
      await isTokenApproved({
        walletAddress: address,
        tokenAddress: USDCDeployment.address,
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      false,
      'New wallet has not allowed SpotMarket USDC spending'
    );
    await approveToken({
      privateKey,
      tokenAddress: USDCDeployment.address,
      spenderAddress: SpotMarketProxyDeployment.address,
    });
    assert.equal(
      await isTokenApproved({
        walletAddress: address,
        tokenAddress: USDCDeployment.address,
        spenderAddress: SpotMarketProxyDeployment.address,
      }),
      true
    );
  });

  it('should wrap maximum USDC from allowed global limit of $5_000_000', async () => {
    const currentMarketCollateral = parseFloat(
      ethers.utils.formatUnits(
        await CoreProxy.getMarketCollateralValue(extras.synth_usdc_market_id)
      )
    );
    assert.ok(currentMarketCollateral < 5_000_000);
    const maxWrap = Math.floor(5_000_000 - currentMarketCollateral);
    assert.notEqual(maxWrap, 0, 'check that we can wrap more than 0 USDC');
    const balance = await wrapUsdc({ wallet, amount: maxWrap });
    assert.equal(balance, maxWrap);
  });

  it('should reject wrapping even $1 more USDC', async () => {
    const newMarketCollateral = parseFloat(
      ethers.utils.formatUnits(
        await CoreProxy.getMarketCollateralValue(extras.synth_usdc_market_id)
      )
    );
    assert.ok(
      5_000_000 - newMarketCollateral < 1,
      'Less than 1 USDC left before reaching max collateral limit'
    );
    await assert.rejects(async () => await wrapUsdc({ wallet, amount: 1 }));
  });

  it('should unwrap all the sUSDC back to USDC and reduce market collateral', async () => {
    const sUsdcBalance = await getTokenBalance({
      walletAddress: address,
      tokenAddress: extras.synth_usdc_token_address,
    });
    const balance = await unwrapUsdc({ wallet, amount: sUsdcBalance });
    assert.equal(balance, 0);
    assert.equal(
      await getTokenBalance({ walletAddress: address, tokenAddress: USDCDeployment.address }),
      10_000_000
    );
  });
});
