const { model, Schema } = require("mongoose");

const candidateSchema = new Schema(
  {
    nameOfCandidate: String,
    email: {
        type: String,
        unique: true
    },
    mobNo: String,
    dob: String,
    workExp: String,
    resumeTitle: String,
    currLoc: String,
    postalAdd: String,
    pointOfOccurance: String,
    currEmployer: String,
    currDesgn: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Candidate", candidateSchema);