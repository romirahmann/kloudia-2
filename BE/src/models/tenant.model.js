const db = require("../database/db.config");

const getAll = async () => await db.select("*").from("tbl_tenants");
const getByTenantId = async (tenantId) =>
  await db("tbl_tenants").where({ tenantId }).first();
const create = async (data) => await db("tbl_tenants").insert(data);
const update = async (tenantId, data) =>
  await db("tbl_tenants").where({ tenantId }).update(data);
const remove = async (tenantId) =>
  await db("tbl_tenants").where({ tenantId }).del();

const bySearch = async (filter) => {
  const query = db.select("*").from("tbl_tenants");
  if (filter) {
    query.where(function () {
      this.where("tenantName", "like", `%${filter.search}%`).orWhere(
        "tenantDescription",
        "like",
        `%${filter.search}%`
      );
    });
  }

  if (filter.status) {
    query.where("isActive", filter.status);
  }

  return await query;
};

module.exports = { getAll, getByTenantId, create, update, remove, bySearch };
