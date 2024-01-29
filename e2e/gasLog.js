const { ethers } = require('ethers');

const GAS_REPORT = process.env.GAS_REPORT ? require('path').resolve(process.env.GAS_REPORT) : null;

if (GAS_REPORT) {
  require('fs').writeFileSync(
    GAS_REPORT,
    ['action', 'gasUsed', 'baseFeePerGas'].map((value) => JSON.stringify(value)).join(';') + '\n',
    'utf8'
  );
}

function gasLog({ action, log }) {
  return async (txn) => {
    if (!txn) {
      return txn;
    }
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_URL || 'http://127.0.0.1:8545'
    );
    const block = await provider.getBlock(txn.blockNumber);
    const gasInfo = {
      action,
      gasUsed: txn.gasUsed.toNumber(),
      baseFeePerGas: block.baseFeePerGas.toNumber(),
    };
    log(gasInfo);
    if (GAS_REPORT) {
      await require('fs').promises.appendFile(
        GAS_REPORT,
        Object.values(gasInfo)
          .map((value) => JSON.stringify(value))
          .join(';') + '\n'
      );
    }
    return txn;
  };
}

module.exports = {
  gasLog,
};
