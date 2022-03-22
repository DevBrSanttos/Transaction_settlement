
const Message = class{
    constructor(seller_id, amount){
        this.seller_id = seller_id;
        this.amount = amount;
        this.tax_value;
    }

    calculateTax(){
        this.tax_value = this.amount * 0.06;
    } 
}

module.exports = Message;