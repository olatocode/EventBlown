"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize, json } = winston_1.format;
// Define your custom format
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston_1.transports.Console({
            format: combine(colorize(), myFormat)
        }),
        new winston_1.transports.File({ filename: 'app.log' })
    ],
});
exports.default = logger;
