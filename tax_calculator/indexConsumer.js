require('dotenv').config();
const createCalculatorChannel = require('./src/channel/calculatorChannel');

const generateCalculatorConsumer = async (queue) => {
    const calculatorChannel = new createCalculatorChannel();
    const channel = await calculatorChannel.createCalculatorChannel();
    await calculatorChannel.consumerMessage(channel, queue);
}

generateCalculatorConsumer(process.env.QUEUE_TAX_CALCULATION_REQUEST);

