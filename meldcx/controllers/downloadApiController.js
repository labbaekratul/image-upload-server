require("dotenv").config();
const express = require("express");
const { s3 } = require("../config/fileUploadConfig");
const downloadRouter = express.Router();

// GET API ENDPOINT
// api = http://localhost:5000/files/:publicKey
// ## Note : AWS s3 only allow private key to get or download files, there are no such public key in s3 bucket so i had to use private key instade of public key

downloadRouter.get("/:publicKey", (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.params.publicKey,
  };
  s3.getObject(params, (err, data) => {
    if (err) {
      return res.json({
        success: false,
        error: err,
      });
    } else {
      s3.getObject(params).createReadStream().pipe(res);
    }
  });
});

module.exports = downloadRouter;
