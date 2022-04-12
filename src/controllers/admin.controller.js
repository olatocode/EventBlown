/** @format */
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const validateUser = require('../middleware/validate.middleware');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const { SECRET_TOKEN } = process.env;

exports.addAdmin = async (req, res, next) => {
  try {
    const { userName, phoneNumber, gender, email, password } = req.body;
    await validateUser.validateAsync(req.body);

    let emailExist = await Admin.findOne({ email: email });
    if (emailExist) {
      return res.status(401).json({
        message:
          'Email already exist, Please login or create a new account with a new email',
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin_Created = await Admin.create({
      userName,
      phoneNumber,
      gender,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      newAdmin_Created,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await Admin.findOne({ email });
    if (!emailExist) {
      return res.status(401).json({
        message: 'Email does not exist, please create an account',
      });
    }
    let isPasswordExist = await bcrypt.compare(password, emailExist.password);
    if (!isPasswordExist) {
      return res.status(401).json({
        message: 'Password Not Correct',
      });
    }
    const data = {
      id: emailExist._id,
      email: emailExist.email,
      role: emailExist.role,
    };

    const token = await jwt.sign(data, SECRET_TOKEN, { expiresIn: '1h' });
    return res.status(200).json({
      message: 'Admin login successfully',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
