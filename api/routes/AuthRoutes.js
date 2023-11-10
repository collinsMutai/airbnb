const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.get("/test", AuthController.test);

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get("/profile", AuthController.profile);

router.post("/places", AuthController.places);

router.get("/places", AuthController.getPlaces);

router.get("/user-places", AuthController.getUserPlaces);

router.get("/places/:action", AuthController.getPlace);

router.put("/places/:action", AuthController.updatePlace);

router.post("/bookings", AuthController.bookings)

router.get("/bookings", AuthController.getBookings)

module.exports = router;
