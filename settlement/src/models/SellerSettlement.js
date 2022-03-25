const { model, Schema } = require('mongoose');

const schema = new Schema({
    sellerId: { type: Number, required: true },
    settlementId: { type: String, required: true },
    amount: { type: Number, required: true },
    taxValue: { type: Number, required: true },
    bankCode: { type: Number, required: true },
    bankAccount: { type: Number, required: true }
});

const SellerSettlement = model('sellerSettlements', schema);
module.exports = SellerSettlement;