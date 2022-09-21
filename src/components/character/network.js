import { Router } from "express";
import * as Controller from "./controller";
import authentication from "../../middlewares/authentication.js";

const characterRouter = Router();


characterRouter.get("/", authentication, Controller.readAll);
characterRouter.route("/:id").get(authentication, Controller.readOne);
characterRouter.route("/").post(authentication, Controller.create);
characterRouter.route("/:id").put(authentication, Controller.update);
characterRouter.route("/:id").delete(authentication, Controller.deleteOne);

export default characterRouter;