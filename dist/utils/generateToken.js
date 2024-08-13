"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    if (!process.env.SECRET_TOKEN) {
        throw new Error('SECRET_TOKEN is not defined');
    }
    return jsonwebtoken_1.default.sign({
        id: payload._id,
        role: payload.role,
    }, process.env.SECRET_TOKEN, {
        expiresIn: '2h',
    });
};
exports.generateToken = generateToken;
