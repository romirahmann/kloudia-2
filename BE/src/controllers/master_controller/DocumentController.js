const { encryptFile, decryptFile } = require("../../services/crypto.service");
const api = require("../../tools/common");
const path = require("path");
const fs = require("fs");
const os = require("os");

const uploadDocument = api.catchAsync(async (req, res) => {
  const file = req.file;
  console.log(file);
  if (!file) return api.error(res, "No file uploaded", 401);

  const inputPath = file.path;
  const encryptedPath = file.path + ".enc";

  // Enkripsi file
  const { key, iv } = await encryptFile(inputPath, encryptedPath);

  // Hapus file asli
  fs.unlinkSync(inputPath);

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
