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

module.exports = {
  getAll,
  getByUsername,
  insert,
  update,
  deleteById,
  findByEmail,
  updateByEmail,
};
