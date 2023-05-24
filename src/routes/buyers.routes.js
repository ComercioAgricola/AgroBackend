const { Router } = require('express');
const router = Router();
const buyerController = require('../controllers/buyers.controllers')

router.get("/all",buyerController.getAllBuyers);
router.get("/id/:id"    , buyerController.getBuyerById);
router.get('/totalMountCar/:idBuyer'    , buyerController.totalMountCar);
router.post('/addcar/:idProduct/:idBuyer/:cantidad'    , buyerController.agregarProducto);
router.delete('/delete/:idProduct/:idBuyer'    , buyerController.eliminarProducto);
router.get('/allProductsCar/:idBuyer', buyerController.getAllProductsCar)


module.exports = router;