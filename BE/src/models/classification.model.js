const db = require("../database/db.config");

// classifications
const getAll = async () =>
  db
    .select(
      "cl.classificationId",
      "cl.classificationName",
      "cl.classificationDescription",
      "cl.cabinetId",
      "cl.createdAt",
      "cl.updateAt",
      "cl.isActive",
      "ca.cabinetName"
    )
    .from("tbl_classification as cl")
    .join("tbl_cabinets as ca", "cl.cabinetId", "ca.cabinetId");

const byID = async (classificationId) =>
  db
    .select(
      "cl.classificationId",
      "cl.classificationName",
      "cl.classificationDescription",
      "cl.cabinetId",
      "cl.createdAt",
      "cl.updateAt",
      "cl.isActive",
      "ca.cabinetName"
    )
    .from("tbl_classification as cl")
    .join("tbl_cabinets as ca", "cl.cabinetId", "ca.cabinetId")
    .where("cl.classificationId", classificationId)
    .first();
const insert = async (data) => db("tbl_classification").insert(data);
const update = async (classificationId, data) =>
  db("tbl_classification").where({ classificationId }).update(data);
const deleteId = async (classificationId) =>
  db("tbl_classification").where({ classificationId }).del();

const byFilter = async (filter) => {
  const query = db
    .select(
      "cl.classificationId",
      "cl.classificationName",
      "cl.classificationDescription",
      "cl.cabinetId",
      "cl.createdAt",
      "cl.updateAt",
      "cl.isActive",
      "ca.cabinetName"
    )
    .from("tbl_classification as cl")
    .join("tbl_cabinets as ca", "cl.cabinetId", "ca.cabinetId");

  if (filter) {
    query.where(function () {
      this.where("cl.classificationName", "like", `%${filter.search}%`).orWhere(
        "cl.classificationDescription",
        "like",
        `%${filter.search}%`
      );
    });
  }

  if (filter.status) {
    query.where("cl.isActive", filter.status);
  }

  return await query;
};

// structure
const isExistsStructure = async (tabelName) =>
  await db.schema.hasTable(tabelName);

const createStrucutre = async (tableName) =>
  await db.schema.createTable(tableName, (table) => {
    table.increments("structureId").primary().notNullable();
    table.string("name", 50).notNullable();
    table.string("type", 50).notNullable();
    table.integer("fieldSize").nullable();
  });

const deleteStructure = async (classificationId) =>
  db("tbl_structure").where({ classificationId }).del();

const deleteDetail = async (tableName) => await db.schema.dropTable(tableName);

// type data

module.exports = {
  getAll,
  insert,
  update,
  deleteId,
  isExistsStructure,
  createStrucutre,
  deleteStructure,
  byFilter,
  byID,
  deleteDetail,
};
