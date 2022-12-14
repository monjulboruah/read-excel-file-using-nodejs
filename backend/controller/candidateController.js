const Candidate = require("../model/candidateSchema");
const reader = require("xlsx");


const saveToDb = async function (req, res, candidateData) {
  const data = {};

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
  callback();
  return "seccess";

  // console.log(candidateData);
};

const userController = {
  createCandidate: async (req, res) => {
    //console.log(req.body);
    try {
      const file = reader.readFile(`./uploads/${req.file.filename}`);
      let data = [];
      const sheets = file.SheetNames;

      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
      //console.log(temp);
      temp.forEach((res) => {
        data.push(res);
      });


      for(let i=0; i<data.length; i++){
        const email = Candidate.findOne({
          email: ele["Email"],
        });

        if (email) {
          return res.send("email already exist");
        } else {
          let res = await saveToDb(req, res, ele);
        }
      }
      // data.forEach(async (ele) => {
      //   const email = Candidate.findOne({
      //     email: ele["Email"],
      //   });

      //   if (email) {
      //     return res.send("email already exist");

      //   } else {
      //     let res = await saveToDb(req, res, ele);
      //   }
      // });

      res.json({msg: "Upload Successful!"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userController;
