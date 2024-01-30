require('supports-color'); // for prettier logs
const debug = require('debug');
const util = require('util');
const fs = require('fs');

const stream = process.env.DEBUG_TARGET
  ? fs.createWriteStream(require('path').resolve(process.env.DEBUG_TARGET), { flags: 'a' })
  : process.stderr;

function log(...args) {
  return stream.write(util.format(...args) + '\n');
}

debug.log = log;
