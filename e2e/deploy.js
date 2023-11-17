const util = require('util');
const path = require('path');
const fs = require('fs/promises');
const { ethers } = require('ethers');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.maxArrayLength = null;

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgYellow = '\x1b[33m';
const fgCyan = '\x1b[36m';

ethers.BigNumber.prototype[util.inspect.custom] = function (depth, inspectOptions, inspect) {
  return `${fgCyan}BigNumber( ${fgYellow}${fgGreen}${this.toHexString()} ${fgYellow}${this.toString()}${fgCyan} )${fgReset}`;
};

const [ndjsonTxnsFile] = process.argv.slice(2);
if (!ndjsonTxnsFile) {
  console.error(`${fgRed}ERROR: Expected 1 argument${fgReset}`);
  console.error(`Usage: ${fgGreen}node e2e/deploy.js ${fgCyan}"ndjsonTxnsFile"${fgReset}`);
  console.error(
    `Example: ${fgGreen}node e2e/deploy.js ${fgCyan}"./e2e/deployments/upgrade.ndjson"${fgReset}`
  );
  process.exit(1);
}

async function run() {
  console.log(`Loading update transactions from ${fgCyan}"${ndjsonTxnsFile}"${fgReset}`);
  const ndjson = await fs.readFile(path.resolve(ndjsonTxnsFile), 'utf8');
  const txns = ndjson
    .split('\n')
    .filter(Boolean)
    .flatMap((line) => JSON.parse(line).txns);

  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  for (const { hash, from, to, data, value } of txns) {
    console.log();
    console.log();
    console.log();
    console.log('============================================================================');
    console.log({ hash, from, to, data, value });
    await provider.send('anvil_setBalance', [from, ethers.utils.parseEther('10').toHexString()]);
    await provider.send('anvil_impersonateAccount', [from]);
    const signer = provider.getSigner(from);
    const tx = await signer.sendTransaction({ to, data, value });
    const result = await tx.wait();
    console.log(result);
    await provider.send('anvil_stopImpersonatingAccount', [from]);
    console.log('============================================================================');
  }
}
run();
