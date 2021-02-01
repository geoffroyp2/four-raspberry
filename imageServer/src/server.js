const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const { fileList, delFile } = require("./fileAccess");

// APP
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

// Multer Storage

const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "../public/images"));
  },

  filename: (req, file, callback) => {
    callback(null, `${Date.now()}${file.originalname.substr(file.originalname.length - 4)}`);
  },
});

const Upload = multer({
  storage: Storage,
}).single("image");

// PATH

app.get("/files", (req, res) => {
  fileList((files) => {
    res.json(files);
  });
});

app.get("/delete", (req, res) => {
  delFile(req.query.del, () => res.end());
});

app.post("/upload", Upload, (req, res) => {
  res.json({ url: `images/${req.file.filename}` });
});

// SERVER

app.listen(3003, () => {
  console.log("server started on port: 3003!");
});
