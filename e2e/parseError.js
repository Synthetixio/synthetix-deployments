const util = require('util');
const { ethers } = require('ethers');

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
      const AllErrors = new ethers.Contract(address, abi, provider);
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
