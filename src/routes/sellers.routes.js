const { Router } = require('express');
const router = Router();
const sellersController = require("../controllers/sellers.controller");
const Auth = require('../config/Auth');

router.get("/all", sellersController.getAllSellers);
router.get("/all/products/:id", sellersController.getAllProductsSeller);
router.post("/create/product/:id", sellersController.createProduct);
router.put("/update/product/:idProduct", sellersController.updateProduct);
router.delete("/delete/product/:idSeller/:idProduct", sellersController.deleteProduct);


module.exports = router;