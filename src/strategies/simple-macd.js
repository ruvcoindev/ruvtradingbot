function generateSignal(candles) {
  const closes = candles.map(c => c.price);
  const ma = indicators.SMA.calculate({ period: 14, values: closes });
  const rsi = indicators.RSI.calculate({ period: 14, values: closes });
  const macd = indicators.MACD.calculate({ 
    values: closes,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9
  });

  const latestMacd = macd[0][macd[0].length - 1];
  const latestSignal = macd[1][macd[1].length - 1];
  const latestRsi = rsi[rsi.length - 1];
  const latestMa = ma[ma.length - 1];

  if (candles[candles.length - 1].price > latestMa && latestRsi < 30 && latestMacd > latestSignal) return 'BUY';
  if (candles[candles.length - 1].price < latestMa && latestRsi > 70 && latestMacd < latestSignal) return 'SELL';
  return 'HOLD';
}
