import { Router } from "express";
import * as Controller from "./controller";

const characterRouter = Router();

characterRouter.route("/").get(Controller.readAll);
characterRouter.route("/:id").get(Controller.readOne);
characterRouter.route("/").post(Controller.create);
characterRouter.route("/:id").put(Controller.update);
characterRouter.route("/:id").delete(Controller.deleteOne);

export default characterRouter;