import { Router } from "express";
import { AuthController } from "./auth.controller";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.createUser);
AuthRouter.post("/login", AuthController.login);

export default AuthRouter