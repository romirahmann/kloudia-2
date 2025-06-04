const modelStructure = require("../../models/structure.model");
const { emit } = require("../../services/socket.service");
const api = require("../../tools/common");

const getAllStructure = api.catchAsync(async (req, res) => {
  const result = await modelStructure.getAll();
  return api.success(res, result);
});

const getAllStructureByClassification = api.catchAsync(async (req, res) => {
  const { classificationId } = req.params;

  const result = await modelStructure.getByClassificationId(classificationId);
  return api.success(res, result);
});

const insertStructure = api.catchAsync(async (req, res) => {
  const data = req.body;

  console.log(data);

  let tableName = `tbl_detail${data.classificationId}`;
  await modelStructure.insert(data);
  const tablNameIsExist = await modelStructure.detailIsExist(tableName);

  if (tablNameIsExist) {
    await modelStructure.createColoumn(tableName, data);
    emit("Add_Structure", 200);
    return api.success(res, "Add Successfully");
  }

  await modelStructure.createDetail(tableName, data);

  emit("Add_Structure", 200);
  return api.success(res, result);
});

const updateStructure = api.catchAsync(async (req, res) => {
  const { structureID } = req.params;
  const data = req.body;

  const result = await modelStructure.update(structureID, data);
  emit("Update_Structure", 200);
  return api.success(res, result);
});

const deleteStructure = api.catchAsync(async (req, res) => {
  const { structureId } = req.params;

  const result = await modelStructure.remove(structureId);
  emit("Delete_Structure", 200);
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
  deleteStructure,
};
