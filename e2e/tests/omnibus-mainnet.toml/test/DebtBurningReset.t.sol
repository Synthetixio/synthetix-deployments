pragma solidity ^0.8.21;

import "./Common.sol";

contract DebtBurningReset_Test is CommonTest {
    mapping(address => uint128) private acc;

    function test_DebtBurningReset() public {
        // No $sUSD requirement
        vm.startPrank(TreasuryMarketProxy.owner());
        TreasuryMarketProxy.updateAuxToken(address(TreasuryStakingProxy), 0, 0);

        address ALI = _makeWallet("0xA11");
        address BOB = _makeWallet("0xB0B");
        address GA5 = _makeWallet("0xGA5");

        acc[ALI] = _makeBurnPosition(ALI, 500 ether, 120 ether);
        acc[BOB] = _makeBurnPosition(BOB, 500 ether, 120 ether);
        acc[GA5] = _makeBurnPosition(GA5, 500 ether, 120 ether);

        uint256 ts = vm.getBlockTimestamp();

        vm.warp(ts + 30 days);

        // ALI and BOB both burned for 30 days
        _validatePosition("ALI +30 days", ALI, 0, 0, 0, 110 ether);
        _validatePosition("BOB +30 days", BOB, 0, 0, 0, 110 ether);
        _validatePosition("GA5 +30 days", GA5, 0, 0, 0, 110 ether);

        // ALI deposits 10% sUSD ahead of introduction of Ratio requirement, but BOB has not deposited anything
        _depositAux(ALI, 12 ether); // 10%
        _depositAux(GA5, 12 ether); // 10%

        _validatePosition("ALI +30 days, after deposit", ALI, 12 ether, ts + 30 days, 0, 110 ether);
        _validatePosition("BOB +30 days, no action", BOB, 0, 0, 0, 110 ether);
        _validatePosition("GA5 +30 days", ALI, 12 ether, ts + 30 days, 0, 110 ether);

        // Increase $sUSD requirements to 10%
        vm.startPrank(TreasuryMarketProxy.owner());
        TreasuryMarketProxy.updateAuxToken(address(TreasuryStakingProxy), 0.1 ether, 30 days);

        _validatePosition("ALI +30 days, after 0.1 ratio, no reset", ALI, 12 ether, ts + 30 days, 0, 110 ether);
        _validatePosition("BOB +30 days, after 0.1 ratio, should reset", BOB, 0, 0, 0, 120 ether);
        _validatePosition("GA5 +30 days", GA5, 12 ether, ts + 30 days, 0, 110 ether);

        vm.warp(ts + 59 days);

        // BOB catches up and deposits more
        _depositAux(BOB, 12 ether); // 10%

        _validatePosition("ALI +59 days, keeps burning", ALI, 12 ether, ts + 30 days, 0, 100 ether);
        _validatePosition("BOB +59 days, paused for 59 days", BOB, 12 ether, ts + 59 days, 59 days, 120 ether); // edge case when going from 0, gets full reset treatment
        _validatePosition("GA5 +59 days", GA5, 12 ether, ts + 30 days, 0, 100 ether);

        vm.warp(ts + 90 days);
        _validatePosition("ALI +90 days, keeps burning", ALI, 12 ether, ts + 30 days, 0, 90 ether);
        _validatePosition(
            "BOB +90 days, paused for 59 days, burning for 31 days", BOB, 12 ether, ts + 59 days, 59 days, 110 ether
        );
        _validatePosition("GA5 +90 days", GA5, 12 ether, ts + 30 days, 0, 90 ether);

        vm.warp(ts + 150 days);

        // ALI deposits 20% sUSD ahead of introduction of 0.2 Ratio requirement, but BOB does not
        _depositAux(ALI, 12 ether); // 20%
        _validatePosition("ALI +150 days, after 20% deposit", ALI, 24 ether, ts + 150 days, 0, 70 ether);
        _validatePosition(
            "BOB +150 days, paused for 59 days, burning for 111 days", BOB, 12 ether, ts + 59 days, 59 days, 90 ether
        );
        _validatePosition("GA5 +150 days, still 10% deposit", GA5, 12 ether, ts + 30 days, 0, 70 ether);

        vm.warp(ts + 180 days);

        // Update all accounts with new aux token reqs, before introducing 20% ratio with no reset timeout
        TreasuryMarketProxy.reportAuxToken(acc[ALI]);
        TreasuryMarketProxy.reportAuxToken(acc[BOB]);
        // OOPS We did not report AuxToken for GA5

        _validatePosition("ALI +180 days, keeps burning", ALI, 24 ether, ts + 180 days, 0, 60 ether);
        _validatePosition(
            "BOB +180 days, paused for 59 days, burning for 121 days", BOB, 12 ether, ts + 180 days, 59 days, 80 ether
        );
        _validatePosition("GA5 +180 days, keeps burning", GA5, 12 ether, ts + 30 days, 0, 60 ether);

        // Introducing 20% ratio with unlimited reset timeout
        vm.startPrank(TreasuryMarketProxy.owner());
        TreasuryMarketProxy.updateAuxToken(address(TreasuryStakingProxy), 0.2 ether, type(uint128).max);

        _validatePosition("ALI +180 days, after 0.2 ratio", ALI, 24 ether, ts + 180 days, 0, 60 ether);
        _validatePosition("BOB +180 days, after 0.2 ratio", BOB, 12 ether, ts + 180 days, 59 days, 80 ether);
        _validatePosition("GA5 +180 days, after 0.2 ratio", GA5, 12 ether, ts + 30 days, 0, 60 ether);

        vm.warp(ts + 210 days);
        _validatePosition("ALI +210 days", ALI, 24 ether, ts + 180 days, 0, 50 ether);
        _validatePosition(
            "BOB +210 days, paused burning after 0.2 ratio", BOB, 12 ether, ts + 180 days, 59 days, 80 ether
        );
        _validatePosition("GA5 +210 days, paused burning after 0.2 ratio", GA5, 12 ether, ts + 30 days, 0, 60 ether);

        // BOB is late again but deposits to 20%
        _depositAux(BOB, 12 ether); // 20%
        _validatePosition("BOB +210 days, deposits 20%", BOB, 24 ether, ts + 210 days, 89 days, 80 ether);

        // GA5 wakes up and deposits to 20%
        _depositAux(GA5, 12 ether); // 20%
        _validatePosition("GA5 +210 days, deposits 20%", GA5, 24 ether, ts + 210 days, 30 days, 60 ether);

        vm.warp(ts + 365 days);
        _validatePosition("ALI +365 days", ALI, 24 ether, ts + 180 days, 0, 0 ether);
        _validatePosition(
            "BOB +365 days, missing out on 89 days of burning", BOB, 24 ether, ts + 210 days, 89 days, 30 ether
        );
        _validatePosition(
            "GA5 +365 days, missing out on 30 days of burning", GA5, 24 ether, ts + 210 days, 30 days, 10 ether
        );
    }

    function _makeWallet(string memory name) private returns (address addr) {
        addr = makeAddr(name);
        //        addr = vm.addr(0xA11CE);
        vm.deal(addr, 1 ether);
        _deal$SNX(addr, 1000 ether);
        _deal$sUSD(addr, 1000 ether);
        _bypassTimeouts(addr);
    }

    function _makeBurnPosition(address addr, uint256 collateralAmount, uint256 loanAmount)
        private
        returns (uint128 accountId)
    {
        vm.startPrank(addr);
        accountId = CoreProxy.createAccount();

        $SNX.approve(address(CoreProxy), collateralAmount);
        CoreProxy.deposit(accountId, address($SNX), collateralAmount);
        CoreProxy.delegateCollateral(accountId, TreasuryMarketProxy.poolId(), address($SNX), collateralAmount, 1e18);

        TreasuryMarketProxy.saddle(accountId);
        TreasuryMarketProxy.adjustLoan(accountId, loanAmount);

        vm.stopPrank();
    }

    function _validatePosition(
        string memory prefix,
        address addr,
        uint128 _amount,
        uint256 _lastUpdated,
        uint256 _timeInsufficient,
        uint256 _loanedAmount
    ) private view {
        (uint128 amount, uint64 lastUpdated, uint32 timeInsufficient,) = TreasuryMarketProxy.auxTokenInfo(acc[addr]);
        assertEq(_amount, amount, string.concat(prefix, ": auxTokenInfo.amount"));
        assertEq(_lastUpdated, lastUpdated, string.concat(prefix, ": auxTokenInfo.lastUpdated"));
        assertEq(_timeInsufficient, timeInsufficient, string.concat(prefix, ": auxTokenInfo.timeInsufficient"));
        assertApproxEqAbs(
            //
            _loanedAmount,
            TreasuryMarketProxy.loanedAmount(acc[addr]),
            1 ether,
            string.concat(prefix, ": loanedAmount")
        );
    }

    function _depositAux(address addr, uint128 amount) private {
        vm.startPrank(addr);
        $sUSD.approve(address(TreasuryStakingProxy), amount);
        TreasuryStakingProxy.deposit(acc[addr], amount); // 10%
        vm.stopPrank();
    }
}
