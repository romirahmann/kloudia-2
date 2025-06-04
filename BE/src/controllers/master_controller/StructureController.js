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
  return api.success(res, "Created Successfully!");
});

const updateStructure = api.catchAsync(async (req, res) => {
  const { structureId } = req.params;
  const data = req.body;

  const structure = await modelStructure.getById(structureId);
  if (!structure) return api.error(res, "Structure Not Found!", 404);
  let tableName = `tbl_detail${structure.classificationId}`;

  await modelStructure.update(structureId, data);
  await modelStructure.updateColumn(tableName, structure, data);

  emit("Update_Structure", 200);
  return api.success(res, "Update Successfully!");
});

const deleteStructure = api.catchAsync(async (req, res) => {
  const { structureId } = req.params;

  const structure = await modelStructure.getById(structureId);
  if (!structure) return api.error(res, "Structure Not Found!", 404);

  let tableName = `tbl_detail${structure.classificationId}`;
  let coloumnName = structure.structureName;

  await modelStructure.remove(structureId);
  await modelStructure.deleteFieldDetail(tableName, coloumnName);

  emit("Delete_Structure", 200);
  return api.success(res, "Successfully!");
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
