
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: url,
     required:false
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate:{
    type: Date,
    default: Date.now 
  }
});

module.exports = mongoose.model('event', EventSchema);
