const modelTenant = require("../../models/tenant.model");
const api = require("../../tools/common");
const { emit } = require("../../services/socket.service");

const getAllTenant = api.catchAsync(async (req, res) => {
  let result = await modelTenant.getAll();
  return api.success(res, result);
});

const getTenantById = api.catchAsync(async (req, res) => {
  let { tenantId } = req.params;

  if (!tenantId) return api.error(res, "Invalid Tenant id", 401);
  let result = await modelTenant.getByTenantId(tenantId);
  return api.success(res, result);
});

const createTenant = api.catchAsync(async (req, res) => {
  const data = req.body;
  data.isActive = 1;
  console.log(data);
  if (!data) return api.error(res, "Data not found", 401);
  let result = await modelTenant.create(data);
  emit("add_tenant", 200);
  return api.success(res, result);
});

const updateTenant = api.catchAsync(async (req, res) => {
  const { tenantId } = req.params;
  const data = req.body;

  if (!tenantId || !data)
    return api.error(res, "Invalid Tenant ID or data", 401);

  let result = await modelTenant.update(tenantId, data);
  emit("update_tenant", 200);
  return api.success(res, result);
});

const deleteTenant = api.catchAsync(async (req, res) => {
  const { tenantId } = req.params;
  if (!tenantId) return api.error(res, "Invalid Tenant ID", 401);
  let result = await modelTenant.remove(tenantId);
  emit("delete_tenant", 200);
  return api.success(res, result);
});

const getAllTenantByFilter = api.catchAsync(async (req, res) => {
  let filter = req.body;

  let result = await modelTenant.bySearch(filter);
  return api.success(res, result);
});

module.exports = {
  getAllTenant,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
  getAllTenantByFilter,
};
