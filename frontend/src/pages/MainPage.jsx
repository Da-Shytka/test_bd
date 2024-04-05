import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <h1>Коллекция фильмов</h1>
      <Link to="/viborFilm">
        <button>Выбрать фильм</button>
      </Link>
      <Link to="/collection">
        <button>Моя коллекция фильмов</button>
      </Link>
    </>
  );
};

export default MainPage;