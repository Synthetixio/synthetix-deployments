# Synthetix Deployments

This is a GitOps repo for deployment of the [Synthetix](https://www.github.com/synthetixio/synthetix-v3) protocol.

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

## Fork-testing locally

Example based on `omnibus-base-goerli-andromeda.toml`

**IMPORTANT** Restart Anvil node and apply upgrades after each full test suite execution because of the global system state change, which affects things like global collateral limits

1. Build locally with --dry-run

   ```sh
   yarn cannon build omnibus-base-goerli-andromeda.toml \
     --dry-run \
     --preset andromeda \
     --upgrade-from synthetix-omnibus:latest \
     --chain-id 84531 \
     --provider-url https://base-goerli.infura.io/v3/$INFURA_KEY \
     --write-script ./e2e/deployments/upgrade.ndjson \
     --write-script-format json \
       | tee ./e2e/cannon-build.log
   ```

   or

   ```sh
   yarn build:andromeda
   ```

2. Fetch deployments and store as JSON files

   ```sh
   node ./e2e/fetch-deployments.js ./e2e/cannon-build.log
   ```

   or

   ```sh
   yarn fetch-deployments
   ```

3. Run local Anvil node for the required network.

   ```sh
   yarn cannon run synthetix-omnibus:latest@andromeda \
     --chain-id 84531 \
     --provider-url https://base-goerli.infura.io/v3/$INFURA_KEY
   ```

   or

   ```sh
   yarn start:andromeda
   ```

4. Deploy changes to the local fork

   ```sh
   node ./e2e/deploy.js ./e2e/deployments/upgrade.ndjson
   ```

   or

   ```sh
   yarn deploy
   ```

5. Execute tests
   ```sh
   DEBUG='e2e:*' mocha e2e/tests/omnibus-base-goerli-andromeda.toml/*.e2e.js
   ```
   or
   ```sh
   yarn test:andromeda
   ```
