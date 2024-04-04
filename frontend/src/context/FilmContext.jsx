import { createContext, useState } from "react";
import axios from "axios";
import config from "../config";

const FilmClient = axios.create({
  baseURL: `${config.API_URL}/films`,
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json'
  // }
});

export const FilmContext = createContext({});

const FilmProvider = ({ children }) => {
  const [data] = useState();
  const [isFilm, setIsFilm] = useState(false);

  const handleSignUp = (data) => {
    FilmClient.post("/films", data) 
    .then(() => {
      setIsFilm(true);
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
          handleSignUp
        }}
      >
        {children}
      </FilmContext.Provider>
  );
};

export default FilmProvider;