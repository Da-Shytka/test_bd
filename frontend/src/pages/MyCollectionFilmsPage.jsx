import React, { useEffect, useContext, useState } from 'react';
import { FilmContext } from "../context/FilmContext";
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { handleFilmInfo, data } = useContext(FilmContext);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFilmInfo();
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [handleFilmInfo]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
    <div className="container">
      <h1>История просмотров</h1>
      <div className="buttons-container">
        <Link to="/film">
          <button>Добавить фильм</button>
        </Link>
      </div>
      <input
        type="text"
        placeholder="Поиск фильма"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <div className="table-container">
        <table className="modern-table">
          <tbody>
            {data && data.length > 0 && data
              .filter(item => 
                item.name_film.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item, index) => (
                <tr key={`${item.id_film}-${index}`}>
                  <td>
                    <tr>
                      <Link to={`/film/${item.id_film}`}>
                        <img src={item.photo_film} alt={`Фото ${item.name_film}`} />
                      </Link>
                    </tr>
                  </td>
                  <td>
                   <tr>
                      <Link to={`/film/${item.id_film}`}>
                        <h2>{`${item.name_film}, ${item.age_restriction_film}+`}</h2>
                      </Link>
                    </tr>
                    <tr>{`${item.country_film}, ${item.year_film}`}</tr>
                    <tr>{`Просмотрено: ${new Date(item.viewing_date_film).toLocaleDateString()}`}</tr>
                    <tr>{`Длительность: ${item.duration_film && `${item.duration_film.hours} часов ${item.duration_film.minutes} минут`}`}</tr>
                    <tr>{`Рейтинг: ${item.rating_film}`}</tr>
                    <tr>{`Оценка: ${item.evaluation_film}`}</tr>
                  </td>
                  <td>
                    <tr>{`ЖАНРЫ`}</tr>
                    <tr>{`КРАТКОЕ ОПИСАНИЕ`}</tr>
                  </td>
                  <td>
                    <tr>{`АКТЕРЫ`}</tr>
                    <tr>{`РЕЖИССЕРЫ, СЦЕНАРИСТЫ`}</tr>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default MainPage;
