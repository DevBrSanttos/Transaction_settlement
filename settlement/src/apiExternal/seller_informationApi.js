require('dotenv').config();
let axios = require('axios');

const getSellerInformationById = async (seller_id) => {
    return await axios.get(`http://localhost:3000/v1/sellers/${seller_id}`);
}


module.exports = getSellerInformationById;

