const modelClassification = require("../../models/classification.model");
const api = require("../../tools/common");

const getAllClassification = api.catchAsync(async (req, res) => {
  let result = await modelClassification.getAll();
  return api.success(res, result);
});

module.exports = { getAllClassification };
