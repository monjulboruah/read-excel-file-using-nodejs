const express = require('express')
const app = express()
const port = 5002
const cors = require('cors')
const multer = require('multer')
const reader = require('xlsx')
var async = require('async');
const mongoose = require("mongoose")
const Candidate = require("./model/candidateSchema")


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors())

app.post('/image', upload.single('file'), function (req, res) {
  const file = reader.readFile('./uploads/file.xlsx')
  let data = [];
  const sheets = file.SheetNames

  for(let i = 0; i < sheets.length; i++){
    const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[i]])
    // temp.forEach((res) => {
    //     data.push(res)
    // })

    async.eachSeries(temp,function(item, cb){
      setTimeout(function() {
        console.log('#1: ', item);
        return cb();
      }, Math.random()*2000);
    }, function(err){
      console.log('#1 Final call ', err);
    });
  }

  console.log(data)
  res.json({})
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})