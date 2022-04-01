const { model, Schema } = require('mongoose');

const schema = new Schema({
    settlementId: { type: String, required: true },
    settlementDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    sellersCount: { type: Number },
    transactionsCount: { type: Number },
    elapsedMiliseconds: { type: Number }
});

const Settlement = model('settlements', schema);
module.exports = Settlement;