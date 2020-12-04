const { PythonShell } = require('python-shell');
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Course } = require('../models/Course');
const { Check } = require('../models/Check');
const { auth } = require('../middleware/auth');

const multer = require('multer');
//=================================
//             Data
//=================================

let storageVideo = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/embedding/');
	},
	filename: (req, file, cb) => {
		cb(null, `${req.body.studentid}.webm`);
	},
});

let storageImage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/card/');
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

let storageAtt = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/verify/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const uploadVideo = multer({ storage: storageVideo }).single('file');
const uploadImage = multer({ storage: storageImage }).single('file');
const uploadProf = multer({ storage: storageProf }).single('file');
const uploadAtt = multer({ storage: storageAtt }).single('file');

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
	});
});

router.post('/verify/test', (req, res) => {
	let options = {
		mode: 'text',
		pythonPath: '/usr/bin/python3',
		pythonOptions: ['-u'],
		args: [
			'/home/ubuntu/capstone-Web' + '/uplodas/verify/0.avi',
			req.body.key,
			req.body.week,
			req.body.gesture,
			'테스트101',
		],
	}; //res.req.file.path
	PythonShell.run('/home/ubuntu/faceRecog/chulCheck.py', options, (err, result) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).send({ success: true, result: result });
	});
});

router.post('/verify', (req, res) => {
	uploadAtt(req, res, (err) => {
		let options = {
			mode: 'text',
			pythonPath: '/usr/bin/python3',
			pythonOptions: ['-u'],
			args: [res.req.file.path, key, week, finger, name],
		};
		PythonShell.run('/home/ubuntu/faceRecog/chulCheck.py', options, (err, result) => {
			if (err) return res.json({ success: false });
			return res.status(200).send({ success: true, result: result });
		});
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
			'/home/ubuntu/capstone-Web/server/python/kakao-ocr.py',
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
	});
});

router.post('/update/idincourse', (req, res) => {
	let keys = [];
	User.find({ studentId: req.body.userId }, { course: 1 }).exec((err, info) => {
		for (let i of info[0].course) {
			keys.push(i.key);
		}
	});

	User.updateMany({ studentId: req.body.userId }, { $set: { course: [] } }).exec();

	Course.updateMany(
		{},
		{ $pull: { students: { $in: [req.body.userId] } } },
		{ multi: true }
	).exec();

	for (let key of keys) {
		if (!(key in req.body.courses)) {
			Course.update(
				{ key: key },
				{ $set: { update: 1 } },
				{
					new: true,
				},
				(err) => {
					if (err) return res.json({ success: false, err });
				}
			);
		}
	}

	for (let course of req.body.courses) {
		if (course in keys) {
			Course.findOneAndUpdate(
				{ _id: course._id },
				{ $addToSet: { students: req.body.userId } }
			).exec();
		} else {
			Course.update(
				{ _id: course._id },
				{ $set: { update: 1 }, $addToSet: { students: req.body.userId } }
			).exec();
		}

		User.findOneAndUpdate(
			{ studentId: req.body.userId },
			{
				$addToSet: {
					course: [course.key],
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

router.post('/professor/courses', (req, res) => {
	Course.find({ prof: req.body.name, major: req.body.major }).exec((err, courseList) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true, courseList });
	});
});

router.post('/check', (req, res) => {
	Check.find({ studentid: req.body.userId }, { _id: 0, studentid: 0 }).exec((err, checkList) => {
		if (err) return res.status(400).json({ success: false, err });

		checkList.sort(function (a, b) {
			return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
		});
		let courseList = [];
		for (let c of checkList) {
			courseList.push(c.name);
		}
		courseList = [...new Set(courseList)];
		let _list = [];
		for (let c of courseList) {
			_list.push({ name: c, check: [] });
		}
		console.log(_list);
		for (let c of _list) {
			for (let s of checkList) {
				if (s.name == c.name) {
					delete s.name;
					delete s.key;
					c.check.push(s);
				}
			}
		}
		setTimeout(() => {
			return res.status(200).json({ success: true, checkList: _list });
		}, 2000);
	});
});

router.post('/check/proffesor', (req, res) => {
	Check.find({ studentid: req.body.userId }, { _id: 0, studentid: 0 }).exec((err, checkList) => {
		if (err) return res.status(400).json({ success: false, err });

		checkList.sort(function (a, b) {
			return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
		});
		let courseList = [];
		for (let c of checkList) {
			courseList.push(c.name);
		}
		courseList = [...new Set(courseList)];
		let _list = [];
		for (let c of courseList) {
			_list.push({ name: c, check: [] });
		}
		console.log(_list);
		for (let c of _list) {
			for (let s of checkList) {
				if (s.name == c.name) {
					delete s.name;
					delete s.key;
					c.check.push(s);
				}
			}
		}
		setTimeout(() => {
			return res.status(200).json({ success: true, checkList: _list });
		}, 2000);
	});
});

router.get('/course', (req, res) => {
	Course.find().exec((err, courseInfo) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true, courseInfo });
	});
});

module.exports = router;
