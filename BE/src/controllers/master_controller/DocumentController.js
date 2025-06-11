const { encryptFile, decryptFile } = require("../../services/crypto.service");
const api = require("../../tools/common");
const path = require("path");
const fs = require("fs");
const os = require("os");
const modelStructure = require("../../models/structure.model");
const modelDocument = require("../../models/document.model");

const uploadDocument = api.catchAsync(async (req, res) => {
  const file = req.file;
  const data = req.body;
  const tableName = `tbl_detail${data.classificationId}`;

  if (!file) return api.error(res, "No file uploaded", 401);

  const inputPath = file.path;
  const encryptedPath = file.path + ".enc";

  // Enkripsi file
  const { key, iv, authTag } = await encryptFile(inputPath, encryptedPath);

  // Hapus file asli
  fs.unlinkSync(inputPath);

  let isDocumentExist = await modelDocument.isDocumentExist(file.originalname);
  if (isDocumentExist) {
    console.log("Document Already Exist!");
  }

  // insert row tbl document
  let dataDocument = {
    classificationId: data.classificationId,
    documentTitle: file.originalname,
    cabinetId: data.cabinetId,
    key: key,
    iv: iv,
    authTag: authTag,
    encryption_title: path.basename(encryptedPath),
  };

  let insertDocument = await modelDocument.insertDocument(dataDocument);

  if (!insertDocument)
    return api.error(res, "Failed To Upload Data Document", 401);

  // insert row version
  let versionDocument = {
    documentId: insertDocument[0],
    versionNumber: 1,
    versionPath: file.path,
    versionSize: file.size,
  };
  let insertVersion = await modelDocument.insertVersion(versionDocument);
  if (!insertVersion) return api.error(res, "Failed To Upload Version", 401);

  // insert row detail
  data.documentId = insertDocument[0];

  await modelStructure.insertDetail(tableName, data);

  return api.success(res, {
    message: "Upload & encryption success",
    originalName: file.originalname,
    encryptedFile: path.basename(encryptedPath),
    key,
    iv,
    authTag,
  });
});

const getFile = api.catchAsync(async (req, res) => {
  const { fileName, key, iv, authTag } = req.query;

  if (!fileName || !key || !iv || !authTag) {
    return api.error(
      res,
      "Missing fileName, key, iv, or authTag in query params",
      400
    );
  }

  const encryptedPath = path.join("src", "documents", fileName);
  const decryptedPath = path.join(
    os.tmpdir(),
    `decrypted-${Date.now()}-${fileName.replace(".enc", "")}`
  );

  if (!fs.existsSync(encryptedPath)) {
    return api.error(res, "File not found", 404);
  }

  await decryptFile(encryptedPath, decryptedPath, key, iv, authTag);

  res.download(decryptedPath, (err) => {
    fs.unlinkSync(decryptedPath);
    if (err) {
      console.error("Download error:", err);
    }
  });
});

module.exports = {
  uploadDocument,
  getFile,
};
