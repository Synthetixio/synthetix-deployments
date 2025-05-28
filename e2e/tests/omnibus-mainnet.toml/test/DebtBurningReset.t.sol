pragma solidity ^0.8.21;

import "./Common.sol";

contract DebtBurningReset_Test is CommonTest {
    function test_DebtBurningReset() public {
        // No $sUSD requirement
        vm.startPrank(TreasuryMarketProxy.owner());
        TreasuryMarketProxy.updateAuxToken(address(TreasuryStakingProxy), 0, 0);

        address ALICE = vm.addr(0xA11CE);
        vm.label(ALICE, "0xA11CE");
        vm.deal(ALICE, 1 ether);

        _deal$SNX(ALICE, 1000 ether);
        _deal$sUSD(ALICE, 1000 ether);

        _bypassTimeouts(ALICE);

        vm.startPrank(ALICE);
        uint128 accountId = CoreProxy.createAccount();

        $SNX.approve(address(CoreProxy), 500 ether);
        CoreProxy.deposit(
            accountId,
            address($SNX),
            500 ether
        );
        CoreProxy.delegateCollateral(
            accountId,
            TreasuryMarketProxy.poolId(),
            address($SNX),
            500 ether,
            1e18
        );

        TreasuryMarketProxy.saddle(accountId);
        // uint256 snxPrice = CoreProxy.getCollateralPrice(address($SNX));
        TreasuryMarketProxy.adjustLoan(accountId, 100 ether);

        uint256 ts = vm.getBlockTimestamp();

        vm.warp(ts + 30 * 24 * 3600);

        (uint128 amount, uint64 lastUpdated, uint32 timeInsufficient,) = TreasuryMarketProxy.auxTokenInfo(accountId);
        assertEq(0, amount, "auxTokenInfo.amount is 0");
        assertEq(0, lastUpdated, "auxTokenInfo.lastUpdated is +0");
        assertEq(0, timeInsufficient, "auxTokenInfo.timeInsufficient is 0 as just deposited");
        assertApproxEqAbs(
            //
            92 ether,
            TreasuryMarketProxy.loanedAmount(accountId),
            1 ether,
            "1mo of burning reduced Loan to ~92"
        );

        // Increase $sUSD requirements to 10%
        vm.startPrank(TreasuryMarketProxy.owner());
        TreasuryMarketProxy.updateAuxToken(address(TreasuryStakingProxy), 0.1 ether, 30 * 24 * 3600);

        vm.warp(ts + 30 * 24 * 3600 + (29 * 24 * 3600));
        assertApproxEqAbs(
            //
            100 ether,
            TreasuryMarketProxy.loanedAmount(accountId),
            1 ether,
            "Burning is reset for now but we can still recover"
        );

        vm.startPrank(ALICE);
        $sUSD.approve(address(TreasuryStakingProxy), 10 ether);
        TreasuryStakingProxy.deposit(accountId, 10 ether); // 10%

        (amount, lastUpdated, timeInsufficient,) = TreasuryMarketProxy.auxTokenInfo(accountId);
        assertEq(10 ether, amount, "auxTokenInfo.amount is 10");
        assertEq(ts + 30 * 24 * 3600 + (29 * 24 * 3600), lastUpdated, "auxTokenInfo.lastUpdated is +30+29 days");
        // TODO: figure out why timeInsufficient is expecting +30+29 and not just +29 (as we only set 10% requirement 29 days ago)
        // assertEq(
        //     29 * 24 * 3600,
        //     timeInsufficient,
        //     "auxTokenInfo.timeInsufficient should be at +29 days, as 5% was not enough"
        // );
        // TODO: figure out why this is broken
        // assertApproxEqAbs(
        //     //
        //     92 ether,
        //     TreasuryMarketProxy.loanedAmount(accountId),
        //     1 ether,
        //     "Burning was paused for the last 30 days and Loan remains at ~92"
        // );
    }
}
