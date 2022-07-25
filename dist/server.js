"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const routes_1 = __importDefault(require("./routes"));
const chat_socket_1 = __importDefault(require("./routes/socket/chat.socket"));
const formData = require('express-form-data');
const http = require('http');
const app = (0, express_1.default)();
const server = http.Server(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, }));
app.use(formData.parse());
(0, chat_socket_1.default)(io);
/// AppRoutes
app.use('/', routes_1.default);
server.listen(3000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:3000`);
});
