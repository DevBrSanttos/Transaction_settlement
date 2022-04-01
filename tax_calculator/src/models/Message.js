
const Message = class{
    constructor(seller_id, amount, settlementId){
        this.seller_id = seller_id;
        this.amount = amount;
        this.settlementId = settlementId;
        this.tax_value;
    }

    calculateTax(){
        this.tax_value = this.amount * 0.06;
    } 
}

module.exports = Message;