const db = require("../database/db.config");
const fs = require("fs");
const path = require("path");

const isDocumentExist = async (titleDocument) =>
  await db("tbl_documents")
    .where("documentTitle", titleDocument)
    .first()
    .then((row) => !!row);

const insertDocument = async (data) => await db("tbl_documents").insert(data);

const insertVersion = async (data) => await db("tbl_versions").insert(data);

const deletedDocument = async (classificationId) =>
  await db("tbl_documents").where("classificationId", classificationId).del();

// Ambil dokumen berdasarkan classificationId
const getDocumentsByClassification = async (trx, classificationId) =>
  await trx("tbl_documents")
    .where("classificationId", classificationId)
    .select("documentId", "encryption_title");

// Ambil semua documentId berdasarkan classificationId
const getDocumentIdsByClassification = async (trx, classificationId) =>
  await trx("tbl_documents")
    .where("classificationId", classificationId)
    .pluck("documentId");

// Hapus versi
const deleteVersionsByDocumentIds = async (trx, documentIds) =>
  await trx("tbl_versions").whereIn("documentId", documentIds).del();

// Hapus dokumen
const deleteDocumentsByIds = async (trx, documentIds) =>
  await trx("tbl_documents").whereIn("documentId", documentIds).del();

// Hapus file fisik
const deletePhysicalFiles = (documents) => {
  for (const doc of documents) {
    const filePath = path.join(
      __dirname,
      "..",
      "documents",
      doc.encryption_title
    );
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);

      console.log("Deleted:", filePath);
      return true;
    } else {
      return false;
      console.warn("File not found:", filePath);
    }
  }
};
module.exports = {
  insertDocument,
  insertVersion,
  isDocumentExist,
  deletedDocument,
  getDocumentsByClassification,
  getDocumentIdsByClassification,
  deleteVersionsByDocumentIds,
  deleteDocumentsByIds,
  deletePhysicalFiles,
};
