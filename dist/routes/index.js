"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("./admin"));
const appRoute = express_1.default.Router();
/// admin
appRoute.use('/admin', admin_1.default);
/// child
/// parent
exports.default = appRoute;
