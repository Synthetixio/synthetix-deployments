# Perps Markets

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Interest rate parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>lowUtilizationInterestRateGradient</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>interestRateGradientBreakpoint</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>highUtilizationInterestRateGradient</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Keeper reward guards</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>minKeeperRewardUsd</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>minKeeperProfitRatioD18</td>
      <td>0.3</td>
      <td><code>300000000000000000</code> / <code>0x0429d069189e0000</code></td>
    </tr>
    <tr>
      <td>maxKeeperRewardUsd</td>
      <td>30</td>
      <td><code>30000000000000000000</code> / <code>0x01a055690d9db80000</code></td>
    </tr>
    <tr>
      <td>maxKeeperScalingRatioD18</td>
      <td>0.4</td>
      <td><code>400000000000000000</code> / <code>0x058d15e176280000</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ETH / Ethereum

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>100</td>
      <td><code>100</code> / <code>0x64</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>15 k</td>
      <td><code>15000000000000000000000</code> / <code>0x032d26d12e980b600000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>40 m</td>
      <td><code>40000000000000000000000000</code> / <code>0x2116545850052128000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.25</td>
      <td><code>250000000000000000</code> / <code>0x03782dace9d90000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>350 k</td>
      <td><code>350000000000000000000000</code> / <code>0x4a1d89bb94865ec00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>4</td>
      <td><code>4000000000000000000</code> / <code>0x3782dace9d900000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>0.744</td>
      <td><code>744000000000000000</code> / <code>0x0a53380ee0e40000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.333</td>
      <td><code>333000000000000000</code> / <code>0x049f0dbc56348000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market BTC / Bitcoin

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>200</td>
      <td><code>200</code> / <code>0xc8</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>1.2 k</td>
      <td><code>1200000000000000000000</code> / <code>0x410d586a20a4c00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>50 m</td>
      <td><code>50000000000000000000000000</code> / <code>0x295be96e64066972000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.25</td>
      <td><code>250000000000000000</code> / <code>0x03782dace9d90000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>35 k</td>
      <td><code>35000000000000000000000</code> / <code>0x07695a92c20d6fe00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>4</td>
      <td><code>4000000000000000000</code> / <code>0x3782dace9d900000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.07</td>
      <td><code>1070000000000000000</code> / <code>0x0ed96754b5ab0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.333</td>
      <td><code>333000000000000000</code> / <code>0x049f0dbc56348000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market SOL / Solana

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>300</td>
      <td><code>300</code> / <code>0x012c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>270 k</td>
      <td><code>270000000000000000000000</code> / <code>0x392cbab546b0ccc00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>40 m</td>
      <td><code>40000000000000000000000000</code> / <code>0x2116545850052128000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>1.41 m</td>
      <td><code>1406250000000000000000000</code> / <code>0x0129c8f71ad02e2a680000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>5.503</td>
      <td><code>5503000000000000000</code> / <code>0x4c5e955806f98000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.333</td>
      <td><code>333000000000000000</code> / <code>0x049f0dbc56348000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market WIF / dogwifhat

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>400</td>
      <td><code>400</code> / <code>0x0190</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>2.5 m</td>
      <td><code>2500000000000000000000000</code> / <code>0x0211654585005212800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>15 m</td>
      <td><code>15000000000000000000000000</code> / <code>0x0c685fa11e01ec6f000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.04</td>
      <td><code>40000000000000000</code> / <code>0x8e1bc9bf040000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x4ca4beeca86f0d164160323817a4e42b10010a724c2217c6ee41b54cd4cc61fc"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market LINK / Chainlink

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>500</td>
      <td><code>500</code> / <code>0x01f4</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>450 k</td>
      <td><code>450000000000000000000000</code> / <code>0x5f4a8c8375d155400000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>5 m</td>
      <td><code>5000000000000000000000000</code> / <code>0x0422ca8b0a00a425000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>3.75 m</td>
      <td><code>3750000000000000000000000</code> / <code>0x031a17e847807b1bc00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>5</td>
      <td><code>5000000000000000000</code> / <code>0x4563918244f40000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.34</td>
      <td><code>340000000000000000</code> / <code>0x04b7ec32d7a20000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ARB / Arbitrum

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>600</td>
      <td><code>600</code> / <code>0x0258</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>6 m</td>
      <td><code>6000000000000000000000000</code> / <code>0x04f68ca6d8cd91c6000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>50 m</td>
      <td><code>50000000000000000000000000</code> / <code>0x295be96e64066972000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.9</td>
      <td><code>1900000000000000000</code> / <code>0x1a5e27eef13e0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.38</td>
      <td><code>380000000000000000</code> / <code>0x054607fc96a60000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.0333</td>
      <td><code>33300000000000000</code> / <code>0x764e2c6f054000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market DOGE / Doge Coin

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>700</td>
      <td><code>700</code> / <code>0x02bc</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>51 m</td>
      <td><code>51000000000000000000000000</code> / <code>0x2a2fab8a32d35713000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>5 m</td>
      <td><code>5000000000000000000000000</code> / <code>0x0422ca8b0a00a425000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>0.79 b</td>
      <td><code>789000000000000000000000000</code> / <code>0x028ca53fb45d986135000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.6</td>
      <td><code>1600000000000000000</code> / <code>0x16345785d8a00000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.36</td>
      <td><code>360000000000000000</code> / <code>0x04fefa17b7240000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market GMX / GMX

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>800</td>
      <td><code>800</code> / <code>0x0320</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>20 k</td>
      <td><code>20000000000000000000000</code> / <code>0x043c33c1937564800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>250 k</td>
      <td><code>250000000000000000000000</code> / <code>0x34f086f3b33b68400000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.2</td>
      <td><code>1200000000000000000</code> / <code>0x10a741a462780000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.4</td>
      <td><code>400000000000000000</code> / <code>0x058d15e176280000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xb962539d0fcb272a494d65ea56f94851c2bcf8823935da05bd628916e2e9edbf"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market AAVE / AAVE

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>900</td>
      <td><code>900</code> / <code>0x0384</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>50 k</td>
      <td><code>50000000000000000000000</code> / <code>0x0a968163f0a57b400000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>180 k</td>
      <td><code>180000000000000000000000</code> / <code>0x261dd1ce2f2088800000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>4.1</td>
      <td><code>4100000000000000000</code> / <code>0x38e62046fb1a0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.375</td>
      <td><code>375000000000000000</code> / <code>0x053444835ec58000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x2b9ab1e972a281585084148ba1389800799bd4be63b957507db1349314e47445"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market NEAR / NEAR Protocol

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>1000</td>
      <td><code>1000</code> / <code>0x03e8</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.75 m</td>
      <td><code>750000000000000000000000</code> / <code>0x9ed194db19b238c00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>8 m</td>
      <td><code>8000000000000000000000000</code> / <code>0x069e10de76676d08000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.6</td>
      <td><code>1600000000000000000</code> / <code>0x16345785d8a00000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.35</td>
      <td><code>350000000000000000</code> / <code>0x04db732547630000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xc415de8d2eba7db216527dff4b60e8f3a5311c740dadb233e13e12547e226750"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market UNI / Uniswap

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>1100</td>
      <td><code>1100</code> / <code>0x044c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>2.25 m</td>
      <td><code>2250000000000000000000000</code> / <code>0x01dc74be914d16aa400000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>0.49</td>
      <td><code>490000000000000000</code> / <code>0x06ccd46763f10000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.31</td>
      <td><code>310000000000000000</code> / <code>0x044d575b885f0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x78d185a741d07edb3412b09008b7c5cfb9bbbd7d568bf00ba737b456ba171501"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market XRP / Ripple

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>1200</td>
      <td><code>1200</code> / <code>0x04b0</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>5 m</td>
      <td><code>5000000000000000000000000</code> / <code>0x0422ca8b0a00a425000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>187.5 m</td>
      <td><code>187500000000000000000000000</code> / <code>0x9b18ab5df7180b6b800000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.2</td>
      <td><code>1200000000000000000</code> / <code>0x10a741a462780000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.32</td>
      <td><code>320000000000000000</code> / <code>0x0470de4df8200000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market LTC / Litecoin

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>1300</td>
      <td><code>1300</code> / <code>0x0514</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>77 k</td>
      <td><code>77000000000000000000000</code> / <code>0x104e2da94483f6200000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>5 m</td>
      <td><code>5000000000000000000000000</code> / <code>0x0422ca8b0a00a425000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>1.69 m</td>
      <td><code>1687500000000000000000000</code> / <code>0x0165578eecf9d0ffb00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>5.5</td>
      <td><code>5500000000000000000</code> / <code>0x4c53ecdc18a60000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.4</td>
      <td><code>400000000000000000</code> / <code>0x058d15e176280000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x6e3f3fa8253588df9326580180233eb791e03b443a3ba7a1d892e73874e19a54"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ORDI / Ordinals

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>1400</td>
      <td><code>1400</code> / <code>0x0578</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>100 k</td>
      <td><code>100000000000000000000000</code> / <code>0x152d02c7e14af6800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>0.87 m</td>
      <td><code>870000000000000000000000</code> / <code>0xb83acb648e7293c00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.16</td>
      <td><code>1160000000000000000</code> / <code>0x101925daa3740000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.38</td>
      <td><code>380000000000000000</code> / <code>0x054607fc96a60000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x193c739db502aadcef37c2589738b1e37bdb257d58cf1ab3c7ebc8e6df4e3ec0"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market STX / Stacks

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>1500</td>
      <td><code>1500</code> / <code>0x05dc</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.7 m</td>
      <td><code>700000000000000000000000</code> / <code>0x943b1377290cbd800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>15 m</td>
      <td><code>15000000000000000000000000</code> / <code>0x0c685fa11e01ec6f000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.8</td>
      <td><code>2800000000000000000</code> / <code>0x26db992a3b180000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.43</td>
      <td><code>430000000000000000</code> / <code>0x05f7aab8c56b0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xec7a775f46379b5e943c3526b1c8d54cd49749176b0b98e02dde68d1bd335c17"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market SHIB / Shiba

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>1600</td>
      <td><code>1600</code> / <code>0x0640</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>150 b</td>
      <td><code>150000000000000000000000000000</code> / <code>0x01e4ad1785a42b23aff0000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>4 t</td>
      <td><code>4000000000000000000000000000000</code> / <code>0x327cb2734119d3b7a900000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.66</td>
      <td><code>2660000000000000000</code> / <code>0x24ea37e81e8a0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.32</td>
      <td><code>320000000000000000</code> / <code>0x0470de4df8200000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xf0d57deca57b3da2fe63a493f4c25925fdfd8edf834b20f93e1f84dbd1504d4a"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market BNB / Binance Coin

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>1700</td>
      <td><code>1700</code> / <code>0x06a4</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>9.5 k</td>
      <td><code>9500000000000000000000</code> / <code>0x0202fefbf2d7c2f00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>5 m</td>
      <td><code>5000000000000000000000000</code> / <code>0x0422ca8b0a00a425000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>250 k</td>
      <td><code>250000000000000000000000</code> / <code>0x34f086f3b33b68400000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>3.4</td>
      <td><code>3400000000000000000</code> / <code>0x2f2f39fc6c540000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market AVAX / AVAX

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>1800</td>
      <td><code>1800</code> / <code>0x0708</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>225 k</td>
      <td><code>225000000000000000000000</code> / <code>0x2fa54641bae8aaa00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>5 m</td>
      <td><code>5000000000000000000000000</code> / <code>0x0422ca8b0a00a425000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>1.25 m</td>
      <td><code>1250000000000000000000000</code> / <code>0x0108b2a2c2802909400000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>4.2</td>
      <td><code>4200000000000000000</code> / <code>0x3a4965bf58a40000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.36</td>
      <td><code>360000000000000000</code> / <code>0x04fefa17b7240000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market PEPE / PEPE

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>1900</td>
      <td><code>1900</code> / <code>0x076c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.66 t</td>
      <td><code>660000000000000000000000000000</code> / <code>0x085493344c058a9d0620000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>5 m</td>
      <td><code>5000000000000000000000000</code> / <code>0x0422ca8b0a00a425000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>8.4 t</td>
      <td><code>8400000000000000000000000000000</code> / <code>0x6a05dd253be96fce7c80000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>0.6</td>
      <td><code>600000000000000000</code> / <code>0x0853a0d2313c0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.32</td>
      <td><code>320000000000000000</code> / <code>0x0470de4df8200000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xd69731a2e74ac1ce884fc3890f7ee324b6deb66147055249568869ed700882e4"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market OP / Optimism

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>2000</td>
      <td><code>2000</code> / <code>0x07d0</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>16 m</td>
      <td><code>16000000000000000000000000</code> / <code>0x0d3c21bcecceda10000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.04</td>
      <td><code>40000000000000000</code> / <code>0x8e1bc9bf040000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market RUNE / Rune

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>2100</td>
      <td><code>2100</code> / <code>0x0834</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>4 m</td>
      <td><code>4000000000000000000000000</code> / <code>0x034f086f3b33b684000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>8.3</td>
      <td><code>8300000000000000000</code> / <code>0x732f860653be0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.36</td>
      <td><code>360000000000000000</code> / <code>0x04fefa17b7240000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x5fcf71143bb70d41af4fa9aa1287e2efd3c5911cee59f909f915c9f61baacb1e"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market PYTH / Pyth

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>2200</td>
      <td><code>2200</code> / <code>0x0898</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>3.7 m</td>
      <td><code>3700000000000000000000000</code> / <code>0x030f8166e38fd5a0800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>14.44 m</td>
      <td><code>14437500000000000000000000</code> / <code>0x0bf1427179aea6c4700000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market CRV / Curve

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>2300</td>
      <td><code>2300</code> / <code>0x08fc</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>10 m</td>
      <td><code>10000000000000000000000000</code> / <code>0x084595161401484a000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>50 m</td>
      <td><code>50000000000000000000000000</code> / <code>0x295be96e64066972000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>0.6</td>
      <td><code>600000000000000000</code> / <code>0x0853a0d2313c0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.33</td>
      <td><code>330000000000000000</code> / <code>0x0494654067e10000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xa19d04ac696c7a6616d291c7e5d1377cc8be437c327b75adb5dc1bad745fcae8"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market TIA / Celestia

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>2400</td>
      <td><code>2400</code> / <code>0x0960</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.8 m</td>
      <td><code>800000000000000000000000</code> / <code>0xa968163f0a57b4000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>4 m</td>
      <td><code>4000000000000000000000000</code> / <code>0x034f086f3b33b684000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>4 m</td>
      <td><code>4000000000000000000000000</code> / <code>0x034f086f3b33b684000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.2</td>
      <td><code>1200000000000000000</code> / <code>0x10a741a462780000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.38</td>
      <td><code>380000000000000000</code> / <code>0x054607fc96a60000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x09f7c1d7dfbb7df2b8fe3d3d87ee94a2259d212da4f30c1f0540d066dfa44723"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ADA / Cardano

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>2500</td>
      <td><code>2500</code> / <code>0x09c4</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>12 m</td>
      <td><code>12000000000000000000000000</code> / <code>0x09ed194db19b238c000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>4 m</td>
      <td><code>4000000000000000000000000</code> / <code>0x034f086f3b33b684000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>150 m</td>
      <td><code>150000000000000000000000000</code> / <code>0x7c13bc4b2c133c56000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>3.2</td>
      <td><code>3200000000000000000</code> / <code>0x2c68af0bb1400000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.33</td>
      <td><code>330000000000000000</code> / <code>0x0494654067e10000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x2a01deaec9e51a579277b34b122399984d0bbf57e2458a7e42fecd2829867a0d"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market BCH / Bitcoin Cash

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>2600</td>
      <td><code>2600</code> / <code>0x0a28</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>15 k</td>
      <td><code>15000000000000000000000</code> / <code>0x032d26d12e980b600000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>5 m</td>
      <td><code>5000000000000000000000000</code> / <code>0x0422ca8b0a00a425000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>84.38 k</td>
      <td><code>84375000000000000000000</code> / <code>0x11ddfa58a6173ffc0000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.1</td>
      <td><code>1100000000000000000</code> / <code>0x0f43fc2c04ee0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.31</td>
      <td><code>310000000000000000</code> / <code>0x044d575b885f0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x3dd2b63686a450ec7290df3a1e0b583c0481f651351edfa7636f39aed55cf8a3"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market DYDX / DYDX

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>2700</td>
      <td><code>2700</code> / <code>0x0a8c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>18 m</td>
      <td><code>18000000000000000000000000</code> / <code>0x0ee3a5f48a68b552000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.3</td>
      <td><code>1300000000000000000</code> / <code>0x120a871cc0020000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.34</td>
      <td><code>340000000000000000</code> / <code>0x04b7ec32d7a20000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x6489800bb8974169adfe35937bf6736507097d13c190d760c557108c7e93a81b"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market POL / Polygon

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>2800</td>
      <td><code>2800</code> / <code>0x0af0</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>7.5 m</td>
      <td><code>7500000000000000000000000</code> / <code>0x06342fd08f00f637800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>75 m</td>
      <td><code>75000000000000000000000000</code> / <code>0x3e09de2596099e2b000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.8</td>
      <td><code>1800000000000000000</code> / <code>0x18fae27693b40000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xffd11c5a1cfd42f80afb2df4d9f264c15f956d68153335374ec10722edd70472"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market MKR / Maker

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>2900</td>
      <td><code>2900</code> / <code>0x0b54</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>1.2 k</td>
      <td><code>1200000000000000000000</code> / <code>0x410d586a20a4c00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>9 k</td>
      <td><code>9000000000000000000000</code> / <code>0x01e7e4171bf4d3a00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.2</td>
      <td><code>1200000000000000000</code> / <code>0x10a741a462780000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.33</td>
      <td><code>330000000000000000</code> / <code>0x0494654067e10000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x9375299e31c0deb9c6bc378e6329aab44cb48ec655552a70d4b9050346a30378"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market XLM / Stellar

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>3000</td>
      <td><code>3000</code> / <code>0x0bb8</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>11 m</td>
      <td><code>11000000000000000000000000</code> / <code>0x09195731e2ce35eb000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>166.5 m</td>
      <td><code>166500000000000000000000000</code> / <code>0x89b9bf1600488d36800000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.2</td>
      <td><code>1200000000000000000</code> / <code>0x10a741a462780000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xb7a8eba68a997cd0210c2e1e4ee811ad2d174b3611c22d9ebf16f4cb7e9ba850"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ALGO / Algorand

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>3100</td>
      <td><code>3100</code> / <code>0x0c1c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>5.95 m</td>
      <td><code>5953850000000000000000000</code> / <code>0x04ecc6daf086bfb0a80000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>103.88 m</td>
      <td><code>103875000000000000000000000</code> / <code>0x55ec63088966ebb3e00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>5.19</td>
      <td><code>5190000000000000000</code> / <code>0x4806958090470000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.36</td>
      <td><code>360000000000000000</code> / <code>0x04fefa17b7240000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xfa17ceaf30d19ba51112fdcc750cc83454776f47fb0112e4af07f15f4bb1ebc0"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market APT / Aptos

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>3200</td>
      <td><code>3200</code> / <code>0x0c80</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>352.3 k</td>
      <td><code>352300000000000000000000</code> / <code>0x4a9a38a50a9a45300000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>6.08 m</td>
      <td><code>6075000000000000000000000</code> / <code>0x05066e68eeb689fee00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.31</td>
      <td><code>310000000000000000</code> / <code>0x044d575b885f0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ARKM / Arkham

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>3300</td>
      <td><code>3300</code> / <code>0x0ce4</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>400 k</td>
      <td><code>400000000000000000000000</code> / <code>0x54b40b1f852bda000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>11 m</td>
      <td><code>11000000000000000000000000</code> / <code>0x09195731e2ce35eb000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>4.43</td>
      <td><code>4430000000000000000</code> / <code>0x3d7a858762fb0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.44</td>
      <td><code>440000000000000000</code> / <code>0x061b31ab352c0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x7677dd124dee46cfcd46ff03cf405fb0ed94b1f49efbea3444aadbda939a7ad3"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ATOM / Cosmos

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>3400</td>
      <td><code>3400</code> / <code>0x0d48</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>329.3 k</td>
      <td><code>329300000000000000000000</code> / <code>0x45bb63866dd344d00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>11.25 m</td>
      <td><code>11250000000000000000000000</code> / <code>0x094e47b8d6817153400000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.49</td>
      <td><code>2490000000000000000</code> / <code>0x228e41ceb2b90000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.31</td>
      <td><code>310000000000000000</code> / <code>0x044d575b885f0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xb00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market AXL / Axelar

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>3500</td>
      <td><code>3500</code> / <code>0x0dac</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>10.13 m</td>
      <td><code>10125000000000000000000000</code> / <code>0x08600d598ddae5fe200000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.85</td>
      <td><code>2850000000000000000</code> / <code>0x278d3be669dd0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.34</td>
      <td><code>340000000000000000</code> / <code>0x04b7ec32d7a20000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x60144b1d5c9e9851732ad1d9760e3485ef80be39b984f6bf60f82b28a2b7f126"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market AXS / Axie Infinity

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>3600</td>
      <td><code>3600</code> / <code>0x0e10</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>162 k</td>
      <td><code>162000000000000000000000</code> / <code>0x224e099ff736e1400000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>4.22 m</td>
      <td><code>4218750000000000000000000</code> / <code>0x037d5ae550708a7f380000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>0.88</td>
      <td><code>880000000000000000</code> / <code>0x0c3663566a580000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.31</td>
      <td><code>310000000000000000</code> / <code>0x044d575b885f0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xb7e3904c08ddd9c0c10c6d207d390fd19e87eb6aab96304f571ed94caebdefa0"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market BAL / Balancer

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>3700</td>
      <td><code>3700</code> / <code>0x0e74</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>377.6 k</td>
      <td><code>377600000000000000000000</code> / <code>0x4ff5bcad1d752c000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>1.13 m</td>
      <td><code>1125000000000000000000000</code> / <code>0xee3a5f48a68b55200000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>3.94</td>
      <td><code>3940000000000000000</code> / <code>0x36adb11fff0a0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.35</td>
      <td><code>350000000000000000</code> / <code>0x04db732547630000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x07ad7b4a7662d19a6bc675f6b467172d2f3947fa653ca97555a9b20236406628"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market BLUR / Blur

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>3800</td>
      <td><code>3800</code> / <code>0x0ed8</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>3.33 m</td>
      <td><code>3329150000000000000000000</code> / <code>0x02c0f99547c75813380000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>100 m</td>
      <td><code>100000000000000000000000000</code> / <code>0x52b7d2dcc80cd2e4000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.49</td>
      <td><code>1490000000000000000</code> / <code>0x14ad8b1b0b550000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x856aac602516addee497edf6f50d39e8c95ae5fb0da1ed434a8c2ab9c3e877e9"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market BOME / BOOK OF MEME

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>3900</td>
      <td><code>3900</code> / <code>0x0f3c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>229.51 m</td>
      <td><code>229513950000000000000000000</code> / <code>0xbdd978290888c350b80000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>3.75 b</td>
      <td><code>3750000000000000000000000000</code> / <code>0x0c1ded63574de0e466000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.44</td>
      <td><code>1440000000000000000</code> / <code>0x13fbe85edc900000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.38</td>
      <td><code>380000000000000000</code> / <code>0x054607fc96a60000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x30e4780570973e438fdb3f1b7ad22618b2fc7333b65c7853a7ca144c39052f7a"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market BONK / Bonk

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>4000</td>
      <td><code>4000</code> / <code>0x0fa0</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>135.53 b</td>
      <td><code>135525228000000000000000000000</code> / <code>0x01b5e7d75335aca7abcb800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>1.6 t</td>
      <td><code>1600000000000000000000000000000</code> / <code>0x1431e0fae6d7217caa00000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.55</td>
      <td><code>2550000000000000000</code> / <code>0x23636b7d513f0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market COMP / Compound

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>4100</td>
      <td><code>4100</code> / <code>0x1004</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>17 k</td>
      <td><code>17000000000000000000000</code> / <code>0x039992648a23c8a00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>241.88 k</td>
      <td><code>241876000000000000000000</code> / <code>0x33381fcdc6075ed00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.8</td>
      <td><code>1800000000000000000</code> / <code>0x18fae27693b40000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.41</td>
      <td><code>410000000000000000</code> / <code>0x05b09cd3e5e90000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x4a8e42861cabc5ecb50996f92e7cfa2bce3fd0a2423b0c44c9b423fb2bd25478"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market DOT / Polkadot

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>4200</td>
      <td><code>4200</code> / <code>0x1068</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.72 m</td>
      <td><code>724950000000000000000000</code> / <code>0x99839e457248c9980000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>15 m</td>
      <td><code>15000000000000000000000000</code> / <code>0x0c685fa11e01ec6f000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.09</td>
      <td><code>2090000000000000000</code> / <code>0x1d012bed3c910000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.32</td>
      <td><code>320000000000000000</code> / <code>0x0470de4df8200000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xca3eed9b267293f6595901c734c7525ce8ef49adafe8284606ceb307afa2ca5b"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ENA / Ethena

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>4300</td>
      <td><code>4300</code> / <code>0x10cc</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>102 m</td>
      <td><code>102000000000000000000000000</code> / <code>0x545f571465a6ae26000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>3.46</td>
      <td><code>3460000000000000000</code> / <code>0x300463ab0ada0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.38</td>
      <td><code>380000000000000000</code> / <code>0x054607fc96a60000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xb7910ba7322db020416fcac28b48c01212fd9cc8fbcbaf7d30477ed8605f6bd4"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market EOS / Eos

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>4400</td>
      <td><code>4400</code> / <code>0x1130</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>3.18 m</td>
      <td><code>3182150000000000000000000</code> / <code>0x02a1d8b278feb93d580000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>72 m</td>
      <td><code>72000000000000000000000000</code> / <code>0x3b8e97d229a2d548000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.47</td>
      <td><code>2470000000000000000</code> / <code>0x224733e9d3370000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.33</td>
      <td><code>330000000000000000</code> / <code>0x0494654067e10000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x06ade621dbc31ed0fc9255caaab984a468abe84164fb2ccc76f02a4636d97e31"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ETC / Ethereum Classic

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>4500</td>
      <td><code>4500</code> / <code>0x1194</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>80.75 k</td>
      <td><code>80750000000000000000000</code> / <code>0x1119775d9029f8f80000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>3.38 m</td>
      <td><code>3375000000000000000000000</code> / <code>0x02caaf1dd9f3a1ff600000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.71</td>
      <td><code>2710000000000000000</code> / <code>0x259bdaa44d4f0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.33</td>
      <td><code>330000000000000000</code> / <code>0x0494654067e10000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x7f5cc8d963fc5b3d2ae41fe5685ada89fd4f14b435f8050f28c7fd409f40c2d8"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ETHBTC / Ether/Bitcoin Ratio

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>4600</td>
      <td><code>4600</code> / <code>0x11f8</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>72.23 m</td>
      <td><code>72226506000000000000000000</code> / <code>0x3bbe8ebc5e2a9cace80000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>3.4 b</td>
      <td><code>3400000000000000000000000000</code> / <code>0x0afc6a015291b40248000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.39</td>
      <td><code>1390000000000000000</code> / <code>0x134a45a2adcb0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.26</td>
      <td><code>260000000000000000</code> / <code>0x039bb49f599a0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.02</td>
      <td><code>20000000000000000</code> / <code>0x470de4df820000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xc96458d393fe9deb7a7d63a0ac41e2898a67a7750dbd166673279e06c868df0a"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ETHFI / Ether.fi

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>4700</td>
      <td><code>4700</code> / <code>0x125c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>300 k</td>
      <td><code>300000000000000000000000</code> / <code>0x3f870857a3e0e3800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>16.5 m</td>
      <td><code>16500000000000000000000000</code> / <code>0x0da602cad43550e0800000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.12</td>
      <td><code>2120000000000000000</code> / <code>0x1d6bc0c48bd40000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.38</td>
      <td><code>380000000000000000</code> / <code>0x054607fc96a60000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xb27578a9654246cb0a2950842b92330e9ace141c52b63829cc72d5c45a5a595a"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market FIL / Filecoin

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>4800</td>
      <td><code>4800</code> / <code>0x12c0</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.81 m</td>
      <td><code>812100000000000000000000</code> / <code>0xabf8077a8dcb86900000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>12.75 m</td>
      <td><code>12750000000000000000000000</code> / <code>0x0a8beae28cb4d5c4c00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.81</td>
      <td><code>1810000000000000000</code> / <code>0x191e696903750000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.26</td>
      <td><code>260000000000000000</code> / <code>0x039bb49f599a0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x150ac9b959aee0051e4091f0ef5216d941f590e1c5e7f91cf7635b5c11628c0e"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market FLOW / Flow

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>4900</td>
      <td><code>4900</code> / <code>0x1324</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>1.38 m</td>
      <td><code>1380350000000000000000000</code> / <code>0x01244cec668842f1380000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>15 m</td>
      <td><code>15000000000000000000000000</code> / <code>0x0c685fa11e01ec6f000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>9.28</td>
      <td><code>9280000000000000000</code> / <code>0x80c92ed51ba00000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.28</td>
      <td><code>280000000000000000</code> / <code>0x03e2c284391c0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.1</td>
      <td><code>100000000000000000</code> / <code>0x016345785d8a0000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x2fb245b9a84554a0f15aa123cbb5f64cd263b59e9a87d80148cbffab50c69f30"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market FTM / Fantom

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>5000</td>
      <td><code>5000</code> / <code>0x1388</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>4.66 m</td>
      <td><code>4655350000000000000000000</code> / <code>0x03d9cf07789a99fa180000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>118 m</td>
      <td><code>118000000000000000000000000</code> / <code>0x619b78d152758836000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>5.58</td>
      <td><code>5580000000000000000</code> / <code>0x4d70246f96ae0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.38</td>
      <td><code>380000000000000000</code> / <code>0x054607fc96a60000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.033333</td>
      <td><code>33333000000000000</code> / <code>0x766c2fd84c5000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x5c6c0d2386e3352356c3ab84434fafb5ea067ac2678a38a338c4a69ddc4bdb0c"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market FXS / Fraxshare

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>5100</td>
      <td><code>5100</code> / <code>0x13ec</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>371.7 k</td>
      <td><code>371700000000000000000000</code> / <code>0x4eb5e5ba68ff57500000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>2.1 m</td>
      <td><code>2104687000000000000000000</code> / <code>0x01bdaf4f967e5be85c0000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.59</td>
      <td><code>2590000000000000000</code> / <code>0x23f1874710430000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.34</td>
      <td><code>340000000000000000</code> / <code>0x04b7ec32d7a20000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.06666</td>
      <td><code>66660000000000000</code> / <code>0xecd2eab4ba4000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x735f591e4fed988cd38df74d8fcedecf2fe8d9111664e0fd500db9aa78b316b1"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market GALA / GALA

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>5200</td>
      <td><code>5200</code> / <code>0x1450</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>36.17 m</td>
      <td><code>36165750000000000000000000</code> / <code>0x1dea653c69144788180000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>1.13 b</td>
      <td><code>1125000000000000000000000000</code> / <code>0x03a2940433ca904485000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.29</td>
      <td><code>1290000000000000000</code> / <code>0x11e7002a50410000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.35</td>
      <td><code>350000000000000000</code> / <code>0x04db732547630000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x0781209c28fda797616212b7f94d77af3a01f3e94a5d421760aef020cf2bcb51"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market GRT / The Graph

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>5300</td>
      <td><code>5300</code> / <code>0x14b4</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>4.52 m</td>
      <td><code>4516800000000000000000000</code> / <code>0x03bc7837f867f657000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>112.5 m</td>
      <td><code>112500000000000000000000000</code> / <code>0x5d0ecd38610e6d40800000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>4.22</td>
      <td><code>4220000000000000000</code> / <code>0x3a9073a438260000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.39</td>
      <td><code>390000000000000000</code> / <code>0x05698eef06670000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x4d1f8dae0d96236fb98e8f47471a366ec3b1732b47041781934ca3a9bb2f35e7"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ICP / Internet Computer

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>5400</td>
      <td><code>5400</code> / <code>0x1518</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>91.1 k</td>
      <td><code>91100000000000000000000</code> / <code>0x134a8a78238385f00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.86</td>
      <td><code>1860000000000000000</code> / <code>0x19d00c25323a0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.44</td>
      <td><code>440000000000000000</code> / <code>0x061b31ab352c0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xc9907d786c5821547777780a1e4f89484f3417cb14dd244f2b0a34ea7a554d67"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market IMX / Immutable X

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>5500</td>
      <td><code>5500</code> / <code>0x157c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.51 m</td>
      <td><code>508750000000000000000000</code> / <code>0x6bbb648c16fa2c780000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>8.4 m</td>
      <td><code>8400000000000000000000000</code> / <code>0x06f2c4e995ec98e2000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.95</td>
      <td><code>1950000000000000000</code> / <code>0x1b0fcaab20030000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.4</td>
      <td><code>400000000000000000</code> / <code>0x058d15e176280000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x941320a8989414874de5aa2fc340a75d5ed91fdff1613dd55f83844d52ea63a2"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market INJ / Injective

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>5600</td>
      <td><code>5600</code> / <code>0x15e0</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>73.5 k</td>
      <td><code>73500000000000000000000</code> / <code>0x0f907167644f6af00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>2.25 m</td>
      <td><code>2250000000000000000000000</code> / <code>0x01dc74be914d16aa400000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.31</td>
      <td><code>1310000000000000000</code> / <code>0x122e0e0f2fc30000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.46</td>
      <td><code>460000000000000000</code> / <code>0x06623f9014ae0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x7a5bc1d2b56ad029048cd63964b3ad2776eadf812edc1a43a31406cb54bff592"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market JTO / Jito

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>5700</td>
      <td><code>5700</code> / <code>0x1644</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>369.8 k</td>
      <td><code>369800000000000000000000</code> / <code>0x4e4ee5ee6ba0fd200000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>8 m</td>
      <td><code>8000000000000000000000000</code> / <code>0x069e10de76676d08000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.49</td>
      <td><code>1490000000000000000</code> / <code>0x14ad8b1b0b550000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.38</td>
      <td><code>380000000000000000</code> / <code>0x054607fc96a60000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xb43660a5f790c69354b0729a5ef9d50d68f1df92107540210b9cccba1f947cc2"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market JUP / Jupiter

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>5800</td>
      <td><code>5800</code> / <code>0x16a8</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.97 m</td>
      <td><code>967850000000000000000000</code> / <code>0xccf340ee06edb8680000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>33.75 m</td>
      <td><code>33750000000000000000000000</code> / <code>0x1bead72a838453f9c00000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>3.35</td>
      <td><code>3350000000000000000</code> / <code>0x2e7d97403d8f0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market LDO / Lido DAO

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>5900</td>
      <td><code>5900</code> / <code>0x170c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.7 m</td>
      <td><code>695300000000000000000000</code> / <code>0x933c49dcdeb78d900000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>21 m</td>
      <td><code>21000000000000000000000000</code> / <code>0x115eec47f6cf7e35000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.25</td>
      <td><code>1250000000000000000</code> / <code>0x1158e460913d0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.34</td>
      <td><code>340000000000000000</code> / <code>0x04b7ec32d7a20000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xc63e2a7f37a04e5e614c07238bedb25dcc38927fba8fe890597a593c0b2fa4ad"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market MEME / Memecoin

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>6000</td>
      <td><code>6000</code> / <code>0x1770</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>73.85 m</td>
      <td><code>73846350000000000000000000</code> / <code>0x3d1592a7ae7d4778780000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>1.3 b</td>
      <td><code>1300000000000000000000000000</code> / <code>0x043355b53628a6b594000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.32</td>
      <td><code>1320000000000000000</code> / <code>0x125195019f840000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xcd2cee36951a571e035db0dfad138e6ecdb06b517cc3373cd7db5d3609b7927c"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market PENDLE / Pendle

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>6100</td>
      <td><code>6100</code> / <code>0x17d4</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>200 k</td>
      <td><code>200000000000000000000000</code> / <code>0x2a5a058fc295ed000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>6 m</td>
      <td><code>6000000000000000000000000</code> / <code>0x04f68ca6d8cd91c6000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.45</td>
      <td><code>2450000000000000000</code> / <code>0x22002604f3b50000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x9a4df90b25497f66b1afb012467e316e801ca3d839456db028892fe8c70c8016"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market SEI / Sei

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>6200</td>
      <td><code>6200</code> / <code>0x1838</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>3.5 m</td>
      <td><code>3496500000000000000000000</code> / <code>0x02e469a511ed0b28500000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>71 m</td>
      <td><code>71000000000000000000000000</code> / <code>0x3abad5b65ad5e7a7000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>5.13</td>
      <td><code>5130000000000000000</code> / <code>0x47316bd1f1c10000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.39</td>
      <td><code>390000000000000000</code> / <code>0x05698eef06670000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x53614f1cb0c031d4af66c04cb9c756234adad0e1cee85303795091499a4084eb"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market SNX / Synthetix Network Token

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>6300</td>
      <td><code>6300</code> / <code>0x189c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>10.2 m</td>
      <td><code>10200000000000000000000000</code> / <code>0x086fef1ba3c3de37000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.82</td>
      <td><code>2820000000000000000</code> / <code>0x2722a70f1a9a0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.39</td>
      <td><code>390000000000000000</code> / <code>0x05698eef06670000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x39d020f60982ed892abbcd4a06a276a9f9b7bfbce003204c110b6e488f502da3"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market STRK / Starknet

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>6400</td>
      <td><code>6400</code> / <code>0x1900</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>1.9 m</td>
      <td><code>1904850000000000000000000</code> / <code>0x01935e201b102990080000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>40 m</td>
      <td><code>40000000000000000000000000</code> / <code>0x2116545850052128000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>0.89</td>
      <td><code>890000000000000000</code> / <code>0x0c59ea48da190000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x6a182399ff70ccf3e06024898942028204125a819e519a335ffa4579e66cd870"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market SUI / Sui

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>6500</td>
      <td><code>6500</code> / <code>0x1964</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>1.56 m</td>
      <td><code>1559950000000000000000000</code> / <code>0x014a550f173eaded780000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>55 m</td>
      <td><code>55000000000000000000000000</code> / <code>0x2d7eb3f96e070d97000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.96</td>
      <td><code>1960000000000000000</code> / <code>0x1b33519d8fc40000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.34</td>
      <td><code>340000000000000000</code> / <code>0x04b7ec32d7a20000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market SUSHI / Sushiswap

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>6600</td>
      <td><code>6600</code> / <code>0x19c8</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>1.02 m</td>
      <td><code>1018050000000000000000000</code> / <code>0xd79499e0b3edf9c80000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>16 m</td>
      <td><code>16000000000000000000000000</code> / <code>0x0d3c21bcecceda10000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.37</td>
      <td><code>1370000000000000000</code> / <code>0x130337bdce490000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.4</td>
      <td><code>400000000000000000</code> / <code>0x058d15e176280000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x26e4f737fde0263a9eea10ae63ac36dcedab2aaf629261a994e1eeb6ee0afe53"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market TAO / Bittensor

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>6700</td>
      <td><code>6700</code> / <code>0x1a2c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>2.45 k</td>
      <td><code>2450000000000000000000</code> / <code>0x84d0948357fb080000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>32.5 k</td>
      <td><code>32500000000000000000000</code> / <code>0x06e1d41a8f9ec3500000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.89</td>
      <td><code>2890000000000000000</code> / <code>0x281b57b028e10000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x410f41de235f2db824e562ea7ab2d3d3d4ff048316c61d629c0b93f58584e1af"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market TON / Toncoin

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>6800</td>
      <td><code>6800</code> / <code>0x1a90</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.58 m</td>
      <td><code>576800000000000000000000</code> / <code>0x7a246401eea000800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>12 m</td>
      <td><code>12000000000000000000000000</code> / <code>0x09ed194db19b238c000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.89</td>
      <td><code>2890000000000000000</code> / <code>0x281b57b028e10000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.37</td>
      <td><code>370000000000000000</code> / <code>0x0522810a26e50000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x8963217838ab4cf5cadc172203c1f0b763fbaa45f346d8ee50ba994bbcac3026"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market TRX / Tron

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>6900</td>
      <td><code>6900</code> / <code>0x1af4</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>19.35 m</td>
      <td><code>19348600000000000000000000</code> / <code>0x100139b52da3ade6e00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>0.81 b</td>
      <td><code>806250000000000000000000000</code> / <code>0x029aea14140ce7644e400000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.88</td>
      <td><code>1880000000000000000</code> / <code>0x1a171a0a11bc0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.28</td>
      <td><code>280000000000000000</code> / <code>0x03e2c284391c0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x67aed5a24fdad045475e7195c98a98aea119c763f272d4523f5bac93a4f33c2b"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market W / Wormhole

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>7000</td>
      <td><code>7000</code> / <code>0x1b58</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>2 m</td>
      <td><code>2000000000000000000000000</code> / <code>0x01a784379d99db42000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>59.06 m</td>
      <td><code>59062500000000000000000000</code> / <code>0x30daf88a662792f5100000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>3.87</td>
      <td><code>3870000000000000000</code> / <code>0x35b5007ef0c30000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.35</td>
      <td><code>350000000000000000</code> / <code>0x04db732547630000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xeff7446475e218517566ea99e72a4abec2e1bd8498b43b7d8331e29dcb059389"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market YFI / Yearn Finance

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>7100</td>
      <td><code>7100</code> / <code>0x1bbc</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>150</td>
      <td><code>150000000000000000000</code> / <code>0x0821ab0d4414980000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>2.13 k</td>
      <td><code>2125000000000000000000</code> / <code>0x73324c914479140000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.49</td>
      <td><code>1490000000000000000</code> / <code>0x14ad8b1b0b550000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.39</td>
      <td><code>390000000000000000</code> / <code>0x05698eef06670000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x425f4b198ab2504936886c1e93511bb6720fbcf2045a4f3c0723bb213846022f"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market MEW / Cat in a dogs world

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>7200</td>
      <td><code>7200</code> / <code>0x1c20</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>123.32 m</td>
      <td><code>123319770000000000000000000</code> / <code>0x6601fa2091881a3f280000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>2.5 b</td>
      <td><code>2500000000000000000000000000</code> / <code>0x0813f3978f89409844000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.597</td>
      <td><code>1597000000000000000</code> / <code>0x1629af09ea4c8000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.328</td>
      <td><code>328000000000000000</code> / <code>0x048d4a431e540000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x514aed52ca5294177f20187ae883cec4a018619772ddce41efcc36a6448f5d5d"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market POPCAT / Popcat

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>7300</td>
      <td><code>7300</code> / <code>0x1c84</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.71 m</td>
      <td><code>711490000000000000000000</code> / <code>0x96a9f33f546bb3c80000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>20.25 m</td>
      <td><code>20250000000000000000000000</code> / <code>0x10c01ab31bb5cbfc400000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.808</td>
      <td><code>2808000000000000000</code> / <code>0x26f8051f614c0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.328</td>
      <td><code>328000000000000000</code> / <code>0x048d4a431e540000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xb9312a7ee50e189ef045aa3c7842e099b061bd9bdc99ac645956c3b660dc8cce"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market EIGEN / Eigenlayer

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>7400</td>
      <td><code>7400</code> / <code>0x1ce8</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>268.82 k</td>
      <td><code>268820000000000000000000</code> / <code>0x38ecc2eb22993bd00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>4 m</td>
      <td><code>4000000000000000000000000</code> / <code>0x034f086f3b33b684000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>0.91</td>
      <td><code>910000000000000000</code> / <code>0x0ca0f82db99b0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.334</td>
      <td><code>334000000000000000</code> / <code>0x04a29b3afafb0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xc65db025687356496e8653d0d6608eec64ce2d96e2e28c530e574f0e4f712380"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market WLD / Worldcoin

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>7500</td>
      <td><code>7500</code> / <code>0x1d4c</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>428.6 k</td>
      <td><code>428600000000000000000000</code> / <code>0x5ac273dabbe085e00000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>20 m</td>
      <td><code>20000000000000000000000000</code> / <code>0x108b2a2c28029094000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.168</td>
      <td><code>1168000000000000000</code> / <code>0x103591cfc9a80000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.335</td>
      <td><code>335000000000000000</code> / <code>0x04a628b99fc18000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xd6835ad1f773de4a378115eb6824bd0c0e42d84d1c84d9750e853fb6b6c7794a"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market PEOPLE / ConstitutionDAO

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>7600</td>
      <td><code>7600</code> / <code>0x1db0</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>11.34 m</td>
      <td><code>11341730000000000000000000</code> / <code>0x0961b46a504312c9480000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>0.5 b</td>
      <td><code>500000000000000000000000000</code> / <code>0x019d971e4fe8401e74000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.403</td>
      <td><code>2403000000000000000</code> / <code>0x21592bc4b3438000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.334</td>
      <td><code>334000000000000000</code> / <code>0x04a29b3afafb0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xb7fe919d83815ca6074c82a3286b1cd6ffb7d3136e323cd2b1ef706cfc7e5945"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market ZRO / LayerZero

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>7700</td>
      <td><code>7700</code> / <code>0x1e14</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>237.85 k</td>
      <td><code>237850000000000000000000</code> / <code>0x325ddfd480b0e4280000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>4.25 m</td>
      <td><code>4250000000000000000000000</code> / <code>0x0383f8f62ee6f1ec400000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.037</td>
      <td><code>1037000000000000000</code> / <code>0x0e642a0178148000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.334</td>
      <td><code>334000000000000000</code> / <code>0x04a29b3afafb0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x3bd860bea28bf982fa06bcf358118064bb114086cc03993bd76197eaab0b8018"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market RENDER / Render

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>7800</td>
      <td><code>7800</code> / <code>0x1e78</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>179.63 k</td>
      <td><code>179630000000000000000000</code> / <code>0x2609c3061f7899f80000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>2.25 m</td>
      <td><code>2250000000000000000000000</code> / <code>0x01dc74be914d16aa400000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.467</td>
      <td><code>1467000000000000000</code> / <code>0x145bd4ba3d7f8000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.325</td>
      <td><code>325000000000000000</code> / <code>0x0482a1c730008000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x3d4a2bd9535be6ce8059d75eadeba507b043257321aa544717c56fa19b49e35d"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market NOT / Notcoin

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>7900</td>
      <td><code>7900</code> / <code>0x1edc</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>118.08 m</td>
      <td><code>118077700000000000000000000</code> / <code>0x61abecf16f4d49e1900000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>5 b</td>
      <td><code>5000000000000000000000000000</code> / <code>0x1027e72f1f12813088000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.14</td>
      <td><code>1140000000000000000</code> / <code>0x0fd217f5c3f20000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.345</td>
      <td><code>345000000000000000</code> / <code>0x04c9afac0f828000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x75ec6f04d4bded6afdc1440689be4402dd1e23d2ff2c21e081871eb2739ceb36"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market SATS / Ordinals

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>8000</td>
      <td><code>8000</code> / <code>0x1f40</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>3.33 t</td>
      <td><code>3332222592470000000000000000000</code> / <code>0x2a0efdecda100c163561980000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>100 t</td>
      <td><code>100000000000000000000000000000000</code> / <code>0x04ee2d6d415b85acef8100000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>0.907</td>
      <td><code>907000000000000000</code> / <code>0x0c964fb1cb478000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.345</td>
      <td><code>345000000000000000</code> / <code>0x04c9afac0f828000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x40440d18fb5ad809e2825ce7dfc035cfa57135c13062a04addafe0c7f54425e0"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market IO / io.net

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>8100</td>
      <td><code>8100</code> / <code>0x1fa4</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>477.55 k</td>
      <td><code>477550000000000000000000</code> / <code>0x652009914fa970f80000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>1 m</td>
      <td><code>1000000000000000000000000</code> / <code>0xd3c21bcecceda1000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>6 m</td>
      <td><code>6000000000000000000000000</code> / <code>0x04f68ca6d8cd91c6000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>0.694</td>
      <td><code>694000000000000000</code> / <code>0x09a19552b21f0000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.334</td>
      <td><code>334000000000000000</code> / <code>0x04a29b3afafb0000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x82595d1509b770fa52681e260af4dda9752b87316d7c048535d8ead3fa856eb1"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market SAFE / Safe

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>8500</td>
      <td><code>8500</code> / <code>0x2134</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>0.5 m</td>
      <td><code>500000000000000000000000</code> / <code>0x69e10de76676d0800000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.211</td>
      <td><code>1211000000000000000</code> / <code>0x10ce561576ff8000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.317</td>
      <td><code>317000000000000000</code> / <code>0x046635d209cc8000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x7b3576858506a94fad3a9cc55e32934f0c3931150fe3a3c7b83558dbae5b8e38"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market GOAT / Goatseus Maximus

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>8600</td>
      <td><code>8600</code> / <code>0x2198</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>10 m</td>
      <td><code>10000000000000000000000000</code> / <code>0x084595161401484a000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>20 m</td>
      <td><code>20000000000000000000000000</code> / <code>0x108b2a2c28029094000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>2.459</td>
      <td><code>2459000000000000000</code> / <code>0x22201f78beaf8000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.317</td>
      <td><code>317000000000000000</code> / <code>0x046635d209cc8000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xf7731dc812590214d3eb4343bfb13d1b4cfa9b1d4e020644b5d5d8e07d60c66c"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market MOODENG / Moo Deng

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>8700</td>
      <td><code>8700</code> / <code>0x21fc</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>34 m</td>
      <td><code>34000000000000000000000000</code> / <code>0x1c1fc7b177378f62000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>50 m</td>
      <td><code>50000000000000000000000000</code> / <code>0x295be96e64066972000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>1.588</td>
      <td><code>1588000000000000000</code> / <code>0x1609b5961f520000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.317</td>
      <td><code>317000000000000000</code> / <code>0x046635d209cc8000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x11233749514Ab8d00C0A5873DF7428b3db70030f"><code>0x11233749514Ab8d00C0A5873DF7428b3db70030f</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0xffff73128917a90950cd0473fd2551d7cd274fd5a6cc45641881bbcc6ee73417"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

