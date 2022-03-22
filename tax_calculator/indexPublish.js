require('dotenv').config();
const Message = require('./src/models/Message');
const createCalculatorChannel = require('./src/channel/calculatorChannel');   

let channel;

const consumerNewMessage = async () => {
    channel.consume(process.env.QUEUE_TAX_CALCULATION_RESPONSE, async msg => {
        const message = JSON.parse(msg.content.toString());
        await channel.ack(msg);

        console.log(`New message received:`);
        console.log(message);
        return message;
    });
}

const publishAndConsumerNewMessage = async (queue, messageJson) => {     
    if(!channel){
        const calculatorChannel = new createCalculatorChannel();
        channel = await calculatorChannel.createCalculatorChannel();
    }

    await channel.sendToQueue(queue, Buffer.from(messageJson));
    console.log(`\nSend message to queue\n`);

    return await consumerNewMessage();
    
}

const main = async() => {

    const message = new Message();
    
    for(let i = 0; i < 10; i++){
        message.seller_id = Math.floor((Math.random() * 100));
        message.amount = Math.floor((Math.random() * 10000));
        const messageJson = JSON.stringify(message);

        await publishAndConsumerNewMessage(process.env.QUEUE_TAX_CALCULATION_REQUEST, messageJson);
        
        await new Promise(r => setTimeout(r, 5000));
    }
    
}

main();

