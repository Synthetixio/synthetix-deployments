pragma solidity ^0.8.21;

import "./Common.sol";

contract Account_Test is CommonTest {
    function test_createAccount() public {
        address ALICE = vm.addr(0xA11CE);
        vm.label(ALICE, "0xA11CE");
        vm.deal(ALICE, 1 ether);

        vm.startPrank(ALICE);
        uint128 accountId = CoreProxy.createAccount();

        assertEq(address(ALICE), AccountProxy.ownerOf(accountId), "ALICE is owner of account");
    }

    function test_depositCollateral() public {
        address ALICE = vm.addr(0xA11CE);
        vm.label(ALICE, "0xA11CE");
        vm.deal(ALICE, 1 ether);

        vm.startPrank(ALICE);
        uint128 accountId = CoreProxy.createAccount();

        mockUSDC.mint(ALICE, 1000e6);

        vm.startPrank(ALICE);
        PerpsMarketProxy.depositCollateral(accountId, 1, 1000e6);
    }
}
