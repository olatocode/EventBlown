/** @format */
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import asyncHandler from '../helper/asyncHandler';
import ApiError from '../utils/AppError';
import ApiResponse from '../utils/AppResponse';
import { generateToken } from '../utils/generateToken';
// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');
// const { validateUser } = require('../middleware/validate.middleware');
// const bcrypt = require('bcryptjs');
// const dotenv = require('dotenv');
// dotenv.config();

// const SECRET_TOKEN = process.env;

export const addUser = asyncHandler(
  async (req: Request, res: Response, next: Function) => {
    const {
      firstName,
      lastName,
      phoneNumber,
      gender,
      email,
      password,
      role,
      isVerified,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !gender ||
      !email ||
      !password
    ) {
      throw new ApiError(400, 'Please provide all fields', []);
    }

    const existedUser = await AuthService.findByEmail(email);
    if (existedUser) {
      throw new ApiError(409, 'User already exist', []);
    }
    const user = await AuthService.createNewUser({
      firstName,
      lastName,
      phoneNumber,
      gender,
      email,
      password,
      role,
      isVerified,
    });
    return res.json(
      new ApiResponse(201, 'User registered successfully')
    );
  }
);

export const userLogin = asyncHandler(
  async (req: Request, res: Response, next: Function) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, 'Please provide email and password');
    }

    const user = await AuthService.findByEmail(email);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // if (!user.isVerified) {
    //   throw new ApiError(401, 'User not verified');
    // }

    const isMatch = await AuthService.comparePassword(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = generateToken(user);
    return res.json(new ApiResponse(200, 'Login successfully', token));
  }
);
