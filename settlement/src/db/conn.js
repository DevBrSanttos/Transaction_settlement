require('dotenv').config();
const mongoose = require('mongoose');

const connectMongoDb = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    console.log('Connected to mongoDb');   
}

module.exports = connectMongoDb;