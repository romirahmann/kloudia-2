const api = require("../../tools/common");
const userModel = require("../../models/user.modal");
const {
  generateToken,
  verifyPassword,
} = require("../../services/auth.service");

const login = api.catchAsync(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return api.error(res, "username & password require!", 401);
  }

  const user = await userModel.getByUsername(username);

  if (!user) {
    return api.error(res, "User Not Found!", 401);
  }

  const passwordIsMacth = await verifyPassword(password, user.password);

  if (!passwordIsMacth) return await api.error(res, "Incorrect Password", 401);

  const userData = {
    userId: user.userId,
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    roleId: user.roleId,
    tenantId: user.tenantId,
    grupId: user.grupId,
    roleName: user.roleName,
    tentantName: user.tenantName,
    grupName: user.grupName,
  };

  const token = generateToken(userData);

  return api.success(res, { token, user: userData });
});

module.exports = { login };
