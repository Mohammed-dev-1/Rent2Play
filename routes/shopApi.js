const express = require('express')
const router =  express.Router();
const shopController = require('../controllers/shopController')


router.post('/shops', shopController.addShop);
router.get('/shops', shopController.shopList);
router.put('/shops/:id', shopController.updateShop);
router.delete('/shops/:id', shopController.deleteShop);

module.exports = router;
