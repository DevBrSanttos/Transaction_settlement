const router = require('express').Router();
const SellerController = require('../controllers/SellerController');

router.get('/:id', SellerController.getSellerById);
router.post('/', SellerController.registerSeller);
router.patch('/:id', SellerController.updateSeller);

module.exports = router;