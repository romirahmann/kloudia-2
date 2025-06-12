const modelCabinet = require("../../models/cabinet.model");
const { emit } = require("../../services/socket.service");
const api = require("../../tools/common");

const getAllCabinets = api.catchAsync(async (req, res) => {
  let result = await modelCabinet.getAll();
  return api.success(res, result);
});
const filterSearch = api.catchAsync(async (req, res) => {
  const { search } = req.query;
  let result = await modelCabinet.getByFitler(search);
  return api.success(res, result);
});
const createCabinet = api.catchAsync(async (req, res) => {
  let data = req.body;
  if (!data.tenantId || !data.grupId || !data.cabinetName)
    return api.error(res, "Invalid Data!", 401);

  let result = await modelCabinet.insert(data);
  emit("add_cabinet", 200);
  return api.success(res, result);
});
const updateCabinet = api.catchAsync(async (req, res) => {
  let data = req.body;
  let { cabinetId } = req.params;

  let result = await modelCabinet.update(cabinetId, data);
  emit("update_cabinet", 200);
  return api.success(res, result);
});
const deleteCabinet = api.catchAsync(async (req, res) => {
  let { cabinetId } = req.params;

  let result = await modelCabinet.remove(cabinetId);
  emit("delete_cabinet", 200);
  return api.success(res, result);
});

module.exports = {
  getAllCabinets,
  createCabinet,
  updateCabinet,
  deleteCabinet,
  filterSearch,
};
