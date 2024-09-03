#!/usr/bin/env node

require('./inspect');

const os = require('os');
const path = require('path');
const fs = require('fs/promises');
const { getMainLoader } = require('@usecannon/cli/dist/src/loader');
const CANNON_DIRECTORY = path.join(os.homedir(), '.local', 'share', 'cannon');

const fgReset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const fgCyan = '\x1b[36m';

const [buildLog] = process.argv.slice(2);
if (!buildLog) {
  console.error(`${fgRed}ERROR: Expected 1 argument${fgReset}`);
  console.error(`Usage: ${fgGreen}node e2e/fetch-deployments.js ${fgCyan}buildLog${fgReset}`);
  console.error(
    `Example: ${fgGreen}node e2e/fetch-deployments.js ${fgCyan}e2e/cannon-build.log${fgReset}`
  );
  process.exit(1);
}

async function run() {
  const log = require('debug')('e2e:extractCannonState');

  log('Resolving Deployment Data URL from log', { buildLog });
  const cannonLog = await fs.readFile(buildLog, 'utf8');

  const [, url] = cannonLog.match(/Deployment Data\s*│\s*(ipfs:\/\/Qm\S+)/im) || [];
  log(`Resolved URL:`, { url });

  const loader = getMainLoader({
    ipfsUrl: 'https://ipfs.synthetix.io',
    //    ipfsUrl: 'http://127.0.0.1:5001',
    cannonDirectory: CANNON_DIRECTORY,
  });
  const deployments = await loader.ipfs.read(url);
  console.log(JSON.stringify(deployments, null, 2));
}

run();
