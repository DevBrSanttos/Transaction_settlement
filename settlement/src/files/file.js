const SellerSettlement = require('../models/SellerSettlement');
const fs = require('fs');

const createFile = async (message) => {
    
    const sellerSettlements = await SellerSettlement.find({ settlementId: message.settlementId }).sort({ seller_id: 1 });
    const file = fs.createWriteStream(`${__dirname}/${message.settlementDate.substring(0, 10)}.txt`, { flags: 'a', encoding: 'utf-8' });    
    
    sellerSettlements.forEach((sellerSettlement) => {
        file.write(`${sellerSettlement.seller_id}\t${sellerSettlement.amount}\t${sellerSettlement.taxValue}\t${sellerSettlement.bankCode}\t${sellerSettlement.bankAccount}\n`);
    });
    
    file.end('');
}


module.exports = { createFile };