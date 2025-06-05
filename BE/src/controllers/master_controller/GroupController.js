const { emit } = require("../../services/socket.service");
const modelGroup = require("../../models/group.model");
const api = require("../../tools/common");

const getAllGroup = api.catchAsync(async (req, res) => {
  let result = await modelGroup.getAll();

  return api.success(res, result);
});

const getGroupById = api.catchAsync(async (req, res) => {
  let { grupId } = req.params;

  if (!grupId) return api.error(res, "Invalid group id", 401);
  let result = await modelGroup.getBygrupId(grupId);
  return api.success(res, result);
});

const createGroup = api.catchAsync(async (req, res) => {
  const data = req.body;
  if (data) return api.error(res, "Data not found", 401);
  let result = await modelGroup.create(data);
  emit("Add_Group", 200);
  return api.success(res, result);
});

const updateGroup = api.catchAsync(async (req, res) => {
  const { grupId } = req.params;
  const data = req.body;

  if (!grupId || !data) return api.error(res, "Invalid group id or data", 401);

  let result = await modelGroup.update(grupId, data);
  emit("Update_Group", 200);
  return api.success(res, result);
});

const deleteGroup = api.catchAsync(async (req, res) => {
  const { grupId } = req.params;
  if (!grupId) return api.error(res, "Invalid group id", 401);
  let result = await modelGroup.remove(grupId);
  emit("Delete_Group", 200);
  return api.success(res, result);
});

module.exports = {
  getAllGroup,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
