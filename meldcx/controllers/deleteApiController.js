require("dotenv").config();
const express = require("express");
const { s3 } = require("../config/fileUploadConfig");
const deleteRouter = express.Router();

// DELETE API ENDPOINT
//api = http://localhost:5000/files/:privateKey

deleteRouter.delete("/:privateKey", (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.params.privateKey,
  };
  if (params) {
    s3.deleteObject(params, (err, data) => {
      res.send({ data, massage: "file deleted" });
    });
  } else {
    res.json({ message: "File did not found" });
  }
});

module.exports = deleteRouter;
