const express = require("express");
const { upload } = require("../config/fileUploadConfig");
const postRouter = express.Router();

// POST API ENDPOINT
// api = http://localhost:5000/files

postRouter.post("/", upload.array("uploads"), async (req, res) => {
  const data = await req.files;

  if (data) {
    const newData = data.map((x) => ({
      publicKey: x.location,
      privateKey: x.key,
    }));
    res.send(newData);
  } else {
    res.json({ message: "File did not Uploaded" });
  }
});

module.exports = postRouter;
