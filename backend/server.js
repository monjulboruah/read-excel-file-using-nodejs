require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const multer = require("multer");
const reader = require("xlsx");
var async = require("async");
const connectDb = require("./config/db");
const mongoose = require("mongoose");
const Candidate = require("./model/candidateSchema");
const candidateController = require("./controller/candidateController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());

app.get("/", (req, res) => {
  res.send("working");
});

app.post("/create", upload.single("file"), candidateController.createCandidate);

connectDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Listenting on port ${PORT}...`));
  })
  .catch((err) => {
    console.log(err);
  });
