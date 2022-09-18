import { Router } from "express";
import * as Controller from "./controller";

const characterOnMovieRouter = Router();

characterOnMovieRouter.route("/").get(Controller.readAll);
//characterOnMovieRouter.route("/:id").get(Controller.readOne);
characterOnMovieRouter.route("/").post(Controller.create);
/* characterOnMovieRouter.route("/:id").put(Controller.update);
characterOnMovieRouter.route("/:id").delete(Controller.deleteOne); */

export default characterOnMovieRouter;