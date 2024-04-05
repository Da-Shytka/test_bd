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

  const handleFilm = (data) => {
    FilmClient.post("/films", data) 
    .then(() => {
      setIsFilm(true);
    })
    .catch((error) => {
      console.error(error);
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

  const handleGenreInfo = () => {
    FilmClient.get("/films")
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
          handleFilm
        }}
      >
        {children}
      </FilmContext.Provider>
  );
};

export default FilmProvider;