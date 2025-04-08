import { Router } from "express";
import { AuthController } from "./auth.controller";

const AuthRouter = Router();

AuthRouter.post("/signup", AuthController.createUser);

export default AuthRouter