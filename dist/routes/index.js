"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("./admin"));
const parent_route_1 = __importDefault(require("./parent.route"));
const appRoute = express_1.default.Router();
appRoute.get("/", (req, res) => {
    res.send("<h1>Welcome To For Family</h1>");
});
/// admin
appRoute.use('/admin', admin_1.default);
/// child
/// parent
appRoute.use('/parent', parent_route_1.default);
exports.default = appRoute;
