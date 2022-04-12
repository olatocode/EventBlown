/** @format */

const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { validateUser } = require('../middleware/validate.middleware');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const { SECRET_TOKEN } = process.env;

exports.addUser = async (req, res, next) => {
  try {
    const { userName, phoneNumber, gender, email, password } = req.body;
    await validateUser.validateAsync(req.body);

    let emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(401).json({
        message:
          'Email already exist, Please login or create a new account with a new email',
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser_Created = await User.create({
      userName,
      phoneNumber,
      gender,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      newUser_Created,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email });
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
      message: 'User login successfully',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
