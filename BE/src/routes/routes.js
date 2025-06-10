var express = require("express");
var router = express.Router();
const path = require("path");

const { verifyToken, accessControl } = require("../services/auth.service");

const authRoutes = require("../routes/utility_routes/auth.routes");
const masterRoutes = require("../routes/master_routes/master.routes");
const fileRoutes = require("../routes/utility_routes/file.routes");

router.use("/auth/", authRoutes);
router.use("/master/", accessControl, verifyToken, masterRoutes);
router.use("/file/", fileRoutes);

module.exports = router;
