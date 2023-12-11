const assert = require('assert');
const { ethers } = require('ethers');
const crypto = require('crypto');
require('../../inspect');

const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { getPerpsAccountOwner } = require('../../tasks/getPerpsAccountOwner');
const { getPerpsAccountPermissions } = require('../../tasks/getPerpsAccountPermissions');
const { createPerpsAccount } = require('../../tasks/createPerpsAccount');
const USDCDeployment = require('../../deployments/FakeCollateralfUSDC.json');
const SpotMarketProxyDeployment = require('../../deployments/SpotMarketProxy.json');
const PerpsMarketProxyDeployment = require('../../deployments/PerpsMarketProxy.json');
const { approveToken } = require('../../tasks/approveToken');
const { wrapUsdc } = require('../../tasks/wrapUsdc');
const { setMintableTokenBalance } = require('../../tasks/setMintableTokenBalance');
const { parseError } = require('../../parseError');
const extras = require('../../deployments/extras.json');
const { swapToSusd } = require('../../tasks/swapToSusd');
const meta = require('../../deployments/meta.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.e2e.js')}`);

const { USDProxy: sUSDAddress } = meta.contracts;
const sUSDMarketId = 0;
describe(require('path').basename(__filename, '.e2e.js'), function () {
  const accountId = parseInt(`420${crypto.randomInt(1000)}`);
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const marketId = 200;

  const PerpsMarketProxy = new ethers.Contract(
    PerpsMarketProxyDeployment.address,
    PerpsMarketProxyDeployment.abi,
    wallet
  );

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

  it('should create perps account', async () => {
    assert.equal(
      await getPerpsAccountOwner({ accountId }),
      ethers.constants.AddressZero,
      'New wallet should not have an account yet'
    );
    const createdAccountId = await createPerpsAccount({ wallet, accountId });
    assert.equal(createdAccountId, accountId, 'Account ID');
    assert.equal(await getPerpsAccountOwner({ accountId }), wallet.address);
    const permissions = await getPerpsAccountPermissions({ accountId });
    assert.equal(permissions.length, 0);
  });

  it('should deposit $1000 sUSD as perps margin', async () => {
    // Get some USDC
    await setMintableTokenBalance({
      privateKey: wallet.privateKey,
      tokenAddress: USDCDeployment.address,
      balance: 10_000_000,
    });
    // Approve USDC to spot market, so we can wrap it
    await approveToken({
      privateKey: wallet.privateKey,
      tokenAddress: USDCDeployment.address,
      spenderAddress: SpotMarketProxyDeployment.address,
    });

    const amount = 1000;
    await wrapUsdc({ wallet, amount });
    await swapToSusd({ wallet, marketId: extras.synth_usdc_market_id, amount });
    await approveToken({
      privateKey: wallet.privateKey,
      tokenAddress: sUSDAddress,
      spenderAddress: PerpsMarketProxyDeployment.address,
    });

    assert.equal(
      (await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId)).toString(),
      0
    );

    try {
      await PerpsMarketProxy.connect(wallet).modifyCollateral(accountId, sUSDMarketId, amount, {
        gasLimit: 10_000_000,
      });
    } catch (error) {
      console.log(parseError(error));
    }

    assert.equal(
      (await PerpsMarketProxy.getCollateralAmount(accountId, sUSDMarketId)).toString(),
      amount
    );
  });
});
