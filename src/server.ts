

import express, {Express, Request, Response, Router} from 'express';
import { Server } from 'socket.io';
import appRouter from './routes/index.routes';
require("dotenv").config();
const formData = require('express-form-data');
const http = require('http');

const app: Express = express();
const server = http.Server(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true,}));
app.use(formData.parse());

// chatSocket(io);

app.get('/', (req: Request, res: Response) => {
    return res.send("<h1>P2P Wallet App</h1>");
})

/// AppRoutes
app.use("/", appRouter);

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
