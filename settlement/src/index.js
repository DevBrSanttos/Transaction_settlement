require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongoDb = require('./db/conn');

const app = express();

app.use(cors());
app.use(express.json());


const initializeServer = async () => {
    await connectMongoDb().catch((err) => {
        console.log(`Error connecting to mongoDb. ${err}`)
    });

    app.listen(process.env.PORT, () => console.log(`Started server on port: ${process.env.PORT}`))
}

initializeServer();