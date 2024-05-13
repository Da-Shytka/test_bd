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
      firstFilmId: firstFilm ? firstFilm.id_film : null,
      secondFilmId: secondFilm ? secondFilm.id_film : null
    }));
  };
  
  const getSelectedGenres = async () => {
    const { firstFilmId, secondFilmId } = selectedFilms;
    if (!firstFilmId && !secondFilmId) return []; // Если фильмы не выбраны, ничего не делаем
  
    const params = {};
    if (firstFilmId) params.firstFilmId = firstFilmId;
    if (secondFilmId) params.secondFilmId = secondFilmId;
  
    try {
      const response = await FilmClient.get("/getSelectGenresForFilms", { params });
      const selectedGenres = response.data;
      setData(selectedGenres);
    } catch (error) {
      console.error("Ошибка при получении выбранных жанров:", error);
      // Дополнительная обработка ошибки здесь, если это необходимо
    }
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

  //Для получения жанров к фильму
  const getGenresForFilm = async (filmId) => {
    try {
        const response = await FilmClient.get(`/genres/${filmId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
  };

 // Для получения имен актеров к фильму
  const getActorsForFilm = async (filmId) => {
    try {
        const response = await FilmClient.get(`/actors/${filmId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
  };

   // Для получения людей по фильму
   const getDirectorsForFilm = async (filmId) => {
    try {
        const response = await FilmClient.get(`/directors/${filmId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
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
          getSelectedGenres,
          getGenresForFilm,
          getActorsForFilm, 
          getDirectorsForFilm,
        }}
      >
        {children}
      </FilmContext.Provider>
  );
};

export default FilmProvider;