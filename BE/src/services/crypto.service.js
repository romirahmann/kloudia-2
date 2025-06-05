const crypto = require("crypto");
const fs = require("fs");

const algorithm = "aes-256-cbc";

const encryptFile = (inputPath, outputPath) => {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  return new Promise((resolve, reject) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(cipher).pipe(output);

    output.on("finish", () => {
      resolve({
        key: key.toString("hex"),
        iv: iv.toString("hex"),
      });
    });

    output.on("error", reject);
  });
};

const decryptFile = (inputPath, outputPath, keyHex, ivHex) => {
  const key = Buffer.from(keyHex, "hex");
  const iv = Buffer.from(ivHex, "hex");

  return new Promise((resolve, reject) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(decipher).pipe(output);

    output.on("finish", () => resolve());
    output.on("error", reject);
  });
};

module.exports = { encryptFile, decryptFile };
