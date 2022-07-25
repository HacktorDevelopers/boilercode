import express, { Router } from 'express';
import adminRoutes from './admin';

const appRoute: Router = express.Router();

/// admin
appRoute.use('/admin', adminRoutes);
/// child

/// parent

export default appRoute;