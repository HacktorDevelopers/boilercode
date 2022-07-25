

import express, {Express, Request, Response, Router} from 'express';
import { Server } from 'socket.io';
import appRoute from './routes';
const expressFormidable = require('express-formidable');
const formData = require('express-form-data');
const http = require('http');

const app: Express = express();
const server = http.Server(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true,}));
app.use(formData.parse());

io.on("connection", (socket) => {
    console.log(`NewConnection: ${socket.id}`)
});


/// AppRoutes
app.use('/', appRoute)

server.listen(3000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:3000`);
})
