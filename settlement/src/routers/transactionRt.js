const { Router } = require('express');
const TransactionController = require('../controllers/TransactionController');

const router = Router();

router.post('/dummy-data', TransactionController.insertDataTest);

module.exports = router;