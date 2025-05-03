const { Server } = require('@stellar/stellar-sdk');
const getStrategy = require('./strategies/strategy-loader');
const RiskManager = require('./core/risk');
const { mainnet, testnet } = require('../config/networks');

const selectedNetwork = process.env.NETWORK === 'testnet' ? testnet : mainnet;
const server = new Server(selectedNetwork.horizonUrl, {
  allowHttp: selectedNetwork.horizonUrl.includes('testnet')
});

async function executeStrategy(strategyName, keypair, baseAsset, counterAsset) {
  const strategy = getStrategy(strategyName);
  const riskManager = new RiskManager({
    riskPerTrade: parseFloat(process.env.RISK_PER_TRADE) || 0.02
  });

  const runCycle = async () => {
    try {
      const candles = await fetchCandleData(baseAsset, counterAsset);
      const signal = strategy.generateSignal(candles);
      const { ruvBalance, xlmBalance } = await getAccountBalance(keypair);
      
      if (signal === 'BUY') {
        const positionSize = riskManager.calculatePositionSize(
          candles[candles.length - 1].price,
          candles[candles.length - 1].price * 0.98,
          xlmBalance
        );
        await createBuyOrder(keypair, baseAsset, counterAsset, positionSize);
      } else if (signal === 'SELL') {
        const positionSize = riskManager.calculatePositionSize(
          candles[candles.length - 1].price,
          candles[candles.length - 1].price * 1.02,
          ruvBalance
        );
        await createSellOrder(keypair, baseAsset, counterAsset, positionSize);
      }
    } catch (error) {
      logger.error('Ошибка в стратегии:', error.message);
    }

    setTimeout(runCycle, process.env.TRADE_INTERVAL || 60000);
  };

  runCycle();
}
