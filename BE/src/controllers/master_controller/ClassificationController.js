const modelClassification = require("../../models/classification.model");
const modelStructure = require("../../models/structure.model");
const { emit } = require("../../services/socket.service");
const api = require("../../tools/common");

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
  let { classificationId } = req.params;
  const tableNameDetail = `tbl_detail${classificationId}`;

  await modelClassification.deleteDetail(tableNameDetail);
  await modelClassification.deleteStructure(classificationId);

  let result = await modelClassification.deleteId(classificationId);

  emit("delete_classification", 200);

  return api.success(res, result);
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
