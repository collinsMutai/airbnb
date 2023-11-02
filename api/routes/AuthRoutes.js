const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.get("/test", AuthController.test);

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get('/profile', AuthController.profile)

router.post('/places', AuthController.places)

module.exports = router;
