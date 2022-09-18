import { Router } from "express";
import * as Controller from "./controller";

const genreRouter = Router();

genreRouter.route("/").get(Controller.readAll);
genreRouter.route("/:id").get(Controller.readOne);
genreRouter.route("/").post(Controller.create);
genreRouter.route("/:id").put(Controller.update);
genreRouter.route("/:id").delete(Controller.deleteOne);

export default genreRouter;