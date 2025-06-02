pragma solidity ^0.8.21;

import "./Common.sol";

contract DebtBurningReset_Test is CommonTest {
    mapping(address => uint128) private acc;

    function test_DebtBurningReset() public {
        address ALI = _makeWallet("0xA11");
        address BOB = _makeWallet("0xB0B");
        address DAO = _makeWallet("0xDA0");
        address GAS = _makeWallet("0xGA5");

        acc[ALI] = _makeBurnPosition(ALI, 500 ether, 120 ether);
        acc[BOB] = _makeBurnPosition(BOB, 500 ether, 120 ether);
        acc[DAO] = _makeBurnPosition(DAO, 500 ether, 120 ether);
        acc[GAS] = _makeBurnPosition(GAS, 500 ether, 120 ether);
        _validatePosition("ALI +0 days", ALI, 0, 0, 0, 120 ether);
        _validatePosition("BOB +0 days", BOB, 0, 0, 0, 120 ether);
        _validatePosition("DAO +0 days", DAO, 0, 0, 0, 120 ether);
        _validatePosition("GAS +0 days", GAS, 0, 0, 0, 120 ether);

        uint256 ts = vm.getBlockTimestamp();

        vm.warp(ts + 30 days);

        // ALI and BOB both burned for 30 days
        _validatePosition("ALI +30 days", ALI, 0, 0, 0, 120 ether);
        _validatePosition("BOB +30 days", BOB, 0, 0, 0, 120 ether);
        _validatePosition("DAO +30 days", DAO, 0, 0, 0, 120 ether);
        _validatePosition("GAS +30 days", GAS, 0, 0, 0, 120 ether);

        _depositAux(ALI, 10 ether); // ~8%
        // BOB has not deposited anything!
        _depositAux(DAO, 10 ether); // ~8%
        _depositAux(GAS, 12 ether); // 10%

        _validatePosition("ALI +30 days", ALI, 10 ether, ts + 30 days, 30 days, 120 ether);
        _validatePosition("BOB +30 days", BOB, 0, 0, 0, 120 ether);
        _validatePosition("DAO +30 days", DAO, 10 ether, ts + 30 days, 30 days, 120 ether);
        _validatePosition("GAS +30 days", GAS, 12 ether, ts + 30 days, 30 days, 120 ether);

        vm.warp(ts + 90 days);
        _validatePosition("ALI +90 days, not burning with 8%", ALI, 10 ether, ts + 30 days, 30 days, 120 ether);
        _validatePosition("BOB +90 days, not burning with 0%", BOB, 0, 0, 0, 120 ether);
        _validatePosition("DAO +90 days, not burning with 8%", DAO, 10 ether, ts + 30 days, 30 days, 120 ether);
        _validatePosition("GAS +90 days, burning +60 days with 10%", GAS, 12 ether, ts + 30 days, 30 days, 100 ether);

        // Update all accounts with new aux token reqs, before introducing 20% ratio with no reset timeout
        TreasuryMarketProxy.reportAuxToken(acc[ALI]);
        TreasuryMarketProxy.reportAuxToken(acc[BOB]);
        // OOPS We did not report AuxToken for DAO // Will have to be RESET!
        // OOPS We did not report AuxToken for GAS

        // Apply cannon changes: Introducing 20% ratio with unlimited reset timeout
        CannonDeploy deployer = new CannonDeploy();
        deployer.run();

        _validatePosition("ALI +90 days, after 0.2 ratio", ALI, 10 ether, ts + 90 days, 90 days, 120 ether);
        _validatePosition("BOB +90 days, after 0.2 ratio", BOB, 0, ts + 90 days, 90 days, 120 ether);
        _validatePosition(
            "WAT? Burning? DAO +90 days, after 0.2 ratio", DAO, 10 ether, ts + 30 days, 30 days, 100 ether
        );
        _validatePosition("GAS +90 days, after 0.2 ratio", GAS, 12 ether, ts + 30 days, 30 days, 100 ether);

        vm.warp(ts + 150 days);

        _depositAux(ALI, 14 ether); // 20%
        _depositAux(DAO, 14 ether); // 20%
        _validatePosition(
            "ALI +150 days, after 20% deposit, started burning", ALI, 24 ether, ts + 150 days, 150 days, 120 ether
        );
        _validatePosition("BOB +150 days, reset", BOB, 0 ether, ts + 90 days, 90 days, 120 ether);
        _validatePosition(
            "DAO +150 days, after 20% deposit, started burning", DAO, 24 ether, ts + 150 days, 90 days, 100 ether
        );
        _validatePosition("GAS +150 days, paused, still 10% deposit", GAS, 12 ether, ts + 30 days, 30 days, 100 ether);

        vm.warp(ts + 180 days);

        _validatePosition("ALI +180 days, burning", ALI, 24 ether, ts + 150 days, 150 days, 110 ether);
        _validatePosition("BOB +180 days, reset", BOB, 0, ts + 90 days, 90 days, 120 ether);
        _validatePosition("DAO +180 days, burning", DAO, 24 ether, ts + 150 days, 90 days, 90 ether);
        _validatePosition("GAS +180 days, paused", GAS, 12 ether, ts + 30 days, 30 days, 100 ether);

        vm.warp(ts + 210 days);

        _validatePosition("ALI +210 days, burning", ALI, 24 ether, ts + 150 days, 150 days, 100 ether);
        _validatePosition("BOB +210 days, reset", BOB, 0, ts + 90 days, 90 days, 120 ether);
        _validatePosition("DAO +210 days, burning", DAO, 24 ether, ts + 150 days, 90 days, 80 ether);
        _validatePosition("GAS +210 days, paused", GAS, 12 ether, ts + 30 days, 30 days, 100 ether);

        // BOB is late but deposits to 20%
        _depositAux(BOB, 24 ether); // 20%
        _validatePosition(
            "BOB +210 days, deposits 20%, started burning", BOB, 24 ether, ts + 210 days, 210 days, 120 ether
        );

        // GA5 wakes up and deposits to 20%
        _depositAux(GAS, 12 ether); // 20%
        _validatePosition("GAS +210 days, deposits 20%, unpaused", GAS, 24 ether, ts + 210 days, 150 days, 100 ether);

        vm.warp(ts + 365 days);
        _validatePosition("ALI +365 days", ALI, 24 ether, ts + 150 days, 150 days, 50 ether);
        _validatePosition("BOB +365 days", BOB, 24 ether, ts + 210 days, 210 days, 70 ether);
        _validatePosition("DAO +365 days", DAO, 24 ether, ts + 150 days, 90 days, 30 ether);
        _validatePosition("GAS +365 days", GAS, 24 ether, ts + 210 days, 150 days, 50 ether);
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
