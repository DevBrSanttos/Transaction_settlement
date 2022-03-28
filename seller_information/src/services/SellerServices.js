const validateSeller = require('../validators/sellerValidator');
const Seller = require('../models/Seller');
const { generate } = require('@fnando/cnpj')

const sellerServices = class {
    static async getById(req, res) {
        const validateContract = new validateSeller();
        const id = req.params.id;
        if(!await validateContract.sellerByIdExists(id, false)){
            res.status(404).json();
            return
        }
        return await Seller.findOne({ seller_id : id });
    }

    static async insertSeller(req, res) {
        const validateContract = new validateSeller();

        await validateContract.sellerRequired(req);
        await validateContract.cnpjIsValid(req);
        await validateContract.sellerByIdExists(req.body.seller_id);

        if(!validateContract.isValid()){
            res.status(400).json({error: validateContract.error()});
            return
        }
        if(await validateContract.sellerByIdExists(req.body.seller_id, true)){
            res.status(409).json({ error: validateContract.error() })
            return 
        }
        return new Seller(req.body);
    }

    static async updateSeller(req, res){
        const validateContract = new validateSeller();
        const id = req.params.id;
        
        if(!await validateContract.sellerByIdExists(id)){
            res.status(404).json();
            return
        }
        
        return new Seller(req.body);
    }

    // Test: create sellers
    static async createSellersTest(){
        let sellers = [];

        for(let i = 0; i < 10; i++){
            const seller = new Seller({
                seller_id: i+1,
                name: `mcDonalds ${i}`,
                cnpj: generate(true),
                bankCode: Math.floor(Math.random() * 100),
                bankAccount: Math.floor(Math.random() * 1000 + i),
                notes: ''
            })
            sellers.push(seller);
        }

        return sellers;

    }
}

module.exports = sellerServices;