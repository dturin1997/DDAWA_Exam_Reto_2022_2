import { Router } from "express";
import * as Controller from "./controller";
import authentication from "../../middlewares/authentication.js";

const genreRouter = Router();

genreRouter.route("/").get(authentication, Controller.readAll);
genreRouter.route("/:id").get(authentication, Controller.readOne);
genreRouter.route("/").post(authentication, Controller.create);
genreRouter.route("/:id").put(authentication, Controller.update);
genreRouter.route("/:id").delete(authentication, Controller.deleteOne);

export default genreRouter;