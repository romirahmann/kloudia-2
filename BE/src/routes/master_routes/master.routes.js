var express = require("express");
var router = express.Router();

const UserController = require("../../controllers/master_controller/UserController");
const GroupController = require("../../controllers/master_controller/GroupController");
const TenantController = require("../../controllers/master_controller/TenantController");
const CabinetController = require("../../controllers/master_controller/CabinetController");
const ClassificationController = require("../../controllers/master_controller/ClassificationController");

// ROUTES USERS
router.post("/register", UserController.registrasi);
router.post("/users-filter", UserController.getAllByFilter);
router.get("/users", UserController.getAllUsers);
router.put("/user/:userId", UserController.updateUser);
router.delete("/user/:userId", UserController.deleteUser);
router.put("/reset-password", UserController.resetPassword);
router.get("/roles", UserController.getAllRole);
// OTP
router.put("/otp", UserController.requestOtp);
router.post("/validate-otp", UserController.validateOtp);

// GROUP
router.get("/groups", GroupController.getAllGroup);
router.get("/group/:grupId", GroupController.getGroupById);
router.put("/group/:grupId", GroupController.updateGroup);
router.delete("/group/:grupId", GroupController.deleteGroup);

// TENANTS
router.get("/tenants", TenantController.getAllTenant);
router.post("/filter-tenants", TenantController.getAllTenantByFilter);
router.post("/tenant", TenantController.createTenant);
router.get("/tenant/:tenantId", TenantController.getTenantById);
router.put("/tenant/:tenantId", TenantController.updateTenant);
router.delete("/tenant/:tenantId", TenantController.deleteTenant);

// CABINETS
router.get("/cabinets", CabinetController.getAllCabinets);
router.post("/cabinet", CabinetController.createCabinet);
router.put("/cabinet/:cabinetId", CabinetController.updateCabinet);
router.delete("/cabinet/:cabinetId", CabinetController.deleteCabinet);

// CLASSIFICATIONS
router.get("/classifications", ClassificationController.getAllClassification);
router.put(
  "/classification/:classificationId",
  ClassificationController.updateClassification
);
router.post("/classification", ClassificationController.createClassification);
router.post(
  "/filter-classification",
  ClassificationController.getClassificationByFilter
);
router.delete(
  "/classification/:classificationId",
  ClassificationController.deleteClassification
);

module.exports = router;
