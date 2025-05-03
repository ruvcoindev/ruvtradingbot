const { Keypair } = require('@stellar/stellar-sdk');
const { mainnet } = require('../config/networks');

function loadMainnetAccount(secretKey) {
  return {
    keypair: Keypair.fromSecret(secretKey),
    publicKey: Keypair.fromSecret(secretKey).publicKey()
  };
}
