"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const forgot_password_controller_1 = __importDefault(require("../controllers/parent/auth/forgot_password.controller"));
const login_controller_1 = __importDefault(require("../controllers/parent/auth/login.controller"));
const register_controller_1 = __importDefault(require("../controllers/parent/auth/register.controller"));
const parent_children_controller_1 = __importDefault(require("../controllers/parent/children/parent_children.controller"));
const schedule_controller_1 = __importDefault(require("../controllers/parent/children/schedule.controller"));
const profile_controller_1 = __importDefault(require("../controllers/parent/profile/profile.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const parentRoutes = express_1.default.Router();
/// Authentication Routes
parentRoutes.post('/auth/register', new register_controller_1.default().execute);
parentRoutes.post('/auth/register/verify', new register_controller_1.default().verify);
parentRoutes.post('/auth/login', new login_controller_1.default().execute);
parentRoutes.post('/auth/forgot_password', new forgot_password_controller_1.default().execute);
parentRoutes.post('/auth/forgot_password/verify', new forgot_password_controller_1.default().verify);
parentRoutes.post('/auth/forgot_password/reset', new forgot_password_controller_1.default().reset);
/// Profile Routes
parentRoutes.get('/profile', auth_middleware_1.authenticateUser, new profile_controller_1.default().execute);
parentRoutes.post('/profile', auth_middleware_1.authenticateUser, new profile_controller_1.default().update);
parentRoutes.post('/profile/password', auth_middleware_1.authenticateUser, new profile_controller_1.default().updatePassword);
parentRoutes.delete('/profile', auth_middleware_1.authenticateUser, new profile_controller_1.default().execute);
/// Children Routes
parentRoutes.get('/children', auth_middleware_1.authenticateUser, new parent_children_controller_1.default().children);
parentRoutes.post('/children', auth_middleware_1.authenticateUser, new parent_children_controller_1.default().addChild);
parentRoutes.delete('/children/:childId', auth_middleware_1.authenticateUser, new parent_children_controller_1.default().removeChild);
parentRoutes.post('/children/:childId', auth_middleware_1.authenticateUser, new parent_children_controller_1.default().updateChild);
parentRoutes.get('/children/:childId', auth_middleware_1.authenticateUser, new parent_children_controller_1.default().getChild);
parentRoutes.get('/children/:childId/schedule', auth_middleware_1.authenticateUser, new schedule_controller_1.default().getSchedules);
parentRoutes.post('/children/:childId/schedule', auth_middleware_1.authenticateUser, new schedule_controller_1.default().createSchedule);
parentRoutes.put('/children/:childId/schedule', auth_middleware_1.authenticateUser, new schedule_controller_1.default().updateSchedule);
parentRoutes.put('/children/:childId/schedule/activate', auth_middleware_1.authenticateUser, new schedule_controller_1.default().activateSchedule);
parentRoutes.put('/children/:childId/schedule/pause', auth_middleware_1.authenticateUser, new schedule_controller_1.default().pauseSchedule);
parentRoutes.delete('/children/:childId/schedule', auth_middleware_1.authenticateUser, new schedule_controller_1.default().deleteSchedule);
exports.default = parentRoutes;
