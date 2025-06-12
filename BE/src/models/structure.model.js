const db = require("../database/db.config");

const getAll = async () =>
  db
    .select(
      "s.structureId",
      "s.classificationId",
      "s.structureName",
      "s.structureDescription",
      "s.fieldSize",
      "s.typeId",
      "c.classificatioName",
      "t.typeName",
      "t.length"
    )
    .from("tbl_structure as s")
    .join("tbl_classification as c", "s.classificationId", "c.classificationId")
    .join("tbl_type as t", "t.typeId", "s.typeId");

const getById = async (structuredId) =>
  db
    .select(
      "s.structureId",
      "s.classificationId",
      "s.structureName",
      "s.structureDescription",
      "s.fieldSize",
      "s.typeId",
      "c.classificationName",
      "t.typeName",
      "t.length"
    )
    .from("tbl_structure as s")
    .join("tbl_classification as c", "s.classificationId", "c.classificationId")
    .join("tbl_typedata as t", "t.typeId", "s.typeId")
    .where("s.structureId", structuredId)
    .first();

const getByClassificationId = async (classificationId) =>
  db
    .select(
      "s.structureId",
      "s.classificationId",
      "s.structureName",
      "s.structureDescription",
      "s.fieldSize",
      "s.typeId",
      "c.classificationName",
      "t.typeName",
      "t.length"
    )
    .from("tbl_structure as s")
    .join("tbl_classification as c", "s.classificationId", "c.classificationId")
    .join("tbl_typedata as t", "t.typeId", "s.typeId")
    .where("s.classificationId", classificationId);

const getStructureByFilter = async (classificationId, search) => {
  const query = db
    .select(
      "s.structureId",
      "s.classificationId",
      "s.structureName",
      "s.structureDescription",
      "s.fieldSize",
      "s.typeId",
      "c.classificationName",
      "t.typeName",
      "t.length"
    )
    .from("tbl_structure as s")
    .join("tbl_classification as c", "s.classificationId", "c.classificationId")
    .join("tbl_typedata as t", "t.typeId", "s.typeId")
    .where("s.classificationId", classificationId);

  if (search) {
    query.where(function () {
      this.where("s.structureName", "like", `${search}%`).orWhere(
        "s.structureDescription",
        "like",
        `${search}%`
      );
    });
  }

  return query;
};

const insert = async (data) => db("tbl_structure").insert(data);
const update = async (structureId, data) =>
  db("tbl_structure").update(data).where({ structureId });
const remove = async (structureId) =>
  db("tbl_structure").del().where({ structureId });

// DETAIL
const getAllDetail = async (tableName) =>
  db
    .select(
      `dt.*`,
      `dk.classificationId`,
      `dk.key`,
      `dk.iv`,
      `dk.authTag`,
      `dk.cabinetId`,
      `dk.encryption_title`,
      `v.versionId`,
      `v.versionNumber`,
      `v.versionPath`,
      `v.versionSize`,
      `v.pageCount`,
      `v.isLatest`
    )
    .from(`${tableName} as dt`)
    .leftJoin("tbl_documents as dk", `dt.documentId`, "dk.documentId")
    .leftJoin("tbl_versions as v", "dk.documentId", "v.documentId");

const getDetailById = async (tableName, detailId) =>
  db
    .select(
      `dt.*`,
      `dk.classificationId`,
      `dk.key`,
      `dk.iv`,
      `dk.authTag`,
      `dk.cabinetId`,
      `dk.encryption_title`,
      `v.versionId`,
      `v.versionNumber`,
      `v.versionPath`,
      `v.versionSize`,
      `v.pageCount`,
      `v.isLatest`,
      `ct.cabinetName`,
      `cl.classificationName`
    )
    .from(`${tableName} as dt`)
    .leftJoin("tbl_documents as dk", `dt.documentId`, "dk.documentId")
    .leftJoin("tbl_versions as v", "dk.documentId", "v.documentId")
    .leftJoin("tbl_cabinets as ct", "dk.cabinetId", "ct.cabinetId")
    .leftJoin(
      "tbl_classification as cl",
      "dk.classificationId",
      "cl.classificationId"
    )
    .where("dt.detailId", detailId)
    .first();

const detailIsExist = async (tableName) => db.schema.hasTable(tableName);

const createDetail = async (tableName, data) =>
  db.schema.createTable(tableName, (table) => {
    table.increments("detailId").primary();
    table.integer("documentId");
    if (data) {
      switch (parseInt(data.typeId)) {
        case 1: // Integer
          table.integer(data.structureDescription);
          break;
        case 2: // String
          table.string(data.structureDescription, 255);
          break;
        case 3: // Boolean
          table.boolean(data.structureDescription);
          break;
        case 4: // DateTime
          table.dateTime(data.structureDescription);
          break;
        default:
          break;
      }
    }

    table.timestamps(true, true);
  });

const createColoumn = async (tableName, data = {}) =>
  await db.schema.alterTable(tableName, (table) => {
    switch (parseInt(data.typeId)) {
      case 1:
        table.integer(data.structureDescription);
        break;
      case 2:
        table.string(data.structureDescription, 255);
        break;
      case 3:
        table.dateTime(data.structureDescription);

        break;
      case 4:
        table.boolean(data.structureDescription);
        break;
      default:
        throw new Error(`Tipe data tidak dikenali: ${typeId}`);
    }
  });

const updateColumn = async (tableName, oldData, newData) => {
  if (newData.structureDescription !== oldData.structureDescription) {
    await db.schema.alterTable(tableName, (table) => {
      table.renameColumn(
        oldData.structureDescription,
        newData.structureDescription
      );
    });
  }

  if (parseInt(newData.typeId) !== parseInt(oldData.typeId)) {
    await db.schema.alterTable(tableName, (table) => {
      switch (parseInt(newData.typeId)) {
        case 1: // Integer
          table.integer(newData.structureDescription).alter();
          break;
        case 2: // String
          table.string(newData.structureDescription, 255).alter();
          break;
        case 3: // Boolean
          table.boolean(newData.structureDescription).alter();
          break;
        case 4: // DateTime
          table.dateTime(newData.structureDescription).alter();
          break;
        default:
          throw new Error(`Tipe data tidak dikenali: ${newData.typeId}`);
      }
    });
  }
};

const deleteFieldDetail = async (tableName, coloumnName) =>
  db.schema.table(tableName, (table) => {
    table.dropColumn(coloumnName);
  });

const getColumns = async (tableName) => {
  const result = await db.raw(`SHOW COLUMNS FROM ??`, [tableName]);
  return result[0].map((row) => row.Field);
};

const insertDetail = async (tableName, data) => {
  const columns = await getColumns(tableName);

  // Filter data keys yang ada di columns tabel
  const filteredData = {};
  Object.entries(data).forEach(([key, value]) => {
    if (columns.includes(key)) {
      filteredData[key] = value;
    }
  });

  return db(tableName).insert(filteredData);
};

const deletedRowDetail = async (tableName, detailId) =>
  db(tableName).where({ detailId }).del();

// type data
const getAllType = async () => db.select("*").from("tbl_typedata");

module.exports = {
  getAll,
  insert,
  update,
  getByClassificationId,
  getAllType,
  detailIsExist,
  createColoumn,
  createDetail,
  remove,
  deleteFieldDetail,
  getById,
  updateColumn,
  insertDetail,
  getAllDetail,
  deletedRowDetail,
  getDetailById,
  getStructureByFilter,
};
