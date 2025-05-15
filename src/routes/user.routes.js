import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
const userRouter = Router();

userRouter.get("/", createUser);

export default userRouter;
