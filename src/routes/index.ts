import express, { Router } from 'express';
import adminRoutes from './admin';
import parentRoutes from './parent.route';

const appRoute: Router = express.Router();

/// admin
appRoute.use('/admin', adminRoutes);
/// child

/// parent
appRoute.use('/parent', parentRoutes);

export default appRoute;