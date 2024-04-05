import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <h1>Коллекция фильмов</h1>
      <Link to="/viborFilm" key="viborFilm">
        <button>Выбрать фильм</button>
      </Link>
      <Link to="/collection" key="collection">
        <button>Моя коллекция фильмов</button>
      </Link>
    </>
  );
};

export default MainPage;
