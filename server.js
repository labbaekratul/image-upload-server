const express = require("express");
require("dotenv").config();
const postRouter = require("./meldcx/controllers/postApiController");
const deleteRouter = require("./meldcx/controllers/deleteApiController");
const downloadRouter = require("./meldcx/controllers/downloadApiController");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API ENDPOINTS
app.use("/files", postRouter); // files upload api
app.use("/files", deleteRouter); // delete files api
app.use("/files", downloadRouter); // download files api

// SERVER RUNNING ROOT PATH
app.get("/", (req, res) => {
  res.send("Server is running");
});

// PORT
const PORT = process.env.PORT;

// starting server from the port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
