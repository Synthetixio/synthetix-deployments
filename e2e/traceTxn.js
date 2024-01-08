const { getArtifacts, renderTrace, ChainDefinition } = require('@usecannon/builder');
const { ethers } = require('ethers');
const cannonState = require('./deployments/cannon.json');

const log = require('debug')(`e2e:${require('path').basename(__filename, '.js')}`);

function traceTxn(tx) {
  return async function (e) {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_URL || 'http://127.0.0.1:8545'
    );
    const traces = await provider.send('trace_transaction', [tx.hash]);
    const artifacts = getArtifacts(new ChainDefinition(cannonState.def), cannonState.state);
    const traceText = renderTrace(artifacts, traces);
    log(traceText);
    throw e;
  };
}

module.exports = {
  traceTxn,
};
