const util = require('util');
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
