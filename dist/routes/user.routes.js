"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_login_controller_1 = __importDefault(require("../controllers/user/auth/user.login.controller"));
const user_registration_controller_1 = __importDefault(require("../controllers/user/auth/user.registration.controller"));
const userRoutes = (0, express_1.Router)();
userRoutes.post("/auth/register", user_registration_controller_1.default.index);
userRoutes.post("/auth/login", user_login_controller_1.default.index);
exports.default = userRoutes;
