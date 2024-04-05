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
  const [isFilm, setIsFilm] = useState(false);

  const handleFilm = (filmData, genreData) => {
    FilmClient.post("/films", filmData)
      .then((response) => {
        const idFilm = response.data.idFilm;
        console.log("idFilm:", idFilm);
        console.log("filmData:", filmData);
        // Получить idFilm из ответа сервера
        // const idFilm = data.idFilm; // Проверяем, как извлекается idFilm
        // console.log("idFilm:", idFilm); // Проверяем idFilm
        // Отправить запрос для обновления связей между фильмом и жанрами
        // FilmClient.post("/film-genre", { idFilm, genre: genreData })
        FilmClient.post("/film-genre", { idFilm, genre: genreData })
          .then(() => {
            setIsFilm(true);
            console.log("Жанры успешно добавлены к фильму");
          })
          .catch((error) => {
            console.error("Ошибка при добавлении жанров к фильму:", error);
          });
      })
      .catch((error) => {
        console.error("Ошибка при добавлении фильма:", error);
    });
  };
  // const handleFilm = (data) => {
  //   console.log("Данные о фильме:", data);
  //   FilmClient.post("/films", data) 
  //   .then(() => {
  //     setIsFilm(true);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // };

  const handleFilmInfo = () => {
    FilmClient.get("/collection")
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

  return (
      <FilmContext.Provider
        value={{
          data,
          isFilm,
          handleFilmInfo,
          handleGenreInfo,
          handleFilm,
        }}
      >
        {children}
      </FilmContext.Provider>
  );
};

export default FilmProvider;