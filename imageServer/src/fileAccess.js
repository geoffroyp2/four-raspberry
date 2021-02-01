const fs = require("fs");
const path = require("path");

const fileList = (callback) => {
  fs.readdir(path.resolve(__dirname, "../public/images"), (err, files) => callback(files));
};

const delFile = (id, callback) => {
  fs.unlink(path.resolve(__dirname, `../public/images/${id}`), (err) => callback());
};

module.exports = { fileList, delFile };
