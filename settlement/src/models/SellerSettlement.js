const { model, Schema } = require('mongoose');

const schema = new Schema({
    seller_id: { type: Number, required: true },
    settlementId: { type: String, required: true },
    amount: { type: Number, required: true },
    taxValue: { type: Number},
    bankCode: { type: Number},
    bankAccount: { type: Number}
});

const SellerSettlement = model('sellerSettlements', schema);
module.exports = SellerSettlement;