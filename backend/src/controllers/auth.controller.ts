import { Router } from "express";
import { login, signUp } from "./auth.service";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);

export default authRouter;
