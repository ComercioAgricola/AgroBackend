const { Router } = require('express');
const router = Router();
const productController = require('../controllers/products.controller')

router.get("/all",productController.getAllProducts);
router.get("/all/lastproducts",productController.getAllLastProducts);


module.exports = router;