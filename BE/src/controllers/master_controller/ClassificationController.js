const modelClassification = require("../../models/classification.model");
const modelStructure = require("../../models/structure.model");
const modelDocument = require("../../models/document.model");
const { emit } = require("../../services/socket.service");
const api = require("../../tools/common");
const knex = require("../../database/db.config");

const getAllClassification = api.catchAsync(async (req, res) => {
  let result = await modelClassification.getAll();
  return api.success(res, result);
});

const getClassificationId = api.catchAsync(async (req, res) => {
  const { classificationId } = req.params;
  let result = await modelClassification.byID(classificationId);
  return api.success(res, result);
});

const createClassification = api.catchAsync(async (req, res) => {
  let data = req.body;

  let result = await modelClassification.insert(data);

  const tableName = `tbl_detail${result[0]}`;
  const tablNameIsExist = await modelStructure.detailIsExist(tableName);

  if (!tablNameIsExist) {
    await modelStructure.createDetail(tableName, data);
    emit("add_classification", 200);
    return api.success(res, "Add Successfully");
  }

  emit("add_classification", 200);

  return api.success(res, result);
});

const updateClassification = api.catchAsync(async (req, res) => {
  let { classificationId } = req.params;
  let data = req.body;
  let result = await modelClassification.update(classificationId, data);
  emit("update_classification", 200);
  return api.success(res, result);
});

const deleteClassification = api.catchAsync(async (req, res) => {
  const classificationId = parseInt(req.params.classificationId);
  const tableNameDetail = `tbl_detail${classificationId}`;

  await knex.transaction(async (trx) => {
    // 1. Ambil dokumen & documentId terkait classification ini
    const documents = await modelDocument.getDocumentsByClassification(
      trx,
      classificationId
    );

    console.log("Documents by classificationId: ", documents);

    const documentIds = documents.map((doc) => doc.documentId);
    console.log("documentIDS: ", documentIds);
    // 2. Hapus file fisik
    modelDocument.deletePhysicalFiles(documents);

    if (documentIds.length > 0) {
      // 3. Hapus versi dokumen
      await modelDocument.deleteVersionsByDocumentIds(trx, documentIds);

      // 4. Hapus detail dokumen jika table-nya ada
      const isDetailExist = await trx.schema.hasTable(tableNameDetail);
      if (isDetailExist) {
        await trx(tableNameDetail).whereIn("documentId", documentIds).del();
      }

      // 5. Hapus dari tbl_documents
      await modelDocument.deleteDocumentsByIds(trx, documentIds);
    }

    // 6. Hapus struktur
    await modelClassification.deleteStructure(classificationId);

    // 7. Hapus classification
    await modelClassification.deleteId(classificationId);

    // 8. Hapus tabel detail jika masih ada
    const isDetailStillExist = await trx.schema.hasTable(tableNameDetail);
    if (isDetailStillExist) {
      await trx.schema.dropTable(tableNameDetail);
    }

    // Emit ke socket
    emit("delete_classification", 200);
  });

  return api.success(
    res,
    `Classification ${classificationId} dan seluruh dokumen terkait berhasil dihapus.`
  );
});

const getClassificationByFilter = api.catchAsync(async (req, res) => {
  const filter = req.body;
  const result = await modelClassification.byFilter(filter);
  return api.success(res, result);
});

module.exports = {
  getAllClassification,
  createClassification,
  updateClassification,
  deleteClassification,
  getClassificationByFilter,
  getClassificationId,
};
