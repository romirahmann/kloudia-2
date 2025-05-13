const userModel = require("../../models/user.modal");
const { hashPasword, verifyPassword } = require("../../services/auth.service");
const { emit } = require("../../services/socket.service");
const api = require("../../tools/common");
const moment = require("moment");
const { sendOtp } = require("../../services/email.service");

const registrasi = api.catchAsync(async (req, res) => {
  const data = req.body;

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

// OTP
const requestOtp = api.catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findByEmail(email);
  if (!user) return api.error(res, "Email tidak ditemukan", 404);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expired = moment().add(2, "minutes").toDate();

  await userModel.update(user.userId, { otpCode: otp, otpExpiredAt: expired });
  await sendOtp(user.email, otp);

  return api.success(res, "OTP berhasil dikirim ke Email!");
});

const validateOtp = api.catchAsync(async (req, res) => {
  const data = req.body;

  if (!data.email || !data.otp)
    return api.error(res, "Email & OTP Require!", 401);

  const user = await userModel.findByEmail(email);
  if (!user) return api.error(res, "Email tidak ditemukan", 404);

  if (user.otpCode !== data.otp)
    return api.error(res, "Data OTP tidak valid ", 401);

  if (moment(user.otpExpiredAt).isAfter(moment()))
    return api.error(res, "Kode OTP Kadaluarsa", 401);

  return api.success(res, "OTP Valid!");
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
};
