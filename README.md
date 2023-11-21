# Kwenta Synthetix Deployments

This the Kwenta GitOps repo for deployment of the [Synthetix](https://www.github.com/synthetixio/synthetix-v3) protocol.

## Deployment Guide

- Ensure you have the latest version of [Cannon](https://usecannon.com) installed: `npm i -g @usecannon/cli`.
- After installing for the first time:
  - Run `cannon setup` to configure IPFS and a reliable RPC endpoint to communicate with the Cannon package registry.
  - Run `cannon plugin add cannon-plugin-router` to install the router generator plug-in.

### Specify Upgrade

- After [publishing any new versions of the provisioned packages](https://github.com/synthetixio/synthetix-v3#deployment-guide) (`oracle-manager`, `synthetix` and `spot-market`), bump the versions throughout the cannonfiles to match.
- Add new settings and invoke actions as necessary.
- Increment the version number and update the values in the network-specific omnibus cannonfiles as desired.

### Execute Upgrade

Conduct the following process for each network:

- Perform a dry-run and confirm that the actions that would be executed by Cannon are expected:

```
cannon build omnibus-<NETWORK_NAME>.toml --upgrade-from synthetix-omnibus:<CURRENT_VERSION> --provider-url <RPC_URL> --chain-id <CHAIN_ID>  --private-key <DEPLOYER_PRIVATE_KEY> --dry-run
```

- Remove the dry-run option to execute the upgrade:

```
cannon build omnibus-<NETWORK_NAME>.toml --upgrade-from synthetix-omnibus:<CURRENT_VERSION> --provider-url <RPC_URL> --chain-id <CHAIN_ID> --private-key <DEPLOYER_PRIVATE_KEY>
```

_The --provider-url and --private-key parameters are unnecessary if using [Frame](https://frame.sh/)_

### Finalize Release

- If you've updated the provisioned packages, verify your new contracts on Etherscan: `cannon verify synthetix-omnibus:<VERSION_NUMBER> --api-key <ETHERSCAN_API_KEY> --chain-id <CHAIN_ID>`. Make sure you set your preset if it's set in the toml files.
- Publish your new packages on the Cannon registry: `cannon publish synthetix-omnibus:<VERSION_NUMBER> --private-key <KEY_THAT_HAS_ETH_ON_MAINNET> --tags latest,3 --chain-id <CHAIN_ID>` (_The --private-key parameter is unnecessary if using [Frame](https://frame.sh/)_)
- Commit and merge the change to this repository.
- Run the [**Export ABIs** action](https://github.com/Synthetixio/v3-abi-exporter/actions/workflows/main.yml) in the `v3-abi-exporter` repository.

# Kwenta Deployment Notes

## Deployment Process

The following steps were used to deploy a forked "Kwenta" version of the protocol:
1. Copied `omnibus-base-goerli-competition.toml` into a new file `kwenta-omnibus-base-goerli-competition.toml`
   - Note that this version was chosen for copying, because it was used for a testnet competition on Base Goerli, and hence was best suited to deploying everything needed for a successful test deployment.
3. Make critical changes to the `.toml` cannonfile:
   1. Update the name of the of the deployment to `kwenta-synthetix-omnibus` instead of `synthetix-omnibus` - a new name is needed so we can separate our system in the registry from the one synthetix have already deployed and are managing.
   2. Update `setting.target_preset` to a new value just for our system (TODO: check why I did this & if it is really necessary).
   3. Update `setting.salt` to a unique value. This is needed to avoid a collision with the already deployed system, as use of CREATE2 will cause the same addresses to be generated, without a unique salt.
   4. Update the various `owner` settings to the chosen owner for the system. Without this change, it will not be possible to administrate the system. The following settings needs updating with this change:
       - `setting.owner`
      - `setting.pool_owner`
      - `setting.ccip_router` - normally this would be the [Cross Chain Interoperability Protocol Router](https://chain.link/cross-chain), but for testing purposes we will set it as the system owner here. 
   5. Update `setting.deployer` address to the chosen deployer address. Without this change the deployment will fail. I used the same `owner` and `deployer` for simplicity (though in production it may be wise to use different addresses for security reasons)

## Interacting with the Kwenta Synthetix V3 version

Kwenta has now deployed a version of Synthetix V3 on Base Goerli testnet. The name of this deployment is [kwenta-synthetix-omnibus-test-3](https://usecannon.com/packages/kwenta-synthetix-omnibus-test-3/3.3.3-dev.e141cd8c/84531-main). To interact with this can either [use the the UI here](https://usecannon.com/packages/kwenta-synthetix-omnibus-test-3/3.3.3-dev.e141cd8c/84531-main/interact/system/InitialCoreProxy/0x24DE4907c00B0b7aF1E78E1A11a480D047C1b063), or use this command via cannon:
```bash
cannon interact --chain-id 84531 --provider-url <BASE_GOERLI_PROVIDER_URL> --private-key <PRIVATE_KEY> kwenta-synthetix-omnibus-test-3
```
- `<BASE_GOERLI_PROVIDER_URL> ` should be an RPC url for an eth node on the Base Goerli network.
- `<PRIVATE_KEY>` can be any private key you want to use when executing transactions against the deployment. Use the Kwenta Testnet Admin (address: 0xC2ecD777d06FFDF8B3179286BEabF52B67E9d991) private key if you want to do privileged actions.
