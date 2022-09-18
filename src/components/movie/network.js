import { Router } from "express";
import * as Controller from "./controller";
import authentication from "../../middlewares/authentication.js";

const movieRouter = Router();

movieRouter.route("/").get(authentication, Controller.readAll);
movieRouter.route("/:id").get(authentication, Controller.readOne);
movieRouter.route("/movies?title=title").get(authentication, Controller.readOne);
movieRouter.route("/").post(authentication, Controller.create);
movieRouter.route("/:id").put(authentication, Controller.update);
movieRouter.route("/:id").delete(authentication, Controller.deleteOne);

export default movieRouter;