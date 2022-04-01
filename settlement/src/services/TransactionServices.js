const Transaction = require('../models/Transaction');
const { v4 } = require('uuid');

const TransactionServices = class {

    static async getTransactionsBySettlementDate(date){

        const listTransactions = await Transaction.aggregate([ {$match: { settlementDate: date }},
                                                            { $group: { _id: "$seller_id",  amount: {$sum: "$amount"}  }}
                                                        ]).sort({_id: 1});
        let transactions = [];
        listTransactions.forEach(transaction => {
            const objTransaction = {
                seller_id: transaction._id,
                amount: transaction.amount
            }
            transactions.push(objTransaction);
        });
        return transactions;
    }

    // Test Data
    static async createTransactionsTest(){
        let transactions = [];
        for(let i = 0; i < 10; i++){
                for(let j = 0; j < 100; j++){
                const transaction = new Transaction({
                    transactionId: v4(),
                    timeStamp: new Date().getDate(),
                    seller_id: i+1,
                    settlementDate: new Date('2022-03-01'),
                    amount: 5000
                })
                transactions.push(transaction);
            }
        }
        return transactions;
    }
}

module.exports = TransactionServices;