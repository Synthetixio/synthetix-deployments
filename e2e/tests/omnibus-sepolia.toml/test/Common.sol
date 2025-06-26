pragma solidity ^0.8.21;

import {Test} from "forge-std/Test.sol";
import {CannonDeploy} from "./CannonDeploy.sol";
import {ICoreProxy} from "deployments/sol/ICoreProxy.sol";
import {IAccountProxy} from "deployments/sol/IAccountProxy.sol";
import { IV4PerpsMarketProxy } from "deployments/sol/IV4PerpsMarketProxy.sol";
import {IUSDProxy} from "deployments/sol/IUSDProxy.sol";

contract CommonTest is Test {
    ICoreProxy internal CoreProxy;
    IAccountProxy internal AccountProxy;
    IV4PerpsMarketProxy internal PerpsMarketProxy;
    IUSDProxy internal mockUSDC;
    uint128 internal collateralId = 1;
    uint256 internal fork;

    constructor() {
        string memory root = vm.projectRoot();
        string memory metaPath =
            string.concat(root, "/../../deployments/meta.json");
        string memory metaJson = vm.readFile(metaPath);

        CoreProxy = ICoreProxy(vm.parseJsonAddress(metaJson, ".contracts.CoreProxy"));
        vm.label(address(CoreProxy), "CoreProxy");

        AccountProxy = IAccountProxy(vm.parseJsonAddress(metaJson, ".contracts.AccountProxy"));
        vm.label(address(AccountProxy), "AccountProxy");

        PerpsMarketProxy = IV4PerpsMarketProxy(vm.parseJsonAddress(metaJson, ".contracts.V4PerpsMarketProxy"));
        vm.label(address(PerpsMarketProxy), "PerpsMarketProxy");
    }

    function setUp() public {
        fork = vm.createFork(vm.envString("RPC_SEPOLIA"));
        vm.selectFork(fork);

        assertEq(vm.activeFork(), fork);

        // Pyth bypass
        vm.etch(0x1234123412341234123412341234123412341234, "FORK");

        CannonDeploy deployer = new CannonDeploy();
        deployer.run();
    
        mockUSDC = IUSDProxy(PerpsMarketProxy.collateralToken());
        vm.label(address(mockUSDC), "CollateralMockUSDC");
    }
}
