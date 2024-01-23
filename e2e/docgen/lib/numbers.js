const { ethers } = require('ethers');
const numbro = require('numbro');

function rawValue(value) {
  if (value instanceof ethers.BigNumber) {
    if (ethers.constants.MaxUint256.eq(value)) {
      return `<code>MaxUint256</code> / <code>${value.toHexString()}</code>`;
    }
    if (ethers.constants.MaxInt256.eq(value)) {
      return `<code>MaxInt256</code> / <code>${value.toHexString()}</code>`;
    }
    return `<code>${value.toString()}</code> / <code>${value.toHexString()}</code>`;
  }
  return `<code>${JSON.stringify(value)}</code>`;
}

function readableBigWei(value) {
  if (typeof value === 'undefined' || value === null) {
    return 'n/a';
  }
  if (!(value instanceof ethers.BigNumber)) {
    return rawValue(value);
  }
  if (ethers.constants.MaxUint256.eq(value)) {
    return '<code>MaxUint256</code>';
  }
  if (ethers.constants.MaxInt256.eq(value.abs())) {
    return `<code>${value.isNegative() ? '-' : ''}MaxInt256</code>`;
  }
  return numbro(Number(ethers.utils.formatEther(value))).format({
    trimMantissa: true,
    thousandSeparated: true,
    average: true,
    mantissa: 2,
    spaceSeparated: true,
  });
}

function readableWei(value) {
  if (typeof value === 'undefined' || value === null) {
    return 'n/a';
  }
  if (!(value instanceof ethers.BigNumber)) {
    return rawValue(value);
  }
  return numbro(Number(ethers.utils.formatEther(value))).format({
    trimMantissa: true,
    thousandSeparated: true,
    spaceSeparated: true,
  });
}

function readableBigNumber(value) {
  if (typeof value === 'undefined' || value === null) {
    return 'n/a';
  }
  return numbro(value).format({
    trimMantissa: true,
    thousandSeparated: true,
    average: true,
    mantissa: 2,
    spaceSeparated: true,
  });
}

function readableNumber(value) {
  if (typeof value === 'undefined' || value === null) {
    return 'n/a';
  }
  return numbro(value).format({
    trimMantissa: true,
    thousandSeparated: true,
    spaceSeparated: true,
  });
}

module.exports = {
  readableBigWei,
  readableWei,
  readableBigNumber,
  readableNumber,
  rawValue,
};
