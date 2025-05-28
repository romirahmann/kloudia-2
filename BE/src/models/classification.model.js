const db = require("../database/db.config");

const getAll = async () =>
  db
    .select(
      "cl.classificationId",
      "cl.classificationName",
      "cl.classificationDescription",
      "cl.cabinetId",
      "cl.createdAt",
      "cl.updateAt",
      "ca.cabinetName"
    )
    .from("tbl_classification as cl")
    .join("tbl_cabinets as ca", "cl.cabinetId", "ca.cabinetId");

module.exports = { getAll };
