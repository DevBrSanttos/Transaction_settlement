const SellerSettlementServices = require('../services/SellerSettlementServices');
const Settlement = require('../models/Settlement');
const { v4 } = require('uuid');


const SettlementController = class {
    
    static async insertSettlement(req, res){
        try{
            const settlement = new Settlement({
                settlementId: v4(),
                settlementDate: new Date('2022-03-01'),
                startDate: new Date()
            });

            const newSettlement = await settlement.save();
            
            await SellerSettlementServices.consolidateTransactions(newSettlement);
            res.status(201).json();

        }catch(err){
            res.status(500).json();
        }
    }

    static async getAll(req, res){
        try {
            const settlements = await Settlement.find();
            res.status(200).json(settlements);
        }catch(err){
            res.status(500).json();
        }
    }

}

module.exports = SettlementController;