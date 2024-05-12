import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilmContext from "./context/FilmContext.jsx";

import MainPage from "./pages/MainPage";
import MyCollectionFilmsPage from "./pages/MyCollectionFilmsPage";
import FilmPage from "./pages/FilmPage";
import ViborFilm from "./pages/ViborFilm";
import AboutFilmPage from './pages/AboutFilmPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "collection",
    element: <MyCollectionFilmsPage />,
  },
  {
    path: "film",
    element: <FilmPage />,
  },
  {
    path: "viborFilm",
    element: <ViborFilm />,
  },
  {
    path: "/film/:id",
    element: <AboutFilmPage />,
  },
]);

function App() {
  return (
    <FilmContext>
      <RouterProvider router={router} />
    </FilmContext>
  );
}

export default App;