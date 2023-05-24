const { Router } = require('express');
const router = Router();
const buyerController = require('../controllers/buyers.controllers')

router.get("/all",buyerController.getAllBuyers);
router.get("/id/:id"    , buyerController.getBuyerById);
router.get('/login/:email/:password'    , buyerController.loginBuyers);
router.get('/totalMountCar/:idBuyer'    , buyerController.totalMountCar);
router.post('/addcar/:idProduct/:idBuyer/:cantidad'    , buyerController.agregarProducto);
router.delete('/delete/:idProduct/:idBuyer'    , buyerController.eliminarProducto);
router.post('/create'   , buyerController.createBuyer);
router.delete("/id/:id" , buyerController.deleteBuyerById);
router.put("/id/:id" , buyerController.updateBuyerById);


module.exports = router;