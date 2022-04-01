require('dotenv').config();
const Message = require('./src/models/Message');

const createCalculatorChannel = require('./src/channel/calculatorChannel');


async function calculateTaxAndSendMessage(channel, message){

    const newMessage = new Message(message.seller_id, message.amount, message.settlementId);
    newMessage.calculateTax();

     const newMessageJson = JSON.stringify(newMessage);
     await channel.sendToQueue(process.env.QUEUE_TAX_CALCULATION_RESPONSE, Buffer.from(newMessageJson));
     console.log('New message publish to queue');
}


const consumerMessages = async (queue) => {
    const calculatorChannel = new createCalculatorChannel();
    const channel = await calculatorChannel.createCalculatorChannel();

    channel.consume(queue, async msg => {
        const message = JSON.parse(msg.content.toString());
        await channel.ack(msg);

        await calculateTaxAndSendMessage(channel, message);
    });
}


consumerMessages(process.env.QUEUE_TAX_CALCULATION_REQUEST);

