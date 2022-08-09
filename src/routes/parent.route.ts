import express, { Router } from 'express';
import ParentForgotPasswordController from '../controllers/parent/auth/forgot_password.controller';
import ParentLoginController from '../controllers/parent/auth/login.controller';
import ParentRegisterController from '../controllers/parent/auth/register.controller';
import ParentChildrenController from '../controllers/parent/children/parent_children.controller';
import ParentChildScheduleController from '../controllers/parent/children/schedule.controller';
import ParentProfileController from '../controllers/parent/profile/profile.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const parentRoutes: Router = express.Router();

/// Authentication Routes
parentRoutes.post('/auth/register', new ParentRegisterController().execute);
parentRoutes.post('/auth/register/verify', new ParentRegisterController().verify);
parentRoutes.post('/auth/login', new ParentLoginController().execute);
parentRoutes.post('/auth/forgot_password', new ParentForgotPasswordController().execute);
parentRoutes.post('/auth/forgot_password/verify', new ParentForgotPasswordController().verify);
parentRoutes.post('/auth/forgot_password/reset', new ParentForgotPasswordController().reset);


/// Profile Routes
parentRoutes.get('/profile', authenticateUser, new ParentProfileController().execute);
parentRoutes.post('/profile', authenticateUser, new ParentProfileController().update);
parentRoutes.post('/profile/password', authenticateUser, new ParentProfileController().updatePassword);
parentRoutes.delete('/profile', authenticateUser, new ParentProfileController().execute);


/// Children Routes
parentRoutes.get('/children', authenticateUser, new ParentChildrenController().children);
parentRoutes.post('/children', authenticateUser, new ParentChildrenController().addChild);
parentRoutes.delete('/children/:childId', authenticateUser, new ParentChildrenController().removeChild);
parentRoutes.post('/children/:childId', authenticateUser, new ParentChildrenController().updateChild);
parentRoutes.get('/children/:childId', authenticateUser, new ParentChildrenController().getChild);

parentRoutes.get('/children/:childId/schedule', authenticateUser, new ParentChildScheduleController().getSchedules);
parentRoutes.post('/children/:childId/schedule', authenticateUser, new ParentChildScheduleController().createSchedule);
parentRoutes.put('/children/:childId/schedule', authenticateUser, new ParentChildScheduleController().updateSchedule);
parentRoutes.put('/children/:childId/schedule/activate', authenticateUser, new ParentChildScheduleController().activateSchedule);
parentRoutes.put('/children/:childId/schedule/pause', authenticateUser, new ParentChildScheduleController().pauseSchedule);
parentRoutes.delete('/children/:childId/schedule', authenticateUser, new ParentChildScheduleController().deleteSchedule);


export default parentRoutes;