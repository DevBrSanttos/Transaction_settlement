const Transaction = require('../models/Transaction');
const Settlement = require('../models/Settlement');
const SellerSettlement = require('../models/SellerSettlement');

const updateSettlements = async (message) => {
    const qtdTransactions = await Transaction.find({ settlementDate: message.settlementDate }).count();
    const qtdSellers = await SellerSettlement.find({ settlementId: message.settlementId }).count();
    const settlement = await Settlement.findOne({ settlementId: message.settlementId });
    const elapsedMiliseconds = new Date().getTime() - settlement.startDate.getTime();

    await Settlement.updateOne({ settlementId: message.settlementId },
                               { $set: { sellersCount: qtdSellers, transactionsCount: qtdTransactions, endDate: new Date(),
                                         elapsedMiliseconds: elapsedMiliseconds } })
}

module.exports = { updateSettlements }