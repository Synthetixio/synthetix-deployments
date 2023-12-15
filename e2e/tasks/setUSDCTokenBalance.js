const { ethers } = require('ethers');
const { getCollateralConfig } = require('./getCollateralConfig');
const { setEthBalance } = require('./setEthBalance');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

const abi = [
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event AuthorizationCanceled(address indexed authorizer, bytes32 indexed nonce)',
  'event AuthorizationUsed(address indexed authorizer, bytes32 indexed nonce)',
  'event Blacklisted(address indexed _account)',
  'event BlacklisterChanged(address indexed newBlacklister)',
  'event Burn(address indexed burner, uint256 amount)',
  'event MasterMinterChanged(address indexed newMasterMinter)',
  'event Mint(address indexed minter, address indexed to, uint256 amount)',
  'event MinterConfigured(address indexed minter, uint256 minterAllowedAmount)',
  'event MinterRemoved(address indexed oldMinter)',
  'event OwnershipTransferred(address previousOwner, address newOwner)',
  'event Pause()',
  'event PauserChanged(address indexed newAddress)',
  'event RescuerChanged(address indexed newRescuer)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event UnBlacklisted(address indexed _account)',
  'event Unpause()',
  'function CANCEL_AUTHORIZATION_TYPEHASH() view returns (bytes32)',
  'function DOMAIN_SEPARATOR() view returns (bytes32)',
  'function PERMIT_TYPEHASH() view returns (bytes32)',
  'function RECEIVE_WITH_AUTHORIZATION_TYPEHASH() view returns (bytes32)',
  'function TRANSFER_WITH_AUTHORIZATION_TYPEHASH() view returns (bytes32)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 value) returns (bool)',
  'function authorizationState(address authorizer, bytes32 nonce) view returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function blacklist(address _account)',
  'function blacklister() view returns (address)',
  'function burn(uint256 _amount)',
  'function cancelAuthorization(address authorizer, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)',
  'function configureMinter(address minter, uint256 minterAllowedAmount) returns (bool)',
  'function currency() view returns (string)',
  'function decimals() view returns (uint8)',
  'function decreaseAllowance(address spender, uint256 decrement) returns (bool)',
  'function increaseAllowance(address spender, uint256 increment) returns (bool)',
  'function initialize(string tokenName, string tokenSymbol, string tokenCurrency, uint8 tokenDecimals, address newMasterMinter, address newPauser, address newBlacklister, address newOwner)',
  'function initializeV2(string newName)',
  'function initializeV2_1(address lostAndFound)',
  'function isBlacklisted(address _account) view returns (bool)',
  'function isMinter(address account) view returns (bool)',
  'function masterMinter() view returns (address)',
  'function mint(address _to, uint256 _amount) returns (bool)',
  'function minterAllowance(address minter) view returns (uint256)',
  'function name() view returns (string)',
  'function nonces(address owner) view returns (uint256)',
  'function owner() view returns (address)',
  'function pause()',
  'function paused() view returns (bool)',
  'function pauser() view returns (address)',
  'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
  'function receiveWithAuthorization(address from, address to, uint256 value, uint256 validAfter, uint256 validBefore, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)',
  'function removeMinter(address minter) returns (bool)',
  'function rescueERC20(address tokenContract, address to, uint256 amount)',
  'function rescuer() view returns (address)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address to, uint256 value) returns (bool)',
  'function transferFrom(address from, address to, uint256 value) returns (bool)',
  'function transferOwnership(address newOwner)',
  'function transferWithAuthorization(address from, address to, uint256 value, uint256 validAfter, uint256 validBefore, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)',
  'function unBlacklist(address _account)',
  'function unpause()',
  'function updateBlacklister(address _newBlacklister)',
  'function updateMasterMinter(address _newMasterMinter)',
  'function updatePauser(address _newPauser)',
  'function updateRescuer(address newRescuer)',
  'function version() view returns (string)',
];

const friendlyWhale = '0x20FE51A9229EEf2cF8Ad9E89d91CAb9312cF3b7A';

async function setUSDCTokenBalance({ wallet, balance }) {
  const config = await getCollateralConfig('USDC');
  console.log(`config`, config);
  const Token = new ethers.Contract(config.tokenAddress, abi, wallet);
  const decimals = await Token.decimals();
  const symbol = await Token.symbol();

  const oldBalance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(wallet.address), decimals)
  );
  log({ symbol, tokenAddress: config.tokenAddress, oldBalance });
  if (oldBalance > balance) {
    log({ result: 'SKIP' });
    return;
  }

  const whaleBalance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(friendlyWhale), decimals)
  );
  log({ friendlyWhale, whaleBalance });

  await wallet.provider.send('anvil_impersonateAccount', [friendlyWhale]);
  const signer = wallet.provider.getSigner(friendlyWhale);
  const transferTx = await Token.connect(signer).transfer(
    wallet.address,
    ethers.utils.parseUnits(`${balance - oldBalance}`, decimals)
  );
  await transferTx.wait();
  await wallet.provider.send('anvil_stopImpersonatingAccount', [friendlyWhale]);

  //  const masterMinter = await Token.masterMinter();
  //  await setEthBalance({ address: masterMinter, balance: 1000 });

  //  console.log(`masterMinter`, masterMinter);
  //  await wallet.provider.send('anvil_impersonateAccount', [masterMinter]);
  //  const signer = wallet.provider.getSigner(masterMinter);
  //  let tx, result;
  //
  //  tx = await Token.connect(signer).configureMinter(
  //    wallet.address,
  //    // ethers.utils.parseEther(`${balance - oldBalance}`)
  //    ethers.constants.MaxUint256
  //  );
  //  result = await tx.wait();
  //  console.log(result);
  //  await wallet.provider.send('anvil_stopImpersonatingAccount', [masterMinter]);
  //
  //  const isMinter = await Token.isMinter(wallet.address);
  //  const minterAllowance = await Token.minterAllowance(wallet.address);
  //  log({ address: wallet.address, isMinter, minterAllowance });
  //
  //  tx = await Token.mint(wallet.address, ethers.utils.parseEther(`${balance - oldBalance}`));
  //
  //  console.log(`tx`, tx);
  //  result = await tx.wait();
  //  console.log(result);
  //
  const newBalance = parseFloat(
    ethers.utils.formatUnits(await Token.balanceOf(wallet.address), decimals)
  );
  log({ symbol, tokenAddress: config.tokenAddress, newBalance });

  return null;
}

module.exports = {
  setUSDCTokenBalance,
};
