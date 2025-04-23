set -e

migrate_account () {
    account=$1
    account_id=${2:-$RANDOM}

    # if the c-ratio is too low, repay a bit of debt
    target=952000000000000000
    cratio=$(cast call 0xc5f0b4194455e0C175ab68C501400e46C7203504 'collateralisationRatio(address) returns (uint256)' $account --json | jq -r '.[0]')
    if [ $cratio -gt $target ]; then
        # figure out how much to burn
        debt=$(cast call 0xc5f0b4194455e0C175ab68C501400e46C7203504 'debtBalanceOf(address,bytes32) returns (uint256)' $account 0x7355534400000000000000000000000000000000000000000000000000000000 --json | jq -r '.[0]')
        repay_amount=$(node -e "console.log($debt - Math.floor($debt * $target / $cratio ))")

        echo "repay $repay_amount for $account to migrate..."

        cast send 0xc5f0b4194455e0C175ab68C501400e46C7203504 'burnSynthsOnBehalf(address,uint256)' $account $repay_amount $CAST_ARGS
    fi
    echo "migrate account $1 to v3 account $2..."
    cast send 0x3AcF163B9E6a384D539e10dAc7e11213c638b2f5 'migrateOnBehalf(address,uint128)' $account $account_id $CAST_ARGS
}


migrate_account $1
