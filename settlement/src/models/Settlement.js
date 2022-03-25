const { model, Schema } = require('mongoose');

const schema = new Schema({
    settlementId: { type: String, required: true },
    settlementDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    sellersCount: { type: Number, required: true },
    transactionsCount: { type: Number, required: true },
    elapsedMiliseconds: { type: Number, required: true }
});

const Settlement = model('settlements', schema);
module.exports = Settlement;