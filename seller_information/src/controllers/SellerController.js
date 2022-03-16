const Seller = require('../models/Seller');
const objId = require('mongoose');
const { countDocuments } = require('../models/Seller');

const SellerController = class {
    
    static async getSellerById(req, res){
        const id = req.params.id;
        const seller = await Seller.findOne({ seller_id : id });
        res.status(200).json({seller});
    }

    static async registerSeller(req, res){
        const seller = new Seller(req.body);
        try {
            seller.save();
            res.status(201).json();
        } catch (error) {
            res.status(500).json({ message: err });
        }
    }

    static async updateSeller(req, res){
        const { notes } = req.body;
        const id = req.params.id;

        try {
            await Seller.updateOne({ seller_id : id }, { $set: { notes : notes } });
            res.status(200).json();
        } catch (err) {
            console.log(`Error: ${err}`);
            res.status(500).json({ message: err });
        }
    }

    static async findPage(req, res){
        const { page, pageSize, ...obj } = req.query;

        const pageNumber = (page - 1) * pageSize;
        const result = await Seller.find(obj)
                                   .skip(pageNumber).limit(pageSize);
        
        const totalItens = result.length;
        let totalPages = Math.ceil(await Seller.countDocuments() / pageSize);
        totalPages = totalPages > 0 ? totalPages : 1;

        res.status(200).json({page, pageSize, totalItens, totalPages, result});
    }

}

module.exports = SellerController;