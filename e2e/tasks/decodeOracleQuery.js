const { ethers } = require('ethers');
require('../inspect');

// This task can be used to decode and log out the ERC7412's OracleDataRequired oracleQuery
// That is, if you want to decode "oracleQuery" from: error OracleDataRequired(address oracleContract, bytes oracleQuery);
function decodeOracleQuery({ oracleQuery }) {
  const offchainDataDecoded = ethers.utils.defaultAbiCoder.decode(
    ['uint8', 'uint64', 'bytes32[]'],
    oracleQuery
  );
  console.log(offchainDataDecoded);
}

module.exports = {
  decodeOracleQuery,
};

if (require.main === module) {
  const [oracleQuery] = process.argv.slice(2);
  decodeOracleQuery({ oracleQuery });
}
