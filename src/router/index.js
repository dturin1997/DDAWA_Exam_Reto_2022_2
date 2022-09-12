import { TestRouter } from "../components";
import { AuthRouter } from "../components";

// cada vez que quiera agregar una ruta nueva,
// creo el path e importo el componente
const listRoutes = [["/test", TestRouter],["/auth",AuthRouter]];

export const routes = (app) => {
  listRoutes.forEach(([path, controller]) => {
    app.use(path, controller);
  });
};
