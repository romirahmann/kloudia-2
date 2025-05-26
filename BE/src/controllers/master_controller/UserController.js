const userModel = require("../../models/user.modal");
const { hashPasword, verifyPassword } = require("../../services/auth.service");
const { emit } = require("../../services/socket.service");
const api = require("../../tools/common");
const moment = require("moment");
const { sendOtp } = require("../../services/email.service");

const registrasi = api.catchAsync(async (req, res) => {
  const data = req.body;
  console.log(data);

  if (
    !data.username ||
    !data.password ||
    !data.roleId ||
    !data.tenantId ||
    !data.grupId
  ) {
    return api.error(
      res,
      "Username, Password, Role, Tenant, and Grup is require!",
      401
    );
  }
  data.password = await hashPasword(data.password);
  if (!data.password) return api.error(res, "Failed Hasing Password!", 401);
  let result = await userModel.insert(data);

  emit("add_user", { message: "ADD USER SUCCESSFULLY!" });

  return api.success(res, result);
});

const getAllUsers = api.catchAsync(async (req, res) => {
  let result = await userModel.getAll();
  return api.success(res, result);
});

const updateUser = api.catchAsync(async (req, res) => {
  const { userId } = req.params;

  const data = req.body;

  if (!userId) return api.error(res, "User ID is required!", 401);

  let result = await userModel.update(userId, data);
  emit("update_user", { message: "UPDATE USER SUCCESSFULLY!" });
  return api.success(res, result);
});
const deleteUser = api.catchAsync(async (req, res) => {
  const { userId } = req.params;
  if (!userId) return api.error(res, "User ID is required!", 401);

  let result = await userModel.deleteById(userId);

  emit("delete_user", { message: "delete USER SUCCESSFULLY!" });
  return api.success(res, result);
});

const resetPassword = api.catchAsync(async (req, res) => {
  const data = req.body;

  if (!data.oldPassword || !data.newPassword)
    return api.error(res, "Old Password and New Password is required!", 401);

  const user = await userModel.findByEmail(data.email);

  if (!user) return api.error(res, "User Not Found!", 401);

  let oldPasswordMacth = await verifyPassword(data.oldPassword, user.password);
  if (!oldPasswordMacth)
    return api.error(res, "Old Password is incorrect!", 401);

  await userModel.update(user.userId, { password: data.newPassword });
  return api.success(res, "Reset Password Successfully");
});

const getAllByFilter = api.catchAsync(async (req, res) => {
  const filter = req.body;

  let result = await userModel.getByFilter(filter);

  return api.success(res, result);
});

// OTP
const requestOtp = api.catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findByEmail(email);
  if (!user) return api.error(res, "Email tidak ditemukan", 404);

  const otp = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const expired = moment().add(1, "minutes").toDate();

  await userModel.update(user.userId, { otpCode: otp, otpExpiredAt: expired });
  await sendOtp(user.email, otp);

  return api.success(res, "OTP berhasil dikirim ke Email!");
});

const validateOtp = api.catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp);
  if (!email || !otp) return api.error(res, "Email & OTP Require!", 400);

  const user = await userModel.findByEmail(email);
  console.log(user);

  if (!user) return api.error(res, "Email tidak ditemukan", 404);

  if (user.otpCode !== otp) return api.error(res, "Data OTP tidak valid ", 401);

  if (moment(user.otpExpiredAt).isBefore(moment()))
    return api.error(res, "Kode OTP Kadaluarsa", 403);

  return api.success(res, "OTP Valid!");
});

// ROLE
const getAllRole = api.catchAsync(async (req, res) => {
  let result = await userModel.getAllRole();
  return api.success(res, result);
});

module.exports = {
  registrasi,
  getAllUsers,
  getAllUsers,
  updateUser,
  deleteUser,
  requestOtp,
  resetPassword,
  validateOtp,
  getAllByFilter,
  getAllRole,
};