# Perps Market PNUT / Peanut the Squirrel

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Parameter name</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ID:</td>
      <td>8800</td>
      <td><code>8800</code> / <code>0x2260</code></td>
    </tr>
    <tr>
      <td>maxMarketSize</td>
      <td>4 m</td>
      <td><code>4000000000000000000000000</code> / <code>0x034f086f3b33b684000000</code></td>
    </tr>
    <tr>
      <td>maxMarketValue</td>
      <td>3 m</td>
      <td><code>3000000000000000000000000</code> / <code>0x027b46536c66c8e3000000</code></td>
    </tr>
    <tr>
      <td>lockedOiRatio</td>
      <td>0.5</td>
      <td><code>500000000000000000</code> / <code>0x06f05b59d3b20000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Funding parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>skewScale</td>
      <td>10 m</td>
      <td><code>10000000000000000000000000</code> / <code>0x084595161401484a000000</code></td>
    </tr>
    <tr>
      <td>maxFundingVelocity</td>
      <td>9</td>
      <td><code>9000000000000000000</code> / <code>0x7ce66c50e2840000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Order fees</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>makerFee</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>takerFee</td>
      <td>0.001</td>
      <td><code>1000000000000000</code> / <code>0x038d7ea4c68000</code></td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Liquidation parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>initialMarginRatioD18</td>
      <td>4.688</td>
      <td><code>4688000000000000000</code> / <code>0x410f1f2973080000</code></td>
    </tr>
    <tr>
      <td>minimumInitialMarginRatioD18</td>
      <td>0.317</td>
      <td><code>317000000000000000</code> / <code>0x046635d209cc8000</code></td>
    </tr>
    <tr>
      <td>maintenanceMarginScalarD18</td>
      <td>0.05</td>
      <td><code>50000000000000000</code> / <code>0xb1a2bc2ec50000</code></td>
    </tr>
    <tr>
      <td>flagRewardRatioD18</td>
      <td>0.0003</td>
      <td><code>300000000000000</code> / <code>0x0110d9316ec000</code></td>
    </tr>
    <tr>
      <td>minimumPositionMargin</td>
      <td>50</td>
      <td><code>50000000000000000000</code> / <code>0x02b5e3af16b1880000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationLimitAccumulationMultiplier</td>
      <td>1.5</td>
      <td><code>1500000000000000000</code> / <code>0x14d1120d7b160000</code></td>
    </tr>
    <tr>
      <td>maxLiquidationPd</td>
      <td>0.0005</td>
      <td><code>500000000000000</code> / <code>0x01c6bf52634000</code></td>
    </tr>
    <tr>
      <td>maxSecondsInLiquidationWindow</td>
      <td>30</td>
      <td><code>30</code> / <code>0x1e</code></td>
    </tr>
    <tr>
      <td>endorsedLiquidator</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306"><code>0x95A61Fa7454CA5f6A3CE01724e306Cd14a22D306</code></a>
      </td>
    </tr>
  </tbody>
