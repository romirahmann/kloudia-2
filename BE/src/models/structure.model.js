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
const update = async (sturctureId, data) =>
  db("tbl_structure").update(data).where({ sturctureId });

// type data
const getAllType = async () => db.select("*").from("tbl_typedata");

module.exports = {
  getAll,
  insert,
  update,
  getByClassificationId,
  getAllType,
};
