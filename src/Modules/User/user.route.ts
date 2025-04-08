import { Router } from "express";
import { UserController } from "./user.controller";


const UserRouter = Router();

UserRouter.get("/all", UserController.getAllUsers);
UserRouter.get('/getSingle/:email', UserController.getSingleUser)

export default UserRouter