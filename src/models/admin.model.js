/** @format */

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    require: [true, 'Fill in the required field'],
  },
  phoneNumber: {
    type: String,
    require: [true, 'Fill in the required field'],
  },

  gender: {
    type: String,
    require: [true, 'Fill in the required field'],
  },

  password: {
    type: String,
    require: [true, 'Fill in the required field'],
  },
  email: {
    type: String,
    require: [true, 'Fill in the required field'],
  },
  role: {
    type: String,
    enum: ['Admin'],
    default: 'Admin',
  },
});

const adminModel = mongoose.model('Admin', adminSchema);
module.exports = adminModel;
