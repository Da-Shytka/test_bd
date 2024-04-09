import { createContext, useState } from "react";
import axios from "axios";
import config from "../config";

const FilmClient = axios.create({
  baseURL: `${config.API_URL}/films`,
  withCredentials: true,
});

export const FilmContext = createContext({});

const FilmProvider = ({ children }) => {
  const [data, setData] = useState();
  const [isFilm] = useState(false);

  const handleFilm = (filmData, genreData) => {
    
    FilmClient.post("/films", { ...filmData, genre: genreData })
      .then((response) => {
        console.log(filmData)
        console.log("Успешный ответ:", response);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении фильма:", error);
      });
  };

  const handleFilmInfo = () => {
    FilmClient.get("/collection")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFilmInfoAll = () => {
    FilmClient.get("/collectionAll")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleGenreInfo = () => {
    FilmClient.get("/genres")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleActorInfo = () => {
    FilmClient.get("/actors")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
      <FilmContext.Provider
        value={{
          data,
          isFilm,
          handleFilmInfo,
          handleGenreInfo,
          handleActorInfo,
          handleFilmInfoAll,
          handleFilm,
        }}
      >
        {children}
      </FilmContext.Provider>
  );
};

export default FilmProvider;