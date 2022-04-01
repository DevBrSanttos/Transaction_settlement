const SellerSettlement = require('../models/SellerSettlement');
const Transaction = require('../models/Transaction');
const Settlement = require('../models/Settlement');
const router = require('express').Router();


router.get('/', async (req, res) => {
    await SellerSettlement.deleteMany();
    await Settlement.deleteMany();
    await Transaction.deleteMany();
    res.status(200).json();
});

module.exports = router;