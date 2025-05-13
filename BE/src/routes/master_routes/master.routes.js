var express = require("express");
var router = express.Router();

const UserController = require("../../controllers/master_controller/UserController");

// ROUTES USERS
router.post("/register", UserController.registrasi);
router.get("/users", UserController.getAllUsers);
router.put("/user/:userId", UserController.updateUser);
router.delete("/user/:userId", UserController.deleteUser);
router.put("/reset-password", UserController.resetPassword);

// OTP
router.post("/otp", UserController.requestOtp);
router.post("/validate-otp", UserController.validateOtp);

module.exports = router;
