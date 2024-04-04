import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FilmContext from "./context/FilmContext.jsx";

import MainPage from "./pages/MainPage";
import FilmPage from "./pages/FilmPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "film",
    element: <FilmPage />,
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