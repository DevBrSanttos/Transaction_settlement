const Transaction = require('../models/Transaction');
const { v4 } = require('uuid');

const TransactionServices = class {

    static async createTransactionsTest(){
        let transactions = [];
        for(let i = 0; i < 10; i++){
                for(let j = 0; j < 100; j++){
                const transaction = new Transaction({
                    transactionId: v4(),
                    timeStamp: new Date().getDate(),
                    sellerId: i+1,
                    settlementDate: '2022-03-01',
                    amount: Math.floor((Math.random() * 1000000))
                })
                transactions.push(transaction);
            }
        }
        return transactions;
    }
}

module.exports = TransactionServices;