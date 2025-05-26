const db = require("../database/db.config");

const getAll = async () =>
  await db
    .select(
      "u.userId",
      "u.username",
      "u.email",
      "u.password",
      "u.fullname",
      "u.roleId",
      "u.tenantId",
      "u.grupId",
      "r.roleName",
      "t.tenantName",
      "g.grupName"
    )
    .from("tbl_users as u")
    .join("tbl_roles as r", "r.roleId", "u.roleId")
    .innerJoin("tbl_tenants as t", "t.tenantId", "u.tenantId")
    .innerJoin("tbl_grup_user as g", "g.grupId", "u.grupId");

const getByUsername = async (username) =>
  await db
    .select(
      "u.userId",
      "u.username",
      "u.email",
      "u.password",
      "u.fullname",
      "u.roleId",
      "u.tenantId",
      "u.grupId",
      "r.roleName",
      "t.tenantName",
      "g.grupName"
    )
    .from("tbl_users as u")
    .join("tbl_roles as r", "r.roleId", "u.roleId")
    .innerJoin("tbl_tenants as t", "t.tenantId", "u.tenantId")
    .innerJoin("tbl_grup_user as g", "g.grupId", "u.grupId")
    .where("u.username", username)
    .andWhere("u.isActive", 1)
    .first();

const insert = async (data) => await db("tbl_users").insert(data);

const update = async (id, data) =>
  await db("tbl_users").where("userId", id).update(data);

const deleteById = async (id) =>
  await db("tbl_users").where("userId", id).delete();

const findByEmail = async (email) =>
  db
    .select(
      "u.userId",
      "u.username",
      "u.email",
      "u.password",
      "u.fullname",
      "u.roleId",
      "u.tenantId",
      "u.grupId",
      "u.otpCode",
      "u.otpExpiredAt",
      "r.roleName",
      "t.tenantName",
      "g.grupName"
    )
    .from("tbl_users as u")
    .join("tbl_roles as r", "r.roleId", "u.roleId")
    .innerJoin("tbl_tenants as t", "t.tenantId", "u.tenantId")
    .innerJoin("tbl_grup_user as g", "g.grupId", "u.grupId")
    .where({ email })
    .first();

const updateByEmail = async (email, data) =>
  await db("tbl_users").update(data).where({ email });

const getByFilter = async (data = {}) => {
  const query = db("tbl_users")
    .select(
      "u.userId",
      "u.username",
      "u.email",
      "u.password",
      "u.fullname",
      "u.roleId",
      "u.tenantId",
      "u.grupId",
      "r.roleName",
      "t.tenantName",
      "g.grupName"
    )
    .from("tbl_users as u")
    .join("tbl_roles as r", "r.roleId", "u.roleId")
    .innerJoin("tbl_tenants as t", "t.tenantId", "u.tenantId")
    .innerJoin("tbl_grup_user as g", "g.grupId", "u.grupId");

  if (data.search) {
    query.where(function () {
      this.where("u.username", "like", `%${data.search}%`)
        .orWhere("u.email", "like", `%${data.search}%`)
        .orWhere("u.fullname", "like", `%${data.search}%`);
    });
  }

  if (data.grupId && data.roleId) {
    query.andWhere("u.grupId", data.grupId).andWhere("u.roleId", data.roleId);
  } else if (data.grupId) {
    query.andWhere("u.grupId", data.grupId);
  } else if (data.roleId) {
    query.andWhere("u.roleId", data.roleId);
  }

  if (data.tenantId) {
    query.andWhere("u.tenantId", data.tenantId);
  }

  return await query;
};

const getAllRole = async () => await db.select("*").from("tbl_roles");

module.exports = {
  getAll,
  getByUsername,
  insert,
  update,
  deleteById,
  findByEmail,
  updateByEmail,
  getByFilter,
  getAllRole,
};
