require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongoDb = require('./connections/dbConnection');
const transactionRt = require('./routers/transactionRt');
const settlementRt = require('./routers/settlementRt');
const deleteAllRt = require('./routers/deleteAllRt');
const { consumerResponseTax } = require('./messages/channelTaxCalculator');
const { consumerRequestSettlementFile } = require('./messages/channelSettlement_file');

const app = express();

app.use(cors());
app.use(express.json());

// Routers
app.use('/v1/transactions', transactionRt);
app.use('/v1/settlements', settlementRt);
app.use('/v1/deleteAll', deleteAllRt);


const initializeServer = async () => {
    await connectMongoDb().then(() => {
        app.listen(process.env.PORT, () => console.log(`Started server on port: ${process.env.PORT}`));
        consumerResponseTax();
        consumerRequestSettlementFile();
    }).catch((err) => {
        console.log(`Error connecting to mongoDb. ${err}`)
    });
    
}

initializeServer();