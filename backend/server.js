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

const saveToDb = async function (candidateData, callback) {
  const data = {};
  //   const email = Candidate.findOne({
  //     email: candidateData["Email"],
  //   });

  //   console.log(email);

  //   if (email.length !== 0) {
  //     throw new Error("email already exist");
  //     return;
  //   }

  if (candidateData["Name of the Candidate"]) {
    data.nameOfCandidate = candidateData["Name of the Candidate"];
  }
  if (candidateData["Email"]) {
    data.email = candidateData["Email"];
  }
  if (candidateData["Mobile No."]) {
    data.mobNo = candidateData["Mobile No."];
  }

  if (candidateData["Date of Birth"]) {
    data.dob = candidateData["Date of Birth"];
  }

  if (candidateData["Work Experience"]) {
    data.workExp = candidateData["Work Experience"];
  }

  if (candidateData["Resume Title"]) {
    data.resumeTitle = candidateData["Resume Title"];
  }

  if (candidateData["Current Location"]) {
    data.currLoc = candidateData["Current Location"];
  }

  if (candidateData["Postal Address"]) {
    data.postalAdd = candidateData["Postal Address"];
  }

  if (candidateData["Current Employer"]) {
    data.currEmployer = candidateData["Current Employer"];
  }
  if (candidateData["Current Designation"]) {
    data.currDesgn = candidateData["Current Designation"];
  }

  console.log(data);

  const newCand = new Candidate(data);

  await newCand.save();

  return "seccuess";

  // console.log(candidateData);
};

// {
//     'Name of the Candidate': 'Sumit Kumar',
//     Email: 'assignment11@klimbdemo.com',
//     'Mobile No.': 9829993431,
//     'Date of Birth': 32435,
//     'Work Experience': '8 Year(s) 0 Month(s)',
//     'Resume Title': 'PYTHON DJANGO AND PHP LARAVEL developer , AWS , CLOUD GOOGLE (very sound knowledge)',
//     'Current Location': 'Delhi',
//     'Postal Address': 'D-239 Laxmi Nagar Street No 10,delhi',
//     'Current Employer': 'Iap',
//     'Current Designation': 'Senior Web Developer'
//   }

app.get("/", (req, res)=> {
  res.send("working")
})

app.post("/image", upload.single("file"), async function (req, res) {
  //console.log(req.file);
  const file = reader.readFile(`./uploads/${req.file.filename}`);
  let data = [];
  const sheets = file.SheetNames;
  //console.log(sheets);

  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
  //console.log(temp);
  temp.forEach((res) => {
    data.push(res);
  });

  data.forEach(async (ele) => {
    let res = await saveToDb(ele);
  });

  //   async.eachSeries(
  //     data,
  //     function (item, cb) {
  //       data.push(item);
  //     },
  //     function (err) {
  //       console.log("#1 Final call ", err);
  //     }
  //   );

  //console.log(data);
  res.json({ msg: "success" });
});


connectDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Listenting on port ${PORT}...`));
  })
  .catch((err) => {
    console.log(err);
  });
