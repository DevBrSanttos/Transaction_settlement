const SellerSettlement = require('../models/SellerSettlement');
const getSellerInformationById = require('../apiExternal/seller_informationApi');


const SellerSettlementController = class {

    
    static insertSellerSettlement(transactions, settlement){
        try {
            transactions.forEach(transaction => {
                const sellerSettlement = new SellerSettlement({
                    seller_id: transaction.seller_id,
                    settlementId: settlement.settlementId,
                    amount: transaction.amount,
                    taxValue: 0,
                    bankCode: 0,
                    bankAccount: null
                });
                transaction.settlementId = settlement.settlementId;
                sellerSettlement.save();
            });
        } catch (err) {
            console.log(`Error to insert seller settlement. ${err}`);
        }
        
        
    }

    static async updateSellerSettlement(sellerTaxCalculate){
        try {
            const seller_information = await getSellerInformationById(sellerTaxCalculate.seller_id);
            if(seller_information.status == 200){
                await SellerSettlement.updateOne({ seller_id: seller_information.data.seller.seller_id, settlementId: sellerTaxCalculate.settlementId }, 
                    { $set: {taxValue: sellerTaxCalculate.tax_value,
                             bankCode: seller_information.data.seller.bankCode,
                             bankAccount: seller_information.data.seller.bankAccount}});
            }
            
        } catch (err) {
            console.log(`Error to update seller settlement. ${err}`);
        }
    }

}

module.exports = SellerSettlementController;