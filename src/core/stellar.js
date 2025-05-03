const { Server, Keypair, Asset, TransactionBuilder, Networks } = require('@stellar/stellar-sdk');

function createTransaction(account, operations, networkPassphrase) {
  const transaction = new TransactionBuilder(account, {
    fee: TransactionBuilder.BASE_FEE,
    networkPassphrase
  });

  operations.forEach(op => transaction.addOperation(op));
  return transaction.setTimeout(30).build();
}

async function submitTransaction(transaction, keypair) {
  transaction.sign(keypair);
  return await server.submitTransaction(transaction);
}

module.exports = {
  createTransaction,
  submitTransaction
};
