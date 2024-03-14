#!/usr/bin/env node

const { ethers } = require('ethers');

// This task can be used to decode and log out the ERC7412's OracleDataRequired oracleQuery
// That is, if you want to decode "oracleQuery" from: error OracleDataRequired(address oracleContract, bytes oracleQuery);
async function decodeOracleQuery({ oracleQuery }) {
  return ethers.utils.defaultAbiCoder.decode(['uint8', 'uint64', 'bytes32[]'], oracleQuery);
}

module.exports = {
  decodeOracleQuery,
};

if (require.main === module) {
  require('../inspect');
  const [oracleQuery] = process.argv.slice(2);
  decodeOracleQuery({ oracleQuery }).then((data) => console.log(JSON.stringify(data, null, 2)));
}
