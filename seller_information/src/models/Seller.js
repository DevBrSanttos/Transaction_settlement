const { model, Schema } = require('mongoose');

const schema  = new Schema({
    seller_id: {type: Number, required: true },
    name: { type: String, required: true },
    cnpj: { type: String, required: true },
    bankCode: { type: Number, required: true },
    bankAccount: { type: Number, required: true},
    notes: { type: String}
    },
    { timestamps: true }
);

const Seller = model('Seller', schema);

module.exports = Seller;