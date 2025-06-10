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
  const { key, iv } = await encryptFile(inputPath, encryptedPath);

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
    encryption_title: path.basename(encryptedPath),
  };

  let insertDocument = await modelDocument.insertDocument(dataDocument);

  // // insert row version
  let versionDocument = {
    documentId: insertDocument[0],
    versionNumber: 1,
    versionPath: file.path,
    versionSize: file.size,
  };
  await modelDocument.insertVersion(versionDocument);
  // insert row detail
  data.documentId = insertDocument[0];
  await modelStructure.insertDetail(tableName, data);
  // console.log("file: ", file);
  // console.log("data: ", data);
  // console.log("tableName: ", tableName);
  // console.log({
  //   originalName: file.originalname,
  //   encryptedFile: path.basename(encryptedPath),
  //   key,
  //   iv,
  // });
  return api.success(res, {
    message: "Upload & encryption success",
    originalName: file.originalname,
    encryptedFile: path.basename(encryptedPath),
    key,
    iv,
  });
});

const getFile = api.catchAsync(async (req, res) => {
  const { fileName, key, iv } = req.query;

  console.log(fileName, key, iv);

  if (!fileName || !key || !iv) {
    return api.error(res, "Missing fileName, key, or iv in query params", 400);
  }

  const encryptedPath = path.join("src", "documents", fileName);
  const decryptedPath = path.join(
    os.tmpdir(),
    `decrypted-${Date.now()}-${fileName.replace(".enc", "")}`
  );

  // Cek apakah file ada
  if (!fs.existsSync(encryptedPath)) {
    return api.error(res, "File not found", 404);
  }

  // Dekripsi
  await decryptFile(encryptedPath, decryptedPath, key, iv);

  // Kirim file hasil dekripsi
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
