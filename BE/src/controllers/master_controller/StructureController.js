const modelStructure = require("../../models/structure.model");
const { emit } = require("../../services/socket.service");
const api = require("../../tools/common");

const getAllStructure = api.catchAsync(async (req, res) => {
  const result = await modelStructure.getAll();
  return api.success(res, result);
});

const getAllStructureByClassification = api.catchAsync(async (req, res) => {
  const { classificationId } = req.params;
  console.log(classificationId);
  const result = await modelStructure.getByClassificationId(classificationId);
  return api.success(res, result);
});

const insertStructure = api.catchAsync(async (req, res) => {
  const data = req.body;
  const result = await modelStructure.insert(data);
  emit("ADD_STRUCTURE", 200);
  return api.success(res, result);
});

const updateStructure = api.catchAsync(async (req, res) => {
  const { structureID } = req.params;
  const data = req.body;

  const result = await modelStructure.update(structureID, data);
  emit("UPDATE_STRUCTURE", 200);
  return api.success(res, result);
});

// TYPE DATA
const getAllTypeData = api.catchAsync(async (req, res) => {
  const result = await modelStructure.getAllType();
  return api.success(res, result);
});

module.exports = {
  getAllStructure,
  insertStructure,
  updateStructure,
  getAllStructureByClassification,
  getAllTypeData,
};
