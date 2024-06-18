# Synthetix Deployments

This is a GitOps repo for deployment of the [Synthetix](https://www.github.com/synthetixio/synthetix-v3) protocol.

## Deployment Guide

- Run `yarn` to install the latest dependencies
- Run `yarn cannon setup` and ensure you’ve set the IPFS endpoint for publishing to the Synthetix cluster.

### Specify Upgrade

- After [publishing any new versions of the provisioned packages](https://github.com/synthetixio/synthetix-v3#deployment-guide) (`oracle-manager`, `synthetix` and `spot-market`), bump the versions throughout the cannonfiles to match.
- Add new settings and invoke actions as necessary.
- Increment the version number and update the values in the network-specific omnibus cannonfiles as desired.

### Execute Upgrade

Conduct the following process for each network:

- Perform a dry-run and confirm that the actions that would be executed by Cannon are expected:

  ```sh
  yarn cannon build omnibus-base-sepolia-andromeda.toml --dry-run --upgrade-from synthetix-omnibus:latest@andromeda --chain-id 84532 --provider-url https://base-sepolia.infura.io/v3/$INFURA_API_KEY
  ```

- Remove the dry-run option to execute the upgrade:

  ```sh
  yarn cannon build omnibus-base-sepolia-andromeda.toml --upgrade-from synthetix-omnibus:latest@andromeda --private-key $TESTNET_DEPLOYER_PRIVATE_KEY --provider-url https://base-sepolia.infura.io/v3/$INFURA_API_KEY
  ```

- After this you can run the dry-run command again (without upgrade-from), and should see no changes

  ```sh
  yarn cannon build omnibus-base-sepolia-andromeda.toml --dry-run --chain-id 84532 --provider-url https://base-sepolia.infura.io/v3/$INFURA_API_KEY
  ```

_The --provider-url and --private-key parameters are unnecessary if using [Frame](https://frame.sh/)_

### Finalize Release

- If you've updated the provisioned packages, verify your new contracts on Etherscan:

  ```sh
    yarn cannon verify synthetix-omnibus@andromeda --chain-id 84532 --api-key $ETHERSCAN_API_KEY
  ```

- Publish your new packages on the Cannon registry:

  ```sh
  yarn cannon publish synthetix-omnibus@andromeda --chain-id 84532 --private-key $MAINNET_DEPLOYER_PRIVATE_KEY
  ```

  If you use frame:
  (_The --private-key parameter is unnecessary if using [Frame](https://frame.sh/)_)

- Commit and merge the change to this repository.
- Run the [**Export ABIs** action](https://github.com/Synthetixio/v3-abi-exporter/actions/workflows/main.yml) in the `v3-abi-exporter` repository.

## Fork-testing locally

Example based on `omnibus-base-sepolia-andromeda.toml`

1. Run local Anvil node for the required network.

   ```sh
   yarn cannon build omnibus-base-sepolia-andromeda.toml --port 8545 --keep-alive --dry-run --upgrade-from synthetix-omnibus:latest@andromeda --chain-id 84532 --provider-url https://sepolia.base.org | tee ./e2e/cannon-build.log
   ```

   or

   ```sh
   yarn start:base-sepolia
   ```

2. Fetch deployments and store as JSON files

   ```sh
   yarn fetch-deployments
   ```

3. Update all prices
   You may need to run this once an hour while fork is running

   ```sh
   node ./e2e/tasks/doAllPriceUpdates.js 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

   or

   ```sh
   yarn update-prices
   ```

4. Execute tests
   ```sh
   DEBUG='e2e:*' mocha e2e/tests/omnibus-base-sepolia-andromeda.toml/*.e2e.js
   ```
   or
   ```sh
   yarn test:base-sepolia
   ```
