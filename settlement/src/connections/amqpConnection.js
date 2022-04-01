require('dotenv').config();
const { connect } = require('amqplib');
    
const createCalculatorTaxChannel = async () => {
    try {
        const connection = await connect(process.env.AMQP_SERVER);
        const channel = await connection.createChannel();

        await channel.assertQueue(process.env.QUEUE_TAX_CALCULATION_REQUEST);
        await channel.assertQueue(process.env.QUEUE_TAX_CALCULATION_RESPONSE);
        await channel.assertQueue(process.env.QUEUE_SETTLEMENT_FILE_REQUEST);
        
        console.log('Connected to RabbitMq');
        return channel;
    } catch (err) {
        console.log('Error connecting to RabbitMq')
        console.log(err);
        return null;
    }
}


module.exports = createCalculatorTaxChannel;