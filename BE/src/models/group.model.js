const db = require("../database/db.config");

const getAll = async () => await db.select("*").from("tbl_grup_user");
const getBygrupId = async (grupId) =>
  await db("tbl_grup_user").where({ grupId }).first();
const create = async (data) => await db("tbl_grup_user").insert(data);
const update = async (grupId, data) =>
  await db("tbl_grup_user").where({ grupId }).update(data);
const remove = async (grupId) =>
  await db("tbl_grup_user").where({ grupId }).del();

module.exports = { getAll, getBygrupId, create, update, remove };
