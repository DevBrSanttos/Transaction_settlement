const TransactionServices = require('../services/TransactionServices');

const TransactionController = class {

    static async getTransactionsBySettlementDate(Settlement){
        try {
            const date = Settlement.settlementDate;
            const transactions = await TransactionServices.getTransactionsBySettlementDate(date);
            return transactions;

        } catch (err) {
            res.status(500).json({ message: err });
            return
        }
    }
    
    
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