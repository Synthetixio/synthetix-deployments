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
        mockUSDC.approve(address(PerpsMarketProxy), 1000e6);
        uint256 usdcBalanceBefore = mockUSDC.balanceOf(ALICE);
        uint256 amountBefore = PerpsMarketProxy.getCollateralAmount(accountId, collateralId);

        PerpsMarketProxy.depositCollateral(accountId, 1, 1000e6);

        uint256 amountAfter = PerpsMarketProxy.getCollateralAmount(accountId, collateralId);
        uint256 usdcBalanceAfter = mockUSDC.balanceOf(ALICE);

        assertEq(amountAfter - amountBefore, 1000e6);
        assertEq(usdcBalanceBefore - usdcBalanceAfter, 1000e6);
    }
}
