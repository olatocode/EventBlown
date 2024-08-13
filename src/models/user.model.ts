/** @format */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, 'Fill in the required field'],
  },
  lastName: {
    type: String,
    require: [true, 'Fill in the required field'],
  },
  phoneNumber: {
    type: Number,
    unique: true,
    require: [true, 'Fill in the required field'],
  },

  gender: {
    type: String,
    enum: ['Male', 'Female'],
    require: [true, 'Fill in the required field'],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    require: [true, 'Fill in the required field'],
  },

  password: {
    type: String,
    require: [true, 'Fill in the required field'],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
});

// hash password
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
