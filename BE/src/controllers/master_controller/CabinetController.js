const modelCabinet = require("../../models/cabinet.model");
const api = require("../../tools/common");

const getAllCabinets = api.catchAsync(async (req, res) => {
  let result = await modelCabinet.getAll();
  return api.success(res, result);
});
const createCabinet = api.catchAsync(async (req, res) => {
  let data = req.body;
  if (!data.tenantId || !data.grupId || !data.cabinetName)
    return api.error(res, "Invalid Data!", 401);

  let result = await modelCabinet.insert(data);
  return api.success(res, result);
});
const updateCabinet = api.catchAsync(async (req, res) => {
  let data = req.body;
  let { cabinetId } = req.params;

  let result = await modelCabinet.update(cabinetId, data);
  return api.success(res, result);
});
const deleteCabinet = api.catchAsync(async (req, res) => {
  let { cabinetId } = req.params;

  let result = await modelCabinet.remove(cabinetId);
  return api.success(res, result);
});

module.exports = {
  getAllCabinets,
  createCabinet,
  updateCabinet,
  deleteCabinet,
};
