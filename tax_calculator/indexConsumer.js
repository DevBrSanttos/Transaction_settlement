require('dotenv').config();
const Message = require('./src/models/Message');

const createCalculatorChannel = require('./src/channel/calculatorChannel');

const generateCalculatorConsumer = async (queue) => {
    const calculatorChannel = new createCalculatorChannel();
    const channel = await calculatorChannel.createCalculatorChannel();

    channel.consume(queue, async msg => {
        console.log('Message received');
        const message = JSON.parse(msg.content.toString());
        
        const newMessage = new Message(message.seller_id, message.amount);
        newMessage.calculateTax();
        
        await channel.ack(msg);

        const newMessageJson = JSON.stringify(newMessage);
        await channel.sendToQueue(process.env.QUEUE_TAX_CALCULATION_RESPONSE, Buffer.from(newMessageJson));
        console.log('New message publish');
        
    });
}

generateCalculatorConsumer(process.env.QUEUE_TAX_CALCULATION_REQUEST);

