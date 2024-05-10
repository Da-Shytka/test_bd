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
  const [selectedFilms, setSelectedFilms] = useState({
    firstFilm: null,
    secondFilm: null
  }); // Добавляем состояние для хранения выбранных фильмов

  const updateSelectedFilms = (firstFilm, secondFilm) => {
    setSelectedFilms(prevState => ({
      ...prevState,
      firstFilm: firstFilm ? firstFilm.id_film : null,
      secondFilm: secondFilm ? secondFilm.id_film : null
    }));
  };

  const getSelectedGenres = () => {
    const { firstFilm, secondFilm } = selectedFilms;
    if (!firstFilm && !secondFilm) return Promise.resolve([]); // Если фильмы не выбраны, ничего не делаем
  
    const params = {};
    if (firstFilm) params.firstFilmId = firstFilm;
    if (secondFilm) params.secondFilmId = secondFilm;

    return FilmClient.get("/getSelectGenresForFilms", { params })
      .then( async (response) => {
        const viborFilm = response.data;
        console.log("DDDD", viborFilm);
        setData(viborFilm);
        return viborFilm;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFilm = (filmData, genreData) => {
    FilmClient.post("/films", { ...filmData, genre: genreData })
      .then((response) => {
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

  const handleDirectorInfo = () => {
    FilmClient.get("/directors")
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
          selectedFilms, // Передаем выбранные фильмы через контекст
          handleFilmInfo,
          handleGenreInfo,
          handleActorInfo,
          handleDirectorInfo,
          handleFilmInfoAll,
          handleFilm,
          updateSelectedFilms, // Передаем функцию обновления выбранных фильмов через контекст
          getSelectedGenres
        }}
      >
        {children}
      </FilmContext.Provider>
  );
};

export default FilmProvider;