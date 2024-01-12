const { ethers } = require('ethers');
const numbro = require('numbro');

function readableBigWei(bigNumber) {
  if (bigNumber.eq(ethers.constants.MaxUint256)) {
    return '<code>MaxUint256</code>';
  }
  if (bigNumber.eq(ethers.constants.MaxInt256)) {
    return '<code>MaxInt256</code>';
  }
  return numbro(Number(ethers.utils.formatEther(bigNumber))).format({
    trimMantissa: true,
    thousandSeparated: true,
    average: true,
    mantissa: 2,
    spaceSeparated: true,
  });
}

function readableWei(smallNumber) {
  return numbro(Number(ethers.utils.formatEther(smallNumber))).format({
    trimMantissa: true,
    thousandSeparated: true,
    spaceSeparated: true,
  });
}

function readableBigNumber(bigNumber) {
  return numbro(bigNumber).format({
    trimMantissa: true,
    thousandSeparated: true,
    average: true,
    mantissa: 2,
    spaceSeparated: true,
  });
}

function readableNumber(smallNumber) {
  return numbro(smallNumber).format({
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
};
