class RiskManager {
  constructor(config) {
    this.config = config;
  }

  calculatePositionSize(price, stopLoss, portfolioValue) {
    const riskAmount = portfolioValue * this.config.riskPerTrade;
    const priceDistance = Math.abs(price - stopLoss);
    return riskAmount / priceDistance;
  }

  adjustRiskOnDrawdown(portfolioValue, startingBalance) {
    const drawdown = 1 - portfolioValue / startingBalance;
    if (drawdown > 0.1) {
      return Math.max(0.01, this.config.riskPerTrade * 0.8);
    }
    return this.config.riskPerTrade;
  }
}

module.exports = RiskManager;