</table>

<table data-full-width="true">
  <thead>
    <tr>
      <th width="400">Settlement strategy parameters</th>
      <th width="100">Value</th>
      <th width="800">Raw value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>strategyId</td>
      <td>0</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>strategyType</td>
      <td>PYTH</td>
      <td><code>0</code> / <code>0x00</code></td>
    </tr>
    <tr>
      <td>settlementDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
    <tr>
      <td>settlementWindowDuration</td>
      <td>60</td>
      <td><code>60</code> / <code>0x3c</code></td>
    </tr>
    <tr>
      <td>priceVerificationContract</td>
      <td></td>
      <td>
        <a href="https://arbiscan.io/address/0x7b118596be900f3c0feB2f23758d9798965B72a3"><code>0x7b118596be900f3c0feB2f23758d9798965B72a3</code></a>
      </td>
    </tr>
    <tr>
      <td>feedId</td>
      <td></td>
      <td><code>"0x116da895807f81f6b5c5f01b109376e7f6834dc8b51365ab7cdfa66634340e54"</code></td>
    </tr>
    <tr>
      <td>settlementReward</td>
      <td>1</td>
      <td><code>1000000000000000000</code> / <code>0x0de0b6b3a7640000</code></td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>✅ Enabled</td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td>commitmentPriceDelay</td>
      <td>2</td>
      <td><code>2</code> / <code>0x02</code></td>
    </tr>
  </tbody>
</table>

