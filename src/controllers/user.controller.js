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
    const emailExist = await User.find({ email });
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

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const secret_key = process.env.SECRET_TOKEN;
    const decodedToken = await jwt.verify(token, secret_key);
    const user = await User.findOne({ email: decodedToken.email }).select(
      'isVerified'
    );
    if (user.isVerified) {
      return res.status(400).json({
        message: 'user verified already',
      });
    }
    user.isVerified = true;
    user.save();
    return res.status(201).json({
      message: `Hi ${decodedToken.firstName}, Your account has been verified, You can now proceed to login`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};

exports.resendVerificationMail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExists = await User.findOne({ email });
    if (!emailExists) {
      return res.status(400).json({
        message: '  This email does not exist, pls sign up.',
      });
    }
    const data = {
      email: emailExists.email,
      firstName: emailExists.firstName,
    };
    console.log(data);
    // getting a secret token when login is successful.
    const secret_key = process.env.SECRET_TOKEN;
    const token = await jwt.sign(data, secret_key, { expiresIn: '900s' });
    let mailOptions = {
      to: emailExists.email,
      subject: 'Verify Email',
      text: `Hi ${emailExists.firstName}, Pls verify your account with the link below.`,
    };
    await sendMail(mailOptions);
    return res.status(200).json({
      message: `Hi ${emailExists.firstName}, Pls check your mail for verification link.`,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Please try again later.`,
    });
  }
};

exports.forgetPasswordLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userEmail = await User.findOne({ email });
    if (!userEmail) {
      res.status(404).json({
        message: `Email not found.`,
      });
    }
    const data = {
      id: userEmail._id,
      email: userEmail.email,
      role: userEmail.role,
    };
    // getting a secret token
    const secret_key = process.env.SECRET_TOKEN;
    const token = await jwt.sign(data, secret_key, { expiresIn: '900s' });
    let mailOptions = {
      to: userEmail.email,
      subject: 'Reset Password',
      text: `Hi ${userEmail.firstName}, Reset your password with the link below. Your reset token is ${token}`,
    };
    await sendMail(mailOptions);
    return res.status(200).json({
      message: `Hi ${userEmail.firstName}, Pls check your email for the reset password link.`,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${error.message}, Try again later.`,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email, token } = req.headers;
    const secret_key = process.env.SECRET_TOKEN;
    const decoded_token = await jwt.verify(token, secret_key);
    if (decoded_token.email !== email) {
      return res.status(400).json({
        message: `Email do not match.`,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: `Password do not match.`,
      });
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    const updatedPassword = await User.updateOne(
      { email },
      { password: hashPassword },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: `Password has been updated successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `${error.message}, Try agin later.`,
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { email } = req.query;

    const headerTokenEmail = await jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.SECRET_TOKEN
    ).email;
    const loggedUser = await User.findOne({ email });
    if (!loggedUser) {
      return res.status(403).json({
        message: `Forbidden`,
      });
    }
    if (headerTokenEmail !== loggedUser.email) {
      return res.status(403).json({
        message: `Forbidden`,
      });
    }
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      loggedUser.password
    );
    if (!passwordMatch) {
      return res.status(400).json({
        message: `Old Password is not correct`,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: `Password do not match.`,
      });
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    const resetPassword = await User.updateOne(
      { email },
      { password: hashPassword }
    );
    return res.status(200).json({
      message: `Password has been updated successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Please Try agin later.`,
    });
  }
};
