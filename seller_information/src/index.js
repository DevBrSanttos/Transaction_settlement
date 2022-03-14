require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongoDb = require('./db/conn');
const SellerRt = require('./routers/SellerRt');

const app = express();

app.use(cors());
app.use(express.json());

//routers
app.use('/v1/sellers', SellerRt);

const createServer = async () => {
    await connectMongoDb().catch((err) => {
        console.log(`Error connecting to mongoDb. ${err}`)
    });

    app.listen(process.env.PORT, console.log(`started server on port ${process.env.PORT}`));
}

createServer();
