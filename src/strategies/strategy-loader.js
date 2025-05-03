const { strategies } = require('./strategies');

function getStrategy(strategyName) {
  if (!strategies[strategyName]) {
    throw new Error(`Стратегия ${strategyName} не найдена`);
  }
  return strategies[strategyName];
}

module.exports = getStrategy;
