"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("../routes/authRoute"));
const authRoute_2 = __importDefault(require("../routes/authRoute"));
const router = express_1.default.Router();
const routes = [{ router: authRoute_1.default }, { router: authRoute_2.default }];
routes.forEach((route) => {
    router.use(route.router);
});
exports.default = router;
