const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Course } = require('../models/Course');
const { auth } = require('../middleware/auth');

const multer = require('multer');
//=================================
//             Data
//=================================

let storageVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.studentid}.webm`);
  },
}
);

let storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.studentid}.jpeg`);
  },
}
);



const uploadVideo = multer({ storage: storageVideo }).single('file');
const uploadImage = multer({ storage: storageImage }).single('file');

router.post('/uploadfile', (req, res) => {
  uploadVideo(req, res, (err) => {
    console.log(res.req.file.path);
    User.findOneAndUpdate(
          { studentId : req.body.studentid },
          { $set : {"video":res.req.file.path}},
          {
            new: true,
          },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({success:true, userInfo});
          });
  //   if (err) {
  //         return res.json({ success: false, err });
  //   }
  //   console.log(req);
  //   return res.json({ success: true, file: res.req.file});
  // }
        });
});

router.post('/image', (req, res) => {
  uploadImage(req, res, (err) => {
    console.log(res.req.file.path);
    User.findOneAndUpdate(
          { studentId : req.body.studentid },
          { $set : {"studentcard":res.req.file.path}},
          {
            new: true,
          },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({success:true, filePath: res.req.file.path});
          });
  //   if (err) {
  //         return res.json({ success: false, err });
  //   }
  //   console.log(req);
  //   return res.json({ success: true, file: res.req.file});
  // }
        });
});


router.post('/update/idincourse', (req, res) => {
    for (let course of req.body.courses) {
      console.log(course)
      Course.findOneAndUpdate(
            {_id : course._id},
            { $addToSet : { students : req.body.userId }
            },
            {
              new: true,
            },
          (err) => {
            if (err) return res.json({ success: false, err });
          });
        } 
    //     if(err) return res.json({ success: false, err });
    // return res.status(200).send({success:true});
    return res.status(200).send({success:true});
    });
  
  

  
router.get('/course', (req, res) => {
    Course.find()
      .exec((err, courseInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, courseInfo});
      });
  })

module.exports = router;
