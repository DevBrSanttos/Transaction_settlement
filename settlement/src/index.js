require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongoDb = require('./db/conn');
const transactionRt = require('./routers/transactionRt');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1/transactions', transactionRt);

const initializeServer = async () => {
    
    await connectMongoDb().catch((err) => {
        console.log(`Error connecting to mongoDb. ${err}`)
    });

    app.listen(process.env.PORT, () => console.log(`Started server on port: ${process.env.PORT}`))
}

initializeServer();