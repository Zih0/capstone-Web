const Tesseract = require('tesseract.js');
const { PythonShell } = require('python-shell');
const axios = require('axios');
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
});

let storageImage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
});

let storageProf = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/professor/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
});

const uploadVideo = multer({ storage: storageVideo }).single('file');
const uploadImage = multer({ storage: storageImage }).single('file');
const uploadProf = multer({ storage: storageProf }).single('file');

router.post('/uploadfile', (req, res) => {
	uploadVideo(req, res, (err) => {
		console.log(res.req.file.path);
		User.findOneAndUpdate(
			{ studentId: req.body.studentid },
			{ $set: { video: res.req.file.path } },
			{
				new: true,
			},
			(err, userInfo) => {
				if (err) return res.json({ success: false, err });
				return res.status(200).send({ success: true, userInfo });
			}
		);
		//   if (err) {
		//         return res.json({ success: false, err });
		//   }
		//   console.log(req);
		//   return res.json({ success: true, file: res.req.file});
		// }
	});
});

router.post('/professor/image', (req, res) => {
	uploadProf(req, res, (err) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).send({ success: true, filePath: res.req.file.path });
	});
});

const appkey = 'ec358a4773c993c7dba039d6d3555c2b';

router.post('/studentcard', (req, res) => {
	let studentid = '';
	uploadImage(req, res, (err) => {
		let options = {
			mode: 'text',
			pythonPath: '/usr/bin/python3',
			pythonOptions: ['-u'],
			args: [res.req.file.path, appkey],
		};
		PythonShell.run(
			'/Users/ziho/testapp2/capstoneWeb/server/routes/kakao-ocr.py',
			options,
			(err, result) => {
				if (err) console.log(err);
				studentid = result[0];
				console.log(studentid);
				if (studentid.length == '') return res.json({ success: false });
				return res
					.status(200)
					.send({ success: true, filePath: res.req.file.path, studentid: studentid });
			}
		);

		// Tesseract.recognize(
		//   res.req.file.path,
		//   'eng',
		//   { logger: m => console.log(m) }
		// ).then(({ data: { text } }) => {
		//   dataList = text.trim().split('\n')
		//   dataList.forEach(function(text) {
		//     if (text.match(/20\d{6}/))
		//     {
		//       studentid = text.match(/20\d{6}/)[0]
		//     }
		// });
	});
});

router.post('/update/idincourse', (req, res) => {
	User.findOneAndUpdate({ studentId: req.body.userId }, { $set: { course: [] } });
	Course.updateMany({ $pull: { students: req.body.userId } });

	for (let course of req.body.courses) {
		Course.findOneAndUpdate(
			{ _id: course._id },
			{ $addToSet: { students: req.body.userId } },
			{
				new: true,
			},
			(err) => {
				if (err) return res.json({ success: false, err });
			}
		);
		User.findOneAndUpdate(
			{ studentId: req.body.userId },
			{
				$addToSet: {
					course: {
						key: course.key,
						coursename: course.course,
						check: {
							1: '',
							2: '',
							3: '',
							4: '',
							5: '',
							6: '',
							6: '',
							7: '',
							8: '',
							9: '',
							10: '',
							11: '',
							12: '',
							13: '',
							14: '',
							15: '',
						},
					},
				},
			},
			{
				new: true,
			},
			(err) => {
				if (err) return res.json({ success: false, err });
			}
		);
	}
	//     if(err) return res.json({ success: false, err });
	// return res.status(200).send({success:true});
	return res.status(200).send({ success: true });
});

router.post('/check', (req, res) => {
	User.find({ studentId: req.body.userId }, { course: 1 }).exec((err, checkList) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true, checkList });
	});
});

router.get('/course', (req, res) => {
	Course.find().exec((err, courseInfo) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true, courseInfo });
	});
});

module.exports = router;
