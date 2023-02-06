# Synthetix Deployments

This is a GitOps repo for the official deployment of the [Synthetix](https://www.github.com/synthetixio/synthetix-v3) protocol.

This system relies on [Cannon](https://usecannon.com) which be can installed with `npm i -g @usecannon/cli`. Run `cannon setup` to configure IPFS and a reliable RPC endpoint to communicate with the Cannon package registry.

## Deployment Guide

### Specify Upgrade

- Update the default values in the network-specific omnibus cannonfiles as desired.
- After publishing any new versions of the provisioned packages (`oracle-manager`, `synthetix` and `spot-market`), bump the versions throughout the cannonfiles to match. Add new settings and invoke actions as necessary.

### Execute Upgrade

Conduct the following process for each network:

- Perform a dry-run and confirm that the actions that would be executed by Cannon are expected: `cannon build omnibus-<NETWORK_NAME>.toml --upgrade-from synthetix-omnibus:latest --network <RPC_URL_FOR_NETWORK_NAME> --dry-run`
- Remove the dry-run option and add a private key to execute the upgrade: `cannon build omnibus-<NETWORK_NAME>.toml --upgrade-from synthetix-omnibus:latest --network <RPC_URL_FOR_NETWORK_NAME> --private-key <DEPLOYER_PRIVATE_KEY>`
- Verify contracts on Etherscan: `cannon verify synthetix-omnibus --api-key <ETHERSCAN_API_KEY> --chain-id <CHAIN_ID>`

### Finalize Upgrade

- Publish your package on the Cannon registry: `cannon publish synthetix-omnibus --private-key <KEY_THAT_HAS_ETH_ON_MAINNET> --tags latest,3`
- Increment the version number in each of the omnibus toml files in the root of the repository and merge the change.
