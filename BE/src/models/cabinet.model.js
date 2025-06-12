const db = require("../database/db.config");

const getAll = async () =>
  await db
    .select(
      "c.cabinetId",
      "c.cabinetName",
      "c.grupId",
      "c.tenantId",
      "c.isActive",
      "t.tenantName",
      "g.grupName"
    )
    .from("tbl_cabinets as c")
    .join("tbl_tenants as t", "c.tenantId", "t.tenantId")
    .innerJoin("tbl_grup_user as g", "c.grupId", "g.grupId");

const insert = async (data) => db("tbl_cabinets").insert(data);
const update = async (cabinetId, data) =>
  db("tbl_cabinets").update(data).where({ cabinetId });
const remove = async (cabinetId) =>
  db("tbl_cabinets").where({ cabinetId }).del();

const getByFitler = async (search = "") => {
  const query = db("tbl_cabinets as c")
    .select(
      "c.cabinetId",
      "c.cabinetName",
      "c.grupId",
      "c.tenantId",
      "c.isActive",
      "t.tenantName",
      "g.grupName"
    )
    .join("tbl_tenants as t", "c.tenantId", "t.tenantId")
    .innerJoin("tbl_grup_user as g", "c.grupId", "g.grupId");
  if (search) {
    query.where(function () {
      this.where("cabinetName", "like", `${search}%`);
    });
  }

  return await query;
};

module.exports = {
  getAll,
  insert,
  update,
  remove,
  getByFitler,
};
