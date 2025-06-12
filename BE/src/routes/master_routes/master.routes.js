var express = require("express");
var router = express.Router();

const UserController = require("../../controllers/master_controller/UserController");
const GroupController = require("../../controllers/master_controller/GroupController");
const TenantController = require("../../controllers/master_controller/TenantController");
const CabinetController = require("../../controllers/master_controller/CabinetController");
const ClassificationController = require("../../controllers/master_controller/ClassificationController");
const StructureController = require("../../controllers/master_controller/StructureController");
const DocumentController = require("../../controllers/master_controller/DocumentController");
const upload = require("../../services/upload.service");

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
router.get("/filter-group", GroupController.filterGroup);
router.post("/group", GroupController.createGroup);
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
router.get("/filter-cabinet", CabinetController.filterSearch);
router.post("/cabinet", CabinetController.createCabinet);
router.put("/cabinet/:cabinetId", CabinetController.updateCabinet);
router.delete("/cabinet/:cabinetId", CabinetController.deleteCabinet);

// CLASSIFICATIONS
router.get("/classifications", ClassificationController.getAllClassification);
router.get(
  "/classification/:classificationId",
  ClassificationController.getClassificationId
);
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

// STRUCTRUE
router.get(
  "/structures/:classificationId",
  StructureController.getAllStructureByClassification
);
router.get(
  "/filter/structure/:classificationId",
  StructureController.getAllBySearch
);
router.post("/structure", StructureController.insertStructure);
router.put("/structure/:structureId", StructureController.updateStructure);
router.get("/typedata", StructureController.getAllTypeData);
router.delete("/structure/:structureId", StructureController.deleteStructure);

// DETAIL
router.get("/details/:classificationId", StructureController.getAllDetail);
router.get(
  "/details/:detailId/classification/:classificationId",
  StructureController.getAllDetailById
);
router.delete(
  "/detail/:detailId/classification/:classificationId",
  StructureController.deletedDetail
);

// DOCUMETNS
router.post(
  "/upload-document",
  upload.single("file"),
  DocumentController.uploadDocument
);

module.exports = router;
