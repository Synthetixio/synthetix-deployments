pragma solidity ^0.8.21;

import "./Common.sol";

contract Stub_Test is CommonTest {
    function test_stub() public {
        address ALICE = vm.addr(0xA11CE);
        vm.label(ALICE, "0xA11CE");
        vm.deal(ALICE, 1 ether);

        vm.startPrank(ALICE);
        uint128 accountId = CoreProxy.createAccount();

        assertEq(address(ALICE), AccountProxy.ownerOf(accountId), "ALICE is owner of account");
    }
}
