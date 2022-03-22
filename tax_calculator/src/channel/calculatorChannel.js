require('dotenv').config();
const { connect } = require('amqplib');
const Message = require('../models/Message');

const CalculatorChannel = class{
    async createCalculatorChannel () {
        try {
            const connection = await connect(process.env.AMQP_SERVER);
            const channel = await connection.createChannel();

            await channel.assertQueue(process.env.QUEUE_TAX_CALCULATION_REQUEST);
            await channel.assertQueue(process.env.QUEUE_TAX_CALCULATION_RESPONSE);
            
            console.log('Connected to RabbitMq');
            return channel;
        } catch (err) {
            console.log('Error connecting to RabbitMq')
            console.log(err);
            return null;
        }
    }

    async publishMessage(channel, messageJson, queue){
        await channel.sendToQueue(queue, Buffer.from(messageJson));
    }

    async consumerMessage(channel, queue){
    
        channel.consume(queue, async msg => {
            console.log('Message received');
            const message = JSON.parse(msg.content.toString());
            
            const newMessage = new Message(message.seller_id, message.amount);
            newMessage.calculateTax();
            
            await channel.ack(msg);

            const newMessageJson = JSON.stringify(newMessage);
            await this.publishMessage(channel, newMessageJson, process.env.QUEUE_TAX_CALCULATION_RESPONSE);
            
        });
    }
}

module.exports = CalculatorChannel;
