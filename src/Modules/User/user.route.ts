import { Router } from "express";
import { UserController } from "./user.controller";


const UserRouter = Router();

UserRouter.get("/all", UserController.getAllUsers);
UserRouter.get('/getSingle/:email', UserController.getSingleUser);
UserRouter.patch('/update', UserController.updateUserStatus);
UserRouter.patch('/update/user', UserController.updateUserProfile);
UserRouter.patch('/update/password', UserController.updateUserPassword);

export default UserRouter