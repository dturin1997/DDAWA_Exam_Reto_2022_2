import { AuthRouter, GenreRouter, MovieRouter, TestRouter, CharacterRouter } from "../components";
import characterOnMovieRouter from "../components/characters-movies/network";


// cada vez que quiera agregar una ruta nueva,
// creo el path e importo el componente
const listRoutes = [["/test", TestRouter],["/auth",AuthRouter],["/character", CharacterRouter],
["/genre", GenreRouter],["/movie", MovieRouter], ["/characterOnMovies",characterOnMovieRouter]];

export const routes = (app) => {
  listRoutes.forEach(([path, controller]) => {
    app.use(path, controller);
  });
};
