const Transaction = require('../models/Transaction');
const TransactionServices = require('../services/TransactionServices');

const TransactionController = class {


    
    
    static async insertDataTest(req, res){
        try {
            const transactions = await TransactionServices.createTransactionsTest();
            transactions.forEach(transaction => {
                transaction.save();
            });
            res.status(201).json();
        } catch (err) {
            res.status(500).json({ message: err });
        }
        
    }

}

module.exports = TransactionController;