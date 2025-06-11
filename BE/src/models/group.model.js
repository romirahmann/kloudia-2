const db = require("../database/db.config");

const getAll = async () => await db.select("*").from("tbl_grup_user");
const getBygrupId = async (grupId) =>
  await db("tbl_grup_user").where({ grupId }).first();
const create = async (data) => await db("tbl_grup_user").insert(data);
const update = async (grupId, data) =>
  await db("tbl_grup_user").where({ grupId }).update(data);
const remove = async (grupId) =>
  await db("tbl_grup_user").where({ grupId }).del();
const getByFitler = async (data = {}) => {
  const query = db("tbl_grup_user").select("*");
  if (data.search) {
    query.where(function () {
      this.where("u.username", "like", `%${data.search}%`)
        .orWhere("u.email", "like", `%${data.search}%`)
        .orWhere("u.fullname", "like", `%${data.search}%`);
    });
  }

  return await query;
};

module.exports = { getAll, getBygrupId, create, update, remove };
