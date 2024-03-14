const assert = require('assert');
const { ethers } = require('ethers');
const { getEthBalance } = require('../../tasks/getEthBalance');
const { setEthBalance } = require('../../tasks/setEthBalance');

describe('Stub', function () {
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
});
