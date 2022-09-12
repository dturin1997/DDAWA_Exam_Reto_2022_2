import { Router } from "express";
import * as Controller from "./controller";

const authRouter = Router();

authRouter.route("/register").post(Controller.signup);
authRouter.route("/login").post(Controller.signin);

export default authRouter;
