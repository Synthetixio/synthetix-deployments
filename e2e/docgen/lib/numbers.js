const { ethers } = require('ethers');
const numbro = require('numbro');

function rawValue(rawValue) {
  if (
    typeof rawValue === 'undefined' ||
    rawValue === null ||
    ethers.utils.isAddress(rawValue) ||
    ethers.utils.isHexString(rawValue) ||
    ethers.utils.isBytesLike(rawValue) ||
    ethers.utils.isBytes(rawValue)
  ) {
    return `<code>${JSON.stringify(rawValue)}</code>`;
  }
  try {
    const value = ethers.BigNumber.from(rawValue);
    if (ethers.constants.MaxUint256.eq(value)) {
      return `<code>MaxUint256</code> / <code>${value.toHexString()}</code>`;
    }
    if (ethers.constants.MaxInt256.eq(value)) {
      return `<code>MaxInt256</code> / <code>${value.toHexString()}</code>`;
    }
    return `<code>${value.toString()}</code> / <code>${value.toHexString()}</code>`;
  } catch {
    return `<code>${JSON.stringify(rawValue)}</code>`;
  }
}

function readableBigWei(rawValue) {
  if (typeof rawValue === 'undefined' || rawValue === null) {
    return 'n/a';
  }
  const value = ethers.BigNumber.from(rawValue);
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

function readableWei(rawValue) {
  if (typeof rawValue === 'undefined' || rawValue === null) {
    return 'n/a';
  }
  const value = ethers.BigNumber.from(rawValue);
  if (ethers.constants.MaxUint256.eq(value)) {
    return '<code>MaxUint256</code>';
  }
  if (ethers.constants.MaxInt256.eq(value.abs())) {
    return `<code>${value.isNegative() ? '-' : ''}MaxInt256</code>`;
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
