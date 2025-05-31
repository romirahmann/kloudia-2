const modelClassification = require("../../models/classification.model");
const { emit } = require("../../services/socket.service");
const api = require("../../tools/common");

const getAllClassification = api.catchAsync(async (req, res) => {
  let result = await modelClassification.getAll();
  return api.success(res, result);
});

const createClassification = api.catchAsync(async (req, res) => {
  let data = req.body;

  let result = await modelClassification.insert(data);
  const tabelNameStructure = `tbl_structure${result[0]}`;

  let isExistsStructure = await modelClassification.isExistsStructure(
    tabelNameStructure
  );

  if (isExistsStructure) return api.error(res, "Structure already exists");

  let resultStructure = await modelClassification.createStrucutre(
    tabelNameStructure
  );

  emit("add_classification", 200);

  return api.success(res, resultStructure);
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
  const tableNameStructure = `tbl_structure${classificationId}`;
  await modelClassification.deleteStructure(tableNameStructure);
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
};
