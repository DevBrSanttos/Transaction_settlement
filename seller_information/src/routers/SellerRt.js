const router = require('express').Router();
const SellerController = require('../controllers/SellerController');

router.get('/', SellerController.findPage);
router.get('/:id', SellerController.getSellerById);
router.patch('/:id', SellerController.updateSeller);
router.post('/', SellerController.insertSeller);

// router test
router.post('/dummy-data', SellerController.insertDataTest);

module.exports = router;