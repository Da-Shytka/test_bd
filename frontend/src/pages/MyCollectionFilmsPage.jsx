import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <h1>Моя коллекция фильмов</h1>
      <Link to="/film">
        <button>Добавить фильм</button>
      </Link>
    </>
  );
};

export default MainPage;