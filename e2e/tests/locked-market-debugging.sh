#
## [(1, 95, 1000000000000000000 [1e18]), (2, 1, 1000000000000000000 [1e18]), (3, 1, 1000000000000000000 [1e18]), (4, 1, 1000000000000000000 [1e18]), (5, 1, 1000000000000000000 [1e18]), (6, 1, 1000000000000000000 [1e18])]
#

export CoreProxy="0xffffffaEff0B96Ea8e4f94b2253f31abdD875847"
export isMarketCapacityLocked="function isMarketCapacityLocked(uint128 marketId) external view returns (bool)"


export SpotMarketProxy="0xa65538A6B9A8442854dEcB6E3F85782C60757D60"
export minimumCredit="function minimumCredit(uint128 marketId) view returns (uint256)"
export name="function name(uint128 marketId) view returns (string)"
export reportedDebt="function reportedDebt(uint128 marketId) view returns (uint256 reportedDebtAmount)"
export getCollateralLeverage="function getCollateralLeverage(uint128 synthMarketId) view returns (uint256 collateralLeverage)"
export owner="function owner() view returns (address)"

export setCollateralLeverage="function setCollateralLeverage(uint128 synthMarketId, uint256 collateralLeverage)"
export newCollateralLeverage="10000000000000000000"
#export newCollateralLeverage="$(cast max-uint)"
export spotOwner=$(cast call $SpotMarketProxy $owner)

echo
echo anvil_impersonateAccount $spotOwner
cast rpc anvil_impersonateAccount $spotOwner

echo
echo $SpotMarketProxy $setCollateralLeverage
cast send $SpotMarketProxy $setCollateralLeverage 2 $newCollateralLeverage --from $spotOwner --unlocked
cast send $SpotMarketProxy $setCollateralLeverage 3 $newCollateralLeverage --from $spotOwner --unlocked
cast send $SpotMarketProxy $setCollateralLeverage 4 $newCollateralLeverage --from $spotOwner --unlocked
cast send $SpotMarketProxy $setCollateralLeverage 5 $newCollateralLeverage --from $spotOwner --unlocked
cast send $SpotMarketProxy $setCollateralLeverage 6 $newCollateralLeverage --from $spotOwner --unlocked

echo
echo $CoreProxy "function getPoolConfiguration(uint128 poolId) view returns (tuple(uint128, uint128, int128)[])"
cast call 0xffffffaEff0B96Ea8e4f94b2253f31abdD875847 "function getPoolConfiguration(uint128 poolId) view returns (tuple(uint128, uint128, int128)[])" 1

echo
echo $CoreProxy $isMarketCapacityLocked
echo '1 "Perps Supermarket"                   '      $(cast call $CoreProxy $isMarketCapacityLocked 1)
echo "2 $(cast call $SpotMarketProxy $name 2)      "      $(cast call $CoreProxy $isMarketCapacityLocked 2)
echo "3 $(cast call $SpotMarketProxy $name 3)       "     $(cast call $CoreProxy $isMarketCapacityLocked 3)
echo "4 $(cast call $SpotMarketProxy $name 4)         "   $(cast call $CoreProxy $isMarketCapacityLocked 4)
echo "5 $(cast call $SpotMarketProxy $name 5)          "  $(cast call $CoreProxy $isMarketCapacityLocked 5)
echo "6 $(cast call $SpotMarketProxy $name 6)  "          $(cast call $CoreProxy $isMarketCapacityLocked 6)

echo
echo $SpotMarketProxy $getCollateralLeverage
echo "2 $(cast call $SpotMarketProxy $name 2)      "      $(cast call $SpotMarketProxy $getCollateralLeverage 2)
echo "3 $(cast call $SpotMarketProxy $name 3)       "     $(cast call $SpotMarketProxy $getCollateralLeverage 3)
echo "4 $(cast call $SpotMarketProxy $name 4)         "   $(cast call $SpotMarketProxy $getCollateralLeverage 4)
echo "5 $(cast call $SpotMarketProxy $name 5)          "  $(cast call $SpotMarketProxy $getCollateralLeverage 5)
echo "6 $(cast call $SpotMarketProxy $name 6)  "          $(cast call $SpotMarketProxy $getCollateralLeverage 6)

echo
echo $SpotMarketProxy $minimumCredit
echo "2 $(cast call $SpotMarketProxy $name 2)      "      $(cast call $SpotMarketProxy $minimumCredit 2)
echo "3 $(cast call $SpotMarketProxy $name 3)       "     $(cast call $SpotMarketProxy $minimumCredit 3)
echo "4 $(cast call $SpotMarketProxy $name 4)         "   $(cast call $SpotMarketProxy $minimumCredit 4)
echo "5 $(cast call $SpotMarketProxy $name 5)          "  $(cast call $SpotMarketProxy $minimumCredit 5)
echo "6 $(cast call $SpotMarketProxy $name 6)  "          $(cast call $SpotMarketProxy $minimumCredit 6)

echo
echo $SpotMarketProxy $reportedDebt
echo "2 $(cast call $SpotMarketProxy $name 2)      "      $(cast call $SpotMarketProxy $reportedDebt 2)
echo "3 $(cast call $SpotMarketProxy $name 3)       "     $(cast call $SpotMarketProxy $reportedDebt 3)
echo "4 $(cast call $SpotMarketProxy $name 4)         "   $(cast call $SpotMarketProxy $reportedDebt 4)
echo "5 $(cast call $SpotMarketProxy $name 5)          "  $(cast call $SpotMarketProxy $reportedDebt 5)
echo "6 $(cast call $SpotMarketProxy $name 6)  "          $(cast call $SpotMarketProxy $reportedDebt 6)
