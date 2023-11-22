import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { 
    createPublicClient,
    createWalletClient,
    Address,
    Hex,
    TransactionRequestBase,
    zeroAddress,
    PublicClient,
    WalletClient,
    custom,
 } from 'viem';
import { EIP7412 } from 'erc7412';
import { PythAdapter } from 'erc7412/dist/src/adapters/pyth';
const TrustedMulticallForwarderDeployment = require('../deployments/TrustedMulticallForwarder.json');

const TrustedMulticallForwarder = new Contract(
    TrustedMulticallForwarderDeployment.address,
    TrustedMulticallForwarderDeployment.abi,
);

function getClients(provider: Provider) {
    const publicClient = createPublicClient({
        transport: custom({
            request: ({ method, params }) =>
                (provider as any).send(method, params),
        }),
    });

    const walletClient = createWalletClient({
        transport: custom({
            request: ({ method, params }) =>
                (provider as any).send(method, params),
        }),
    });
    return {
        publicClient,
        walletClient
    };
}

async function generate7412CompatibleCall(client: PublicClient, txn: Partial<TransactionRequestBase>, pythUrl: string) {
    const converter = new EIP7412([new PythAdapter(pythUrl)], makeMulticall);
    return await converter.enableERC7412(client as any, txn);
}

function makeMulticall(txns: Partial<TransactionRequestBase>[]): {
    operation: string;
    to: Address;
    value: bigint;
    data: Hex;
} {
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
    ]) as `0x${string}`;

    return {
        operation: '1', // multicall is a DELEGATECALL
        to: TrustedMulticallForwarder.address as Address,
        value: totalValue,
        data,
    };
}

export async function contractCall(
    provider: Provider,
    contract: Contract,
    functionName: string,
    params: any,
    pythUrl: string
) {
    const data = contract.interface.encodeFunctionData(functionName, params);
    const txn = {
        'to': contract.address,
        data,
    } as Partial<TransactionRequestBase>;
    const { publicClient } = getClients(provider);

    const call = await generate7412CompatibleCall(publicClient, txn, pythUrl);
    const res = await publicClient.call({ ...call, account: zeroAddress });

    try {
        const multicallValue: any = TrustedMulticallForwarder.interface.decodeFunctionResult(
            'aggregate3Value',
            (res as any).data as any
        );

        if (Array.isArray(multicallValue) && multicallValue[multicallValue.length - 1].success) {
            return contract.interface.decodeFunctionResult(
                functionName,
                multicallValue[multicallValue.length - 1].returnData as any
            );
        } else {
            return contract.interface.decodeFunctionResult(
                functionName,
                (res as any).data as any
            );
        }
    } catch {
        return contract.interface.decodeFunctionResult(
            functionName,
            (res as any).data as any
        );
    }
}

// export async function contractTransaction(
//     from: Address,
//     to: Address,
//     functionName: string,
//     params: any,
//     abi: any,
//     provider: ethers.providers.Provider,
//     pythUrl: string
// ) {
//     const { publicClient, walletClient } = getClients(provider);

//     const data = encodeFunctionData({
//         abi,
//         functionName,
//         args: Array.isArray(params) ? params : [params],
//     });
//     const txn = {
//         account: from,
//         to,
//         data,
//     };
//     const call = await generate7412CompatibleCall(publicClient, txn, pythUrl);
//     const hash = await walletClient.sendTransaction({
//         account: from,
//         to: call.to,
//         data: call.data,
//         value: call.value,
//     });
//     return hash;
// }