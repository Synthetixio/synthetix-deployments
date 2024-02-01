const util = require('util');
const { ethers } = require('ethers');

require('./debugTarget');

// util.inspect.defaultOptions.compact = true;
// util.inspect.defaultOptions.breakLength = Infinity;
util.inspect.defaultOptions.colors = true;
util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.maxArrayLength = null;

const res = '\x1b[0m';
const gr = '\x1b[32m';
const ye = '\x1b[33m';
const cy = '\x1b[36m';

function number(obj) {
  if (obj.eq(ethers.constants.MaxUint256)) {
    return 'MaxUint256';
  }
  if (obj.eq(ethers.constants.MaxInt256)) {
    return 'MaxInt256';
  }
  if (obj.abs().gt(1e10)) {
    // Assuming everything bigger than 1e10 is a wei
    return `wei ${parseFloat(ethers.utils.formatEther(`${obj}`))}`;
  }
  return parseFloat(obj.toString());
}

ethers.BigNumber.prototype[util.inspect.custom] = function (depth, inspectOptions, inspect) {
  const hex = this.toHexString();
  const num = number(this);
  return `${cy}BigNumber( ${ye}${num} ${gr}${hex}${cy} )${res}`;
};
