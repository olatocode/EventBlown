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
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
class AuthService {
    static createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_model_1.default({
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
                password: user.password,
                gender: user.gender,
                role: user.role,
                isVerified: user.isVerified,
            });
            return yield newUser.save();
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            return user;
        });
    }
    static comparePassword(plainPassword, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isMatch = yield bcryptjs_1.default.compare(plainPassword, hashedPassword);
            return isMatch;
        });
    }
}
exports.AuthService = AuthService;
