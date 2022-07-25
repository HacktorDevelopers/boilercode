"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = __importDefault(require("../controllers/admin/auth/login.controller"));
const adminRoutes = express_1.default.Router();
adminRoutes.post('/auth/login', new login_controller_1.default().execute);
exports.default = adminRoutes;
