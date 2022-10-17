import { Router } from "express";
import UserLoginController from "../controllers/user/auth/user.login.controller";
import UserRegistrationController from "../controllers/user/auth/user.registration.controller";

const userRoutes = Router();

userRoutes.post("/auth/register", UserRegistrationController.index)
userRoutes.post("/auth/login", UserLoginController.index)

export default userRoutes;