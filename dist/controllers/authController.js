"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.addUser = void 0;
const authService_1 = require("../services/authService");
const asyncHandler_1 = __importDefault(require("../helper/asyncHandler"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const AppResponse_1 = __importDefault(require("../utils/AppResponse"));
const generateToken_1 = require("../utils/generateToken");
// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');
// const { validateUser } = require('../middleware/validate.middleware');
// const bcrypt = require('bcryptjs');
// const dotenv = require('dotenv');
// dotenv.config();
// const SECRET_TOKEN = process.env;
exports.addUser = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, phoneNumber, gender, email, password, role, isVerified, } = req.body;
    if (!firstName ||
        !lastName ||
        !phoneNumber ||
        !gender ||
        !email ||
        !password) {
        throw new AppError_1.default(400, 'Please provide all fields', []);
    }
    const existedUser = yield authService_1.AuthService.findByEmail(email);
    if (existedUser) {
        throw new AppError_1.default(409, 'User already exist', []);
    }
    const user = yield authService_1.AuthService.createNewUser({
        firstName,
        lastName,
        phoneNumber,
        gender,
        email,
        password,
        role,
        isVerified,
    });
    return res.json(new AppResponse_1.default(201, 'User registered successfully'));
}));
exports.userLogin = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new AppError_1.default(400, 'Please provide email and password');
    }
    const user = yield authService_1.AuthService.findByEmail(email);
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    // if (!user.isVerified) {
    //   throw new ApiError(401, 'User not verified');
    // }
    const isMatch = yield authService_1.AuthService.comparePassword(password, user.password);
    if (!isMatch) {
        throw new AppError_1.default(401, 'Invalid credentials');
    }
    const token = (0, generateToken_1.generateToken)(user);
    return res.json(new AppResponse_1.default(200, 'Login successfully', token));
}));
