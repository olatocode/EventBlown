"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const app_1 = require("./app");
const logger_1 = __importDefault(require("./utils/logger"));
const connect_MongoDB = require('./config/database/mongodb');
// Connect Database
connect_MongoDB;
const { PORT } = process.env;
app_1.app.listen(PORT, () => {
    logger_1.default.info(`EventBlown is running on port http://localhost:${PORT}`);
});
