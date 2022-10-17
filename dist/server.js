"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
require("dotenv").config();
const formData = require('express-form-data');
const http = require('http');
const app = (0, express_1.default)();
const server = http.Server(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, }));
app.use(formData.parse());
// chatSocket(io);
app.get('/', (req, res) => {
    return res.send("<h1>P2P Wallet App</h1>");
});
/// AppRoutes
app.use("/", index_routes_1.default);
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
