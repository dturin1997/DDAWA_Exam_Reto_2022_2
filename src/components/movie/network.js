import { Router } from "express";
import * as Controller from "./controller";

const movieRouter = Router();

movieRouter.route("/").get(Controller.readAll);
movieRouter.route("/:id").get(Controller.readOne);
movieRouter.route("/").post(Controller.create);
movieRouter.route("/:id").put(Controller.update);
movieRouter.route("/:id").delete(Controller.deleteOne);

export default movieRouter;