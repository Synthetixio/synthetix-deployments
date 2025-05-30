pragma solidity ^0.8.21;

import {Test} from "forge-std/Test.sol";
import {CannonDeploy} from "./CannonDeploy.sol";
import {ICoreProxy, PoolCollateralConfiguration, CollateralConfiguration} from "deployments/sol/ICoreProxy.sol";
import {IAccountProxy} from "deployments/sol/IAccountProxy.sol";
import {ITreasuryMarketProxy} from "deployments/sol/ITreasuryMarketProxy.sol";
import {ITreasuryStakingProxy} from "deployments/sol/ITreasuryStakingProxy.sol";
import {ILegacyMarketProxy} from "deployments/sol/ILegacyMarketProxy.sol";
import {IV2x} from "deployments/sol/IV2x.sol";
import {IV2xUsd} from "deployments/sol/IV2xUsd.sol";
import {IERC20} from "@synthetixio/core-contracts/contracts/interfaces/IERC20.sol";

interface IAddressResolver {
    function getAddress(bytes32 name) external view returns (address);
}

contract CommonTest is Test {
    ICoreProxy internal CoreProxy;
    IAccountProxy internal AccountProxy;
    ITreasuryMarketProxy internal TreasuryMarketProxy;
    ITreasuryStakingProxy internal TreasuryStakingProxy;
    ILegacyMarketProxy internal LegacyMarketProxy;
    IV2x internal V2x;
    IV2xUsd internal V2xUsd;
    IAddressResolver internal V2xResolver;

    IERC20 internal $SNX;
    IERC20 internal $snxUSD;
    IERC20 internal $sUSD;

    uint256 internal fork;

    CannonDeploy internal deployer;

    constructor() {
        deployer = new CannonDeploy();

        string memory root = vm.projectRoot();
        string memory metaPath = string.concat(root, "/../../deployments/meta.json");
        string memory metaJson = vm.readFile(metaPath);

        CoreProxy = ICoreProxy(vm.parseJsonAddress(metaJson, ".contracts.CoreProxy"));
        vm.label(address(CoreProxy), "CoreProxy");

        AccountProxy = IAccountProxy(vm.parseJsonAddress(metaJson, ".contracts.AccountProxy"));
        vm.label(address(AccountProxy), "AccountProxy");

        TreasuryMarketProxy = ITreasuryMarketProxy(vm.parseJsonAddress(metaJson, ".contracts.TreasuryMarketProxy"));
        vm.label(address(TreasuryMarketProxy), "TreasuryMarketProxy");

        TreasuryStakingProxy = ITreasuryStakingProxy(vm.parseJsonAddress(metaJson, ".contracts.TreasuryStakingProxy"));
        vm.label(address(TreasuryStakingProxy), "TreasuryStakingProxy");

        LegacyMarketProxy = ILegacyMarketProxy(vm.parseJsonAddress(metaJson, ".contracts.LegacyMarketProxy"));
        vm.label(address(LegacyMarketProxy), "LegacyMarketProxy");
    }

    function setUp() public {
        fork = vm.createFork(vm.envString("RPC_MAINNET"));
        vm.selectFork(fork);

        assertEq(vm.activeFork(), fork);

        // Pyth bypass
        vm.etch(0x1234123412341234123412341234123412341234, "FORK");

        V2xResolver = IAddressResolver(LegacyMarketProxy.v2xResolver());
        vm.label(address(V2xResolver), "V2xResolver");

        V2x = IV2x(V2xResolver.getAddress("Synthetix"));
        vm.label(address(V2x), "V2x");

        V2xUsd = IV2xUsd(V2xResolver.getAddress("SynthsUSD"));
        vm.label(address(V2xUsd), "V2xUsd");

        $sUSD = IERC20(V2xResolver.getAddress("ProxysUSD"));
        vm.label(address($sUSD), "$sUSD");

        $SNX = IERC20(V2xResolver.getAddress("ProxySynthetix"));
        vm.label(address($SNX), "$SNX");

        $snxUSD = IERC20(CoreProxy.getUsdToken());
        vm.label(address($snxUSD), "$snxUSD");
    }

    function _bypassTimeouts(address addr) internal {
        vm.startPrank(CoreProxy.owner());
        CoreProxy.setConfig(
            keccak256(abi.encode(bytes32("senderOverrideMinDelegateTime"), addr, uint128(1))),
            0x0000000000000000000000000000000000000000000000000000000000000001
        );
        CoreProxy.setConfig(
            keccak256(abi.encode(bytes32("senderOverrideMinDelegateTime"), addr, TreasuryMarketProxy.poolId())),
            0x0000000000000000000000000000000000000000000000000000000000000001
        );
        CoreProxy.setConfig(
            keccak256(abi.encode(bytes32("senderOverrideWithdrawTimeout"), addr)),
            0x0000000000000000000000000000000000000000000000000000000000000001
        );
        vm.stopPrank();
    }

    function _deal$SNX(address walletAddress, uint256 amount) internal {
        $SNX.balanceOf(walletAddress);
        $SNX.balanceOf(address(CoreProxy));

        vm.startPrank(address(CoreProxy));
        $SNX.transfer(walletAddress, amount);
        vm.stopPrank();
    }

    function _deal$snxUSD(address walletAddress, uint256 amount) internal {
        $snxUSD.balanceOf(walletAddress);
        $snxUSD.balanceOf(address(CoreProxy));

        vm.startPrank(address(CoreProxy));
        $snxUSD.transfer(walletAddress, amount);
        vm.stopPrank();
    }

    function _deal$sUSD(address walletAddress, uint256 amount) internal {
        address SynthRedeemer = V2xResolver.getAddress("SynthRedeemer");

        $sUSD.balanceOf(walletAddress);
        $sUSD.balanceOf(SynthRedeemer);

        vm.startPrank(SynthRedeemer);
        $sUSD.transfer(walletAddress, amount);
        vm.stopPrank();
    }
}
