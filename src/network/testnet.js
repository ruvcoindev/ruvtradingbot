const { Keypair } = require('@stellar/stellar-sdk');
const axios = require('axios');
const { testnet } = require('../config/networks');

async function getTestnetAccount() {
  const keypair = Keypair.random();
  const url = `${testnet.friendbotUrl}?addr=${keypair.publicKey()}`;
  await axios.get(url);
  
  return {
    keypair,
    publicKey: keypair.publicKey(),
    secretKey: keypair.secret()
  };
}
