const Seller = require('../models/Seller');
const sellerServices = require('../services/SellerServices');

const SellerController = class {
    
    static async getSellerById(req, res){
        const seller = await sellerServices.getById(req, res);
        if(!seller)
            return
        
        res.status(200).json({seller});
    }

    static async insertSeller(req, res){

        const seller = await sellerServices.insertSeller(req, res);
        if(!seller)
            return
        try {
            seller.save();
            res.status(201).json();
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    static async updateSeller(req, res){
        const seller = sellerServices.updateSeller(req, res);
        if(!seller)
            return
        
        try {
            await Seller.updateOne({ seller_id : seller.seller_id }, { $set: seller });
            res.status(200).json();
        } catch (err) {
            console.log(`Error: ${err}`);
            res.status(500).json({ message: err });
        }
    }

    static async findPage(req, res){
        const { page, pageSize, ...filters } = req.query;

        const pageNumber = (page - 1) * pageSize;
        const result = await Seller.find(filters)
                                   .skip(pageNumber).limit(pageSize);
        
        const totalItens = result.length;
        let totalPages = Math.ceil(await Seller.find(filters).count() / pageSize);
        totalPages = totalPages > 0 ? totalPages : 1;

        res.status(200).json({page, pageSize, totalItens, totalPages, result});
    }

}


module.exports = SellerController;