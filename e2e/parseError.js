const util = require('util');
const { ethers } = require('ethers');

const ERC7412_ABI = [
  'error OracleDataRequired(address oracleContract, bytes oracleQuery)',
  'error FeeRequired(uint feeAmount)',
];
const PYTH_ERRORS = [
  // Function arguments are invalid (e.g., the arguments lengths mismatch)
  // Signature: 0xa9cb9e0d
  'error InvalidArgument()',
  // Update data is coming from an invalid data source.
  // Signature: 0xe60dce71
  'error InvalidUpdateDataSource()',
  // Update data is invalid (e.g., deserialization error)
  // Signature: 0xe69ffece
  'error InvalidUpdateData()',
  // Insufficient fee is paid to the method.
  // Signature: 0x025dbdd4
  'error InsufficientFee()',
  // There is no fresh update, whereas expected fresh updates.
  // Signature: 0xde2c57fa
  'error NoFreshUpdate()',
  // There is no price feed found within the given range or it does not exists.
  // Signature: 0x45805f5d
  'error PriceFeedNotFoundWithinRange()',
  // Price feed not found or it is not pushed on-chain yet.
  // Signature: 0x14aebe68
  'error PriceFeedNotFound()',
  // Requested price is stale.
  // Signature: 0x19abf40e
  'error StalePrice()',
  // Given message is not a valid Wormhole VAA.
  // Signature: 0x2acbe915
  'error InvalidWormholeVaa()',
  // Governance message is invalid (e.g., deserialization error).
  // Signature: 0x97363b35
  'error InvalidGovernanceMessage()',
  // Governance message is not for this contract.
  // Signature: 0x63daeb77
  'error InvalidGovernanceTarget()',
  // Governance message is coming from an invalid data source.
  // Signature: 0x360f2d87
  'error InvalidGovernanceDataSource()',
  // Governance message is old.
  // Signature: 0x88d1b847
  'error OldGovernanceMessage()',
  // The wormhole address to set in SetWormholeAddress governance is invalid.
  // Signature: 0x13d3ed82
  'error InvalidWormholeAddressToSet()',
];

function parseError(error) {
  const rpcError = error?.error?.error?.error;
  const errorData = rpcError?.data;
  if (!errorData) {
    throw error;
  }
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL || 'http://127.0.0.1:8545'
  );
  const errorParsed = (() => {
    try {
      const { abi, address } = require('./deployments/AllErrors.json');
      const AllErrors = new ethers.Contract(
        address,
        [...new Set(abi.concat(ERC7412_ABI).concat(PYTH_ERRORS))],
        provider
      );
      const data = AllErrors.interface.parseError(errorData);
      return data;
    } catch (e) {}
    return {};
  })();
  const args = Object.fromEntries(
    Object.entries(errorParsed.args).filter(([key]) => `${parseInt(key)}` !== key)
  );
  error.message = `${errorParsed.name} (${util.inspect(args)})`;
  throw error;
}

module.exports = {
  parseError,
};
