import express, { Router } from 'express';
import AdminLoginController from '../controllers/admin/auth/login.controller';

const adminRoutes: Router = express.Router();

adminRoutes.post('/auth/login', new AdminLoginController().execute);

export default adminRoutes;