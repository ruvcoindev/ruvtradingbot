function generateSignal(candles) {
  const closes = candles.map(c => c.price);
  const ema = indicators.EMA.calculate({ period: 20, values: closes });
  const rsi = indicators.RSI.calculate({ period: 14, values: closes });

  const lastPrice = closes[closes.length - 1];
  const lastEma = ema[ema.length - 1];
  const lastRsi = rsi[rsi.length - 1];

  if (lastPrice > lastEma && lastRsi < 30) return 'BUY';
  if (lastPrice < lastEma && lastRsi > 70) return 'SELL';
  return 'HOLD';
}
