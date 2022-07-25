

import express, {Express, Request, Response, Router} from 'express';
import appRoute from './routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/// AppRoutes
app.use('/', appRoute)

app.listen(3000, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:3000`);
})
