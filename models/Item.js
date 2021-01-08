const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  labName: {
    type: String,
    minlength: 3,
   
  },
  location: {
    type: String,
    minlength: 3,
    required: true,
    unique: false,
  },
  phone: {
    type: Number,
    minlength: 5,
    required: false,
  },
  testType: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  workingHours: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
