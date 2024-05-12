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
    <>
      <h1>Коллекция фильмов</h1>
      <Link to="/viborFilm">
        <button>Выбрать фильм</button>
      </Link>
      <Link to="/collection">
        <button>Моя коллекция фильмов</button>
      </Link>

      <h1>Предложенные фильмы:</h1>
      <input
        type="text"
        placeholder="Поиск фильма"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <div>
        <table>
          <tbody>
            {data && data.length > 0 && data
              .filter(item => 
                item.name_film.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item, index) => (
                <tr key={`${item.id_film}-${index}`}>
                <td>
                  <Link to={`/film/${item.id_film}`}>
                    <img src={item.photo_film} alt={`Фото ${item.name_film}`} />
                  </Link>
                  <Link to={`/film/${item.id_film}`}>
                    <h3>{item.name_film}</h3>
                  </Link>
                </td>
              </tr> 
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainPage;
