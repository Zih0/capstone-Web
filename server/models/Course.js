const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  campus: {
    type: String,
  },
  major: {
    type: String,
  },
  year: {
    type: Number,
    
  },
  class: {
    type: Number,
    
  },
  course : {
    type: String,
  },
  prof: {
    type: String,
  },
  students: {
    type: Array,
  },
});



const Course = mongoose.model("Course", courseSchema);

module.exports = { Course };
