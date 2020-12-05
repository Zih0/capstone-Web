const mongoose = require('mongoose');

const checkSchema = mongoose.Schema({
	key: {
		type: Number,
	},
	week: {
		type: Number,
	},
	studentId: {
		type: String,
	},
	face: {
		type: String,
	},
	gestuer: {
		type: String,
	},
});

const Check = mongoose.model('Check', checkSchema);

module.exports = { Check };
