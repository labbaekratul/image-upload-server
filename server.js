const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const postRouter = require("./meldcx/controllers/postApiController");
const deleteRouter = require("./meldcx/controllers/deleteApiController");
const downloadRouter = require("./meldcx/controllers/downloadApiController");

const app = express();

// BASIC MIDDLEWARE FOR DATA TRANSFER
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API ENDPOINTS
app.use("/files", postRouter); // files upload api
app.use("/files", deleteRouter); // delete files api
app.use("/files", downloadRouter); // download files api

// SERVER RUNNING ROOT PATH
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Hello from the Server");
  });
}

// PORT
const PORT = process.env.PORT;

// starting server from the port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
