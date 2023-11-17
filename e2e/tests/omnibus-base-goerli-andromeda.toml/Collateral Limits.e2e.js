const assert = require('assert');
const { ethers } = require('ethers');
const { getFakeCollateralTKNBalance } = require('../../tasks/getFakeCollateralTKNBalance');
const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');
const { setFakeCollateralTKNBalance } = require('../../tasks/setFakeCollateralTKNBalance');

describe('Collateral Limits', function () {
  let address;
  let privateKey;

  it('should create new random wallet', async () => {
    const wallet = ethers.Wallet.createRandom();
    address = wallet.address;
    privateKey = wallet.privateKey;
    assert.ok(address);
  });

  it('should set ETH balance to 100', async () => {
    assert.equal(await getEthBalance({ address }), 0, 'New wallet has 0 ETH balance');
    await setEthBalance({ address, balance: 100 });
    assert.equal(await getEthBalance({ address }), 100);
  });

  it('should set TKN balance to 500', async () => {
    assert.equal(await getFakeCollateralTKNBalance({ address }), 0, 'New wallet has 0 TKN balance');
    await setFakeCollateralTKNBalance({ privateKey, balance: 500 });
    assert.equal(await getFakeCollateralTKNBalance({ address }), 500);
  });
});
