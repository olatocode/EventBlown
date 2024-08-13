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
const cloudinary = require('cloudinary');
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinaryUploadMethod = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(file, (err, res) => {
            if (err)
                return res.status(500).send('upload file error');
            resolve({
                res: res.secure_url,
            });
        });
    });
});
module.exports = cloudinaryUploadMethod;
