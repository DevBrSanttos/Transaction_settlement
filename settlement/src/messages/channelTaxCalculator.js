const createCalculatorTaxChannel = require('../connections/amqpConnection');
const SellerSettlementController = require('../controllers/SellerSettlementController');
const SellerSettlement = require('../models/SellerSettlement');
const { publishRequestSettlementFile } = require('../messages/channelSettlement_file');

const consumerResponseTax = async () => {
    const channel = await createCalculatorTaxChannel();
    channel.consume(process.env.QUEUE_TAX_CALCULATION_RESPONSE, async msg => {
        const message = JSON.parse(msg.content.toString());
        channel.ack(msg);
        await SellerSettlementController.updateSellerSettlement(message);

        if(await SellerSettlement.find({ taxValue: 0 }).count() == 0){
            publishRequestSettlementFile(message);
        }
    })
}

const publishRequestTax = async (transactions) => {
    
    await createCalculatorTaxChannel().then((channel) => {
        transactions.forEach(transaction => {
            const transactionJson = JSON.stringify(transaction);
            channel.sendToQueue(process.env.QUEUE_TAX_CALCULATION_REQUEST, Buffer.from(transactionJson));
        });
        console.log(`Send ${transactions.length} messages to queue tax calculation request\n`);
    }).catch((err) => {
        console.log(`Error connecting to rabbitMq. ${err}`);
    });
}

module.exports = { consumerResponseTax, publishRequestTax };