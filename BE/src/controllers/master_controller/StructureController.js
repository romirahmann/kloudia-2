const { default: camelcase } = require("camelcase");
const modelStructure = require("../../models/structure.model");
const modelClassification = require("../../models/classification.model");
const { emit } = require("../../services/socket.service");
const api = require("../../tools/common");
const moment = require("moment");

const getAllStructure = api.catchAsync(async (req, res) => {
  const result = await modelStructure.getAll();
  return api.success(res, result);
});

const getAllStructureByClassification = api.catchAsync(async (req, res) => {
  const { classificationId } = req.params;

  const result = await modelStructure.getByClassificationId(classificationId);
  return api.success(res, result);
});

const getAllBySearch = api.catchAsync(async (req, res) => {
  const { search } = req.query;
  const { classificationId } = req.params;

  const result = await modelStructure.getStructureByFilter(
    classificationId,
    search
  );
  return api.success(res, result);
});

const insertStructure = api.catchAsync(async (req, res) => {
  const data = req.body;

  data.structureDescription = camelcase(data.structureName);

  await modelStructure.insert(data);

  let tableName = `tbl_detail${data.classificationId}`;
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
  data.structureDescription = camelcase(data.structureName);
  const structure = await modelStructure.getById(structureId);
  if (!structure) return api.error(res, "Structure Not Found!", 404);
  let tableName = `tbl_detail${structure.classificationId}`;

  let editStructure = await modelStructure.update(structureId, data);
  if (!editStructure) {
    return api.error(res, "Failed Update Structure!", 401);
  }
  await modelStructure.updateColumn(tableName, structure, data);

  emit("Update_Structure", 200);
  return api.success(res, "Update Successfully!");
});

const deleteStructure = api.catchAsync(async (req, res) => {
  const { structureId } = req.params;

  const structure = await modelStructure.getById(structureId);
  if (!structure) return api.error(res, "Structure Not Found!", 404);

  let tableName = `tbl_detail${structure.classificationId}`;
  let coloumnName = structure.structureDescription;

  await modelStructure.remove(structureId);
  await modelStructure.deleteFieldDetail(tableName, coloumnName);

  emit("Delete_Structure", 200);
  return api.success(res, "Successfully!");
});

const getAllDetail = api.catchAsync(async (req, res) => {
  const { classificationId } = req.params;
  if (!classificationId) return api.error(res, "Invalid Classification", 401);
  const tableName = `tbl_detail${classificationId}`;

  let data = await modelStructure.getAllDetail(tableName);
  return api.success(res, data);
});
const getAllDetailById = api.catchAsync(async (req, res) => {
  const { classificationId, detailId } = req.params;
  if (!classificationId) return api.error(res, "Invalid Classification", 401);
  const tableName = `tbl_detail${classificationId}`;

  let data = await modelStructure.getDetailById(tableName, detailId);
  return api.success(res, data);
});

const deletedDetail = api.catchAsync(async (req, res) => {
  const { detailId, classificationId } = req.params;
  // console.log({ detailId, classificationId });
  const tableName = `tbl_detail${classificationId}`;
  let result = await modelStructure.deletedRowDetail(tableName, detailId);
  return api.success(res, result);
});

const getGlobalFileTree = api.catchAsync(async (req, res) => {
  const classifications = await modelClassification.getAll();
  const cabinetMap = new Map();

  for (const cls of classifications) {
    const { cabinetId, cabinetName, classificationId, classificationName } =
      cls;

    if (!cabinetMap.has(cabinetId)) {
      cabinetMap.set(cabinetId, {
        cabinetId,
        cabinetName,
        classifications: [],
      });
    }

    cabinetMap.get(cabinetId).classifications.push({
      classificationId,
      classificationName,
    });
  }

  return api.success(res, Array.from(cabinetMap.values()));
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
  getAllDetail,
  deletedDetail,
  getAllDetailById,
  getAllBySearch,
  getGlobalFileTree,
};
