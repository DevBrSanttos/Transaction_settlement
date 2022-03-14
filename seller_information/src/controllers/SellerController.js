const Seller = require('../models/Seller');

const SellerController = class {
    
    static async getSellerById(req, res){
        const id = req.params.id;
        const seller = await Seller.findOne({ _id: id });
        res.status(200).json({seller: seller});
    }

    static async registerSeller(req, res){
        const seller = new Seller(req.body);
        try {
            seller.save();
            res.status(201).json({message: 'Seller created', seller: seller });
        } catch (error) {
            res.status(500).json({ message: err });
        }
    }

    static async updateSeller(req, res){
        const { name, cnpj, bankCode, bankAccount, notes } = req.body;
        const id = req.params.id
        
        const seller = await Seller.findOne({ _id: id });
        if(!seller){
            res.status(200).json({message: 'Seller not found!'});
            return
        }
        seller.name = name;
        seller.cnpj = cnpj;
        seller.bankCode = bankCode;
        seller.bankAccount = bankAccount;
        seller.notes = notes;

        try {
            await Seller.findOneAndUpdate({ _id: seller._id }, { $set: seller }, { new: true});
            res.status(201).json({ seller: seller });
        } catch (err) {
            console.log(`Error: ${err}`);
            res.status(500).json({ message: err });
        }
    }

}

module.exports = SellerController;