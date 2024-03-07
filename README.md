# Synthetix Deployments

This is a GitOps repo for deployment of the [Synthetix](https://www.github.com/synthetixio/synthetix-v3) protocol.

## Deployment Guide

- Run `yarn cannon setup` and ensure you have a reliable IPFS url for publishing.

### Specify Upgrade

- After [publishing any new versions of the provisioned packages](https://github.com/synthetixio/synthetix-v3#deployment-guide) (`oracle-manager`, `synthetix` and `spot-market`), bump the versions throughout the cannonfiles to match.
- Add new settings and invoke actions as necessary.
- Increment the version number and update the values in the network-specific omnibus cannonfiles as desired. The main version should match synthetix version, and if it a configuration change on the same version use a dash.
  Version: 3.3.5
  Version with config changes: 3.3.5-1

### Execute Upgrade

Conduct the following process for each network:

- Perform a dry-run and confirm that the actions that would be executed by Cannon are expected:

  ```sh
  yarn cannon build omnibus-base-goerli-andromeda.toml \
    --dry-run \
    --upgrade-from synthetix-omnibus:latest@andromeda \
    --provider-url https://base-goerli.infura.io/v3/$INFURA_API_KEY
  ```

- Remove the dry-run option to execute the upgrade:

  ```sh
  yarn cannon build omnibus-base-goerli-andromeda.toml \
    --upgrade-from synthetix-omnibus:latest@andromeda \
    --private-key $TESTNET_DEPLOYER_PRIVATE_KEY \
    --provider-url https://base-goerli.infura.io/v3/$INFURA_API_KEY
  ```

- After this you can run the dry-run command again (without upgrade-from), and should see no changes

  ```sh
  yarn cannon build omnibus-base-goerli-andromeda.toml \
    --dry-run \
    --provider-url https://base-goerli.infura.io/v3/$INFURA_API_KEY
  ```

_The --provider-url and --private-key parameters are unnecessary if using [Frame](https://frame.sh/)_

### Finalize Release

- If you've updated the provisioned packages, verify your new contracts on Etherscan:

  ```sh
    yarn cannon verify synthetix-omnibus:3.3.5-1@andromeda --chain-id 84531 --api-key $ETHERSCAN_API_KEY
  ```

- Publish your new packages on the Cannon registry:

  ```sh
  yarn cannon publish synthetix-omnibus:3.3.5-1@andromeda \
      --chain-id 84531 \
      --private-key $MAINNET_DEPLOYER_PRIVATE_KEY \
      --tags latest,3 \
      --include-provisioned
  ```

  If you use frame:
  (_The --private-key parameter is unnecessary if using [Frame](https://frame.sh/)_)

- Commit and merge the change to this repository.
- Run the [**Export ABIs** action](https://github.com/Synthetixio/v3-abi-exporter/actions/workflows/main.yml) in the `v3-abi-exporter` repository.

## Fork-testing locally

Example based on `omnibus-base-goerli-andromeda.toml`

**IMPORTANT** Restart Anvil node and apply upgrades after each full test suite execution because of the global system state change, which affects things like global collateral limits

1. Build locally with --dry-run

   ```sh
   yarn cannon build omnibus-base-goerli-andromeda.toml \
     --dry-run \
     --upgrade-from synthetix-omnibus:latest@andromeda \
     --provider-url https://base-goerli-rpc.publicnode.com \
       | tee ./e2e/cannon-build.log
   ```

   or

   ```sh
   yarn build:andromeda
   ```

2. Fetch deployments and store as JSON files

   ```sh
   yarn fetch-deployments
   ```

3. Run local Anvil node for the required network.

   ```sh
   yarn cannon build omnibus-base-goerli-andromeda.toml \
      --port 8545 \
      --keep-alive \
      --dry-run \
      --upgrade-from synthetix-omnibus:latest@andromeda \
      --provider-url https://base-goerli-rpc.publicnode.com
   ```

   or

   ```sh
   yarn start:andromeda
   ```

4. Execute tests
   ```sh
   DEBUG='e2e:*' yarn mocha e2e/tests/omnibus-base-goerli-andromeda.toml/*.e2e.js
   ```
   or
   ```sh
   yarn test:andromeda
   ```
