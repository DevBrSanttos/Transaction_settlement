const { model, Schema } = require('mongoose');

const schema = new Schema({
    transactionId: { type: String, required: true },
    timeStamp: { type: Date, required: true },
    sellerId: { type: Number, required: true },
    settlementDate: { type: Date, required: true },
    amount: { type: Number, required: true }
});

const Transaction = model('Transactions', schema);
module.exports = Transaction;