// config/networks.js
module.exports = {
  testnet: {
    horizonUrl: 'https://horizon-testnet.stellar.org',
    friendbotUrl: 'https://friendbot.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015'
  },
  mainnet: {
    horizonUrl: 'https://horizon.stellar.org',
    networkPassphrase: 'Public Global Stellar Network ; September 2015'
  }
};

// config/strategies.js
module.exports = {
  'simple-macd': require('../src/strategies/simple-macd.js'),
  'rsi-ema': require('../src/strategies/rsi-ema.js')
};
