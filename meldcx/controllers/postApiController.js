const express = require("express");
const { upload } = require("../config/fileUploadConfig");
const limiter = require("../config/userReqLimit");
const postRouter = express.Router();

// POST API ENDPOINT
// api = http://localhost:5000/files
//NOTE = limiter HERE IS MIDDLEWARE WHICH IS LIMITE THE USER REQUEST

postRouter.post("/", limiter, upload.array("uploads"), async (req, res) => {
  const data = await req.files;
  // const userIp = req.header("X-Forwarded-For"); // user ip address

  if (data) {
    const newData = data.map((x) => ({
      publicUrl: x.location, // AWS S3 has no public key, but the has public url so i send it
      privateKey: x.key,
    }));
    res
      .header(
        "Access-Control-Expose-Headers",
        "X-RateLimit-Remaining, RateLimit-Reset"
      )
      .send(newData);
  } else {
    res.json({ message: "File did not Uploaded" });
  }
});

module.exports = postRouter;
