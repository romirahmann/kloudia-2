const db = require("../database/db.config");

const getAll = async () =>
  db
    .select(
      "s.structureId",
      "s.classificationId",
      "s.structureName",
      "s.fieldSize",
      "s.typeId",
      "c.classificatioName",
      "t.typeName",
      "t.length"
    )
    .from("tbl_structure as s")
    .join("tbl_classification as c", "s.classificationId", "c.classificationId")
    .join("tbl_type as t", "t.typeId", "s.typeId");

const getByClassificationId = async (classificationId) =>
  db
    .select(
      "s.structureId",
      "s.classificationId",
      "s.structureName",
      "s.fieldSize",
      "s.typeId",
      "c.classificationName",
      "t.typeName",
      "t.length"
    )
    .from("tbl_structure as s")
    .join("tbl_classification as c", "s.classificationId", "c.classificationId")
    .join("tbl_typedata as t", "t.typeId", "s.typeId")
    .where("s.classificationId", classificationId);

const insert = async (data) => db("tbl_structure").insert(data);
const update = async (structureId, data) =>
  db("tbl_structure").update(data).where({ structureId });
const remove = async (structureId) =>
  db("tbl_structure").del().where({ structureId });
const detailIsExist = async (tableName) => db.schema.hasTable(tableName);

const createDetail = async (tableName, data) =>
  db.schema.createTable(tableName, (table) => {
    table.increments("detailId").primary();
    switch (parseInt(data.typeId)) {
      case 1: // Integer
        table.integer(data.structureName);
        break;
      case 2: // String
        table.string(data.structureName, 255);
        break;
      case 3: // Boolean
        table.boolean(data.structureName);
        break;
      case 4: // DateTime
        table.dateTime(data.structureName);
        break;
      default:
        throw new Error(`Tipe data tidak dikenali: ${typeId}`);
    }

    table.timestamps(true, true);
  });

const createColoumn = async (tableName, data) =>
  await db.schema.alterTable(tableName, (table) => {
    switch (parseInt(data.typeId)) {
      case 1: // Integer
        table.integer(data.structureName);
        break;
      case 2: // String
        table.string(data.structureName, 255);
        break;
      case 3: // Boolean
        table.boolean(data.structureName);
        break;
      case 4: // DateTime
        table.dateTime(data.structureName);
        break;
      default:
        throw new Error(`Tipe data tidak dikenali: ${typeId}`);
    }
  });

const deleteFieldDetail = async (tableName, detailId) => {};

// type data
const getAllType = async () => db.select("*").from("tbl_typedata");

module.exports = {
  getAll,
  insert,
  update,
  getByClassificationId,
  getAllType,
  detailIsExist,
  createColoumn,
  createDetail,
  remove,
  deleteFieldDetail,
};
