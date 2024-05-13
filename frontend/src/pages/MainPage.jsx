import React, { useEffect, useContext, useState } from 'react';
import { FilmContext } from "../context/FilmContext";
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { handleFilmInfoAll, data } = useContext(FilmContext);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFilmInfoAll();
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [handleFilmInfoAll]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      <h1>КиноПоиск 2.0</h1>
      <div className="buttons-container">
        <Link to="/viborFilm">
          <button>Подбор фильма</button>
        </Link>
        <Link to="/collection">
          <button>Мои просмотры</button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Поиск фильма"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <div className="film-container">
      {data && data.length > 0 && data
        .filter(item => 
          item.name_film && item.name_film.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((item, index) => (
          <div className="film-item" key={`${item.id_film}-${index}`}>
            <Link to={`/film/${item.id_film}`}>
              <img src={item.photo_film} alt={`Фото ${item.name_film}`} />
            </Link>
            <Link to={`/film/${item.id_film}`}>
              <h2>{item.name_film}</h2>
              <h5>{item.year_film}, {item.country_film}</h5>
            </Link>
          </div> 
        ))}
      </div>
    </div>
  );
};

export default MainPage;
