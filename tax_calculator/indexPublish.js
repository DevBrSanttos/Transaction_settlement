require('dotenv').config();
const Message = require('./src/models/Message');
const createCalculatorChannel = require('./src/channel/calculatorChannel');

const publishMessage = async (queue) => {
    const calculatorChannel = new createCalculatorChannel();
    const channel = await calculatorChannel.createCalculatorChannel();
    
    while(true){
        const message = new Message();
        for(let i = 0; i < 10; i++){

            message.seller_id = Math.floor((Math.random() * 100));
            message.amount = Math.floor((Math.random() * 10000));

            const messageJson = JSON.stringify(message);

            await channel.sendToQueue(queue, Buffer.from(messageJson));

            console.log('Message send to queue');
            await new Promise(r => setTimeout(r, 5000));
        }
    }
}

publishMessage(process.env.QUEUE_TAX_CALCULATION_REQUEST);
