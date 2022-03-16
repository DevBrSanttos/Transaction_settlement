require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongoDb = require('./db/conn');
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./swagger.json');
const SellerRt = require('./routers/SellerRt');

const app = express();

app.use(cors());
app.use(express.json());

//routers
app.use('/v1/sellers', SellerRt);
app.use('/v1', swaggerUi.serve, swaggerUi.setup(swaggerJson));

const createServer = async () => {
    await connectMongoDb().catch((err) => {
        console.log(`Error connecting to mongoDb. ${err}`)
    });

    app.listen(process.env.PORT, console.log(`started server on port ${process.env.PORT}`));
}

createServer();
