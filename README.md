# Synthetix Deployments

This is a GitOps repo for deployment of the [Synthetix](https://www.github.com/synthetixio/synthetix-v3) protocol.

## Deployment Guide

- Ensure you have the latest version of [Cannon](https://usecannon.com) installed: `npm i -g @usecannon/cli`.
- After installing for the first time:
  - Run `cannon setup` to configure IPFS and a reliable RPC endpoint to communicate with the Cannon package registry.
  - Run `npx cannon plugin add @synthetixio/router` to install the router generator plug-in.

### Specify Upgrade

- After [publishing any new versions of the provisioned packages](https://github.com/synthetixio/synthetix-v3#deployment-guide) (`oracle-manager`, `synthetix` and `spot-market`), bump the versions throughout the cannonfiles to match.
- Add new settings and invoke actions as necessary.
- Update the default values in the network-specific omnibus cannonfiles as desired.

### Execute Upgrade

Conduct the following process for each network:

- Perform a dry-run and confirm that the actions that would be executed by Cannon are expected:

```
cannon build omnibus-<NETWORK_NAME>.toml --upgrade-from synthetix-omnibus:latest --network <RPC_URL_FOR_NETWORK_NAME>  --private-key <DEPLOYER_PRIVATE_KEY> --dry-run
```

- Remove the dry-run option to execute the upgrade:

```
cannon build omnibus-<NETWORK_NAME>.toml --upgrade-from synthetix-omnibus:latest --network <RPC_URL_FOR_NETWORK_NAME> --private-key <DEPLOYER_PRIVATE_KEY>
```

### Finalize Release

- Publish your new packages on the Cannon registry:
  - If you upgraded the oracle manager, `cannon publish oracle-manager:<VERSION_NUMBER> --private-key <KEY_THAT_HAS_ETH_ON_MAINNET>`
  - If you upgraded synthetix, `cannon publish synthetix:<VERSION_NUMBER> --private-key <KEY_THAT_HAS_ETH_ON_MAINNET> --tags latest,3`
  - `cannon publish synthetix-omnibus:<VERSION_NUMBER> --private-key <KEY_THAT_HAS_ETH_ON_MAINNET> --tags latest,3`
- Increment the version number in each of the omnibus toml files in the root of the repository. (The version in the repository should always be the next version.)
- Commit and merge the change to this repository.
- Follow the instructions in the [synthetix-v3 repository](https://github.com/synthetixio/synthetix-v3#finalizing-a-release).
