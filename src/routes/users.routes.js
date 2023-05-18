const { Router } = require('express');
const router = Router();
const usersController = require('../controllers/users.controllers')


router.post("/signup/",usersController.singUp);
router.post("/confirm/:token", usersController.confirmSingUp);
router.get("/signin/:email/:password",usersController.singIn);
router.get("/all",usersController.getAllUsers)
router.get("/id/:id",usersController.getUserById)

module.exports = router;