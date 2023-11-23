const { ethers } = require('ethers');
const { EIP7412 } = require('erc7412');
const { PythAdapter } = require('erc7412/dist/src/adapters/pyth');
const TrustedMulticallForwarderDeployment = require('../deployments/TrustedMulticallForwarder.json');

const TrustedMulticallForwarder = new ethers.Contract(
  TrustedMulticallForwarderDeployment.address,
  TrustedMulticallForwarderDeployment.abi
);

async function generate7412CompatibleCall(client, txn, pythUrl) {
  const converter = new EIP7412([new PythAdapter(pythUrl)], makeMulticall);
  return await converter.enableERC7412(client, txn);
}

function makeMulticall(txns) {
  let totalValue = BigInt(0);
  for (const txn of txns) {
    totalValue = totalValue + (txn.value || BigInt(0));
  }

  const data = TrustedMulticallForwarder.interface.encodeFunctionData('aggregate3Value', [
    txns.map((txn) => ({
      target: txn.to || zeroAddress,
      callData: txn.data || '0x',
      value: txn.value || '0',
      allowFailure: false,
    })),
  ]);

  return {
    operation: '1', // multicall is a DELEGATECALL
    to: TrustedMulticallForwarder.address,
    value: totalValue,
    data,
  };
}

export async function contractCall(provider, contract, functionName, params, pythUrl) {
  const data = contract.interface.encodeFunctionData(functionName, params);
  const txn = {
    to: contract.address,
    data,
  };
  const { publicClient } = getClients(provider);

  const call = await generate7412CompatibleCall(publicClient, txn, pythUrl);
  const res = await publicClient.call({ ...call, account: zeroAddress });

  try {
    const multicallValue = TrustedMulticallForwarder.interface.decodeFunctionResult(
      'aggregate3Value',
      res.data
    );

    if (Array.isArray(multicallValue) && multicallValue[multicallValue.length - 1].success) {
      return contract.interface.decodeFunctionResult(
        functionName,
        multicallValue[multicallValue.length - 1].returnData
      );
    } else {
      return contract.interface.decodeFunctionResult(functionName, res.data);
    }
  } catch {
    return contract.interface.decodeFunctionResult(functionName, res.data);
  }
}

export async function contractTransaction(
  from,
  provider,
  wallet,
  contract,
  functionName,
  params,
  pythUrl
) {
  const { publicClient } = getClients(provider);

  const data = contract.interface.encodeFunctionData(functionName, params);

  const txn = {
    account: from,
    to: contract.address,
    data,
  };
  const call = await generate7412CompatibleCall(publicClient, txn, pythUrl);

  const tx = await wallet.sendTransaction({
    from,
    to: call.to,
    data: call.data,
    value: call.value,
  });
  return tx;
}
