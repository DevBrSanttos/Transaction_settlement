const TransactionController = require('../controllers/TransactionController');
const SellerSettlementController = require('../controllers/SellerSettlementController');
const { publishRequestTax } = require('../messages/channelTaxCalculator');

const SellerSettlementServices = class {

    static async consolidateTransactions(newSettlement){
        const transactions = await TransactionController.getTransactionsBySettlementDate(newSettlement);
        SellerSettlementController.insertSellerSettlement(transactions, newSettlement);
        await publishRequestTax(transactions);
    }
}

module.exports = SellerSettlementServices;