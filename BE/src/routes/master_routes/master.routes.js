var express = require("express");
var router = express.Router();

const UserController = require("../../controllers/master_controller/UserController");
const GroupController = require("../../controllers/master_controller/GroupController");
const TenantController = require("../../controllers/master_controller/TenantController");

// ROUTES USERS
router.post("/register", UserController.registrasi);
router.post("/users-filter", UserController.getAllByFilter);
router.get("/users", UserController.getAllUsers);
router.put("/user/:userId", UserController.updateUser);
router.delete("/user/:userId", UserController.deleteUser);
router.put("/reset-password", UserController.resetPassword);
router.get("/roles", UserController.getAllRole);
// OTP
router.post("/otp", UserController.requestOtp);
router.post("/validate-otp", UserController.validateOtp);

// GROUP
router.get("/groups", GroupController.getAllGroup);
router.get("/group/:grupId", GroupController.getGroupById);
router.put("/group/:grupId", GroupController.updateGroup);
router.delete("/group/:grupId", GroupController.deleteGroup);

// TENANTS
router.get("/tenants", TenantController.getAllTenant);
router.get("/tenant/:tenantId", TenantController.getTenantById);
router.put("/tenant/:tenantId", TenantController.updateTenant);
router.delete("/tenant/:tenantId", TenantController.deleteTenant);

module.exports = router;
