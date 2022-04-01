const { Router } = require('express');
const SettlementController = require('../controllers/SettlementController');

const router = Router();

router.post('/', SettlementController.insertSettlement);
router.get('/', SettlementController.getAll);

module.exports = router;