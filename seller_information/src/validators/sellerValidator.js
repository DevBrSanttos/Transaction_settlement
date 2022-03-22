const yup = require('yup');
const Seller = require('../models/Seller');
const isCnpj = require('./CNPJ');
const defaultMessage = require('./defaultMessage');

let errors = []
function validateSeller(){
    errors = [];
}

const schema = yup.object().shape({
    seller_id: yup.number().required("Id is required"), 
    name: yup.string().required("Name is required"), 
    cnpj: yup.string().required("CNPJ is required"), 
    bankCode: yup.number().required("Bank code is required"), 
    bankAccount: yup.number().required("Bank account is required")
});


validateSeller.prototype.sellerRequired = async (req) => {
    try{
        await schema.validate(req.body);
        
    }catch(err) {
        let msg = new defaultMessage(err.path, err.errors[0]);
        errors.push(msg);
    }
}

validateSeller.prototype.cnpjIsValid = async (req) => {
    if(isCnpj(req.body.cnpj))
        return true;
    
    let msg = new defaultMessage("CNPJ", "CNPJ invalid");
    errors.push(msg);
}

validateSeller.prototype.sellerByIdExists = async (id, addListErrors) => {
    const seller = await Seller.findOne({ seller_id: id });

    if(addListErrors){
        let msg = new defaultMessage("seller_id", "Id is registered");
        errors.push(msg)
    }
        
    return seller ? true : false;
}

validateSeller.prototype.isValid = () => {
    return errors.length == 0;
}

validateSeller.prototype.error = () => {
    return errors;
}

module.exports = validateSeller;