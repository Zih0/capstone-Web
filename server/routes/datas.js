const express = require('express');
const router = express.Router();
// const { Data } = require('../models/Data');

const { auth } = require('../middleware/auth');
const multer = require('multer');
//=================================
//             Data
//=================================

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.studentid}.webm`);
  },
});

const upload = multer({ storage: storage }).single('file');

router.post('/uploadfile', (req, res) => {
  upload(req, res, (err) => {
    console.log(req.body.studentid);
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
  });
});

module.exports = router;
