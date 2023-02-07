# Synthetix Deployments

This is a GitOps repo for deployment of the [Synthetix](https://www.github.com/synthetixio/synthetix-v3) protocol.

## Deployment Guide

- Ensure you have the latest version of [Cannon](https://usecannon.com) installed: `npm i -g @usecannon/cli`.
- After installing for the first time, run `cannon setup` to configure IPFS and a reliable RPC endpoint to communicate with the Cannon package registry.

### Specify Upgrade

- Update the default values in the network-specific omnibus cannonfiles as desired.
- After publishing any new versions of the provisioned packages (`oracle-manager`, `synthetix` and `spot-market`), bump the versions throughout the cannonfiles to match. Add new settings and invoke actions as necessary.

### Execute Upgrade

Conduct the following process for each network:

- Perform a dry-run and confirm that the actions that would be executed by Cannon are expected: `cannon build omnibus-<NETWORK_NAME>.toml --upgrade-from synthetix-omnibus:<CURRENT_VERSION> --network <RPC_URL_FOR_NETWORK_NAME>  --private-key <DEPLOYER_PRIVATE_KEY> --dry-run`
- Remove the dry-run option to execute the upgrade: `cannon build omnibus-<NETWORK_NAME>.toml --upgrade-from synthetix-omnibus:<CURRENT_VERSION> --network <RPC_URL_FOR_NETWORK_NAME> --private-key <DEPLOYER_PRIVATE_KEY>`

### Finalize Upgrade

- Publish your package on the Cannon registry: `cannon publish synthetix-omnibus --private-key <KEY_THAT_HAS_ETH_ON_MAINNET> --tags latest,3`
- Increment the version number in each of the omnibus toml files in the root of the repository and push the change to this repository.
- Finalize the release for the provisioned packages following the instructions under _Finalizing a Release_ in the [Synthetix repository](https://www.github.com/synthetixio/synthetix-v3#finalizing-a-release).
