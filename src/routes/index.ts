import express, { Router } from 'express';
import adminRoutes from './admin';
import parentRoutes from './parent.route';

const appRoute: Router = express.Router();

appRoute.get("/", (req, res) => {
    res.send("<h1>Welcome To For Family</h1>")
})

/// admin
appRoute.use('/admin', adminRoutes);
/// child

/// parent
appRoute.use('/parent', parentRoutes);

export default appRoute;