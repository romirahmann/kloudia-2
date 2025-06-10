const db = require("../database/db.config");

const isDocumentExist = async (titleDocument) =>
  await db("tbl_documents")
    .where("documentTitle", titleDocument)
    .first()
    .then((row) => !!row);

const insertDocument = async (data) => await db("tbl_documents").insert(data);

const insertVersion = async (data) => await db("tbl_versions").insert(data);

module.exports = {
  insertDocument,
  insertVersion,
  isDocumentExist,
};
