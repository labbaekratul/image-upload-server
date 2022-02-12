require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

//LOCAL DISK UPLOAD
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, require("path").join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//AWS SECRET KEY CONFIG
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEYID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// S3 BUCKET UPLOADS
const s3 = new aws.S3();
const storageS3 = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, `${file.originalname + Date.now()}`);
  },
});

const upload = multer({
  storage: storageS3 || localStorage, // MULTER DID NOT ALLOW TO UPLOAD BOTH STORAGE TOGATHER
});

module.exports = { upload, s3 };
