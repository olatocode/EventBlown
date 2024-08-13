"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// require dependencies
const jwt = require('jsonwebtoken');
require('dotenv').config();
//  authenticating  admin
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let authenticationArr = req.headers.authorization.split(' ');
        if (!authenticationArr.includes('Bearer')) {
            return res.status(401).json({
                message: 'Bearer is required',
            });
        }
        let token = authenticationArr[1];
        if (!token) {
            return res.status(401).json({
                message: 'Token is required',
            });
        }
        const decryptToken = yield jwt.verify(token, process.env.SECRET_TOKEN, {
            expiresIn: '2h',
        });
        req.user = decryptToken;
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
//  authorizing
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user.role == 'Admin') {
            next();
        }
        else {
            return res.status(401).json({
                message: 'User does not have access to this resource',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
//    exporting modules
module.exports = { authenticate, authorize };
