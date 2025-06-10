var express = require("express");
var router = express.Router();
const path = require("path");

const DocumentController = require("../../controllers/master_controller/DocumentController");

router.get("/get-file", DocumentController.getFile);

module.exports = router;
