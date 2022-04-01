const createCalculatorTaxChannel = require('../connections/amqpConnection');
const Settlement = require('../models/Settlement');
const { updateSettlements } = require('../services/SettlementServices');
const { createFile } = require('../files/file');

const consumerRequestSettlementFile = async () => {
    await createCalculatorTaxChannel().then((channel) => {
        channel.consume(process.env.QUEUE_SETTLEMENT_FILE_REQUEST, async msg => {
            const message = JSON.parse(msg.content.toString());
            await channel.ack(msg);
            await createFile(message);
            await updateSettlements(message);
        });
    }).catch((err) => {
        console.log(`Error connecting to rabbitMq. ${err}`);
    });
    
}

let oldMessage;
const publishRequestSettlementFile = async (sellerTaxCalculate) => {
    if(!oldMessage || oldMessage.settlementId != sellerTaxCalculate.settlementId){
        oldMessage = sellerTaxCalculate;
        const settlement = await Settlement.findOne({ settlementId: sellerTaxCalculate.settlementId });
        const objSettlement = {
            settlementId: settlement.settlementId,
            settlementDate: settlement.settlementDate,
        }
        await createCalculatorTaxChannel().then((channel) => {
            const objSettlementJson = JSON.stringify(objSettlement);
            channel.sendToQueue(process.env.QUEUE_SETTLEMENT_FILE_REQUEST, Buffer.from(objSettlementJson));

            console.log(`Send settlement to queue settlement file request`);
        }).catch((err) => {
            console.log(`Error connecting to rabbitMq. ${err}`);
        });
    }
    
}

module.exports = { publishRequestSettlementFile, consumerRequestSettlementFile }
