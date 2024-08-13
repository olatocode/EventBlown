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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
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
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        next();
    });
});
const userModel = mongoose_1.default.model('User', userSchema);
exports.default = userModel;
