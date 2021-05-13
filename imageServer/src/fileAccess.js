const fs = require("fs");
const path = require("path");

const fileList = (folderName, callback) => {
  fs.readdir(path.resolve(__dirname, `../public/${folderName}`), (err, files) => callback(files));
};

const delFile = (name, callback) => {
  fs.unlink(path.resolve(__dirname, `../public/${name}`), (err) => callback());
};

module.exports = { fileList, delFile };
