import React, { useEffect, useContext } from 'react';
import { FilmContext } from "../context/FilmContext";
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { handleFilmInfoAll, data } = useContext(FilmContext);

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
      <button onClick={handleFilmInfoAll}>Обновить</button>
      <div>
        <table>
          <tbody>
            {data && data.length > 0 && data.map((item, index) => (
            <tr key={`${item.id_film}-${index}`}>
              <td>{item.name_film}</td>
              <td>{`Год: ${item.year_film}`}</td>
              <td>{`Страна: ${item.country_film}`}</td>
              <td>{`Дата просмотра: ${new Date(item.viewing_date_film).toLocaleDateString()}`}</td>
              <td>{`Рейтинг: ${item.rating_film}`}</td>
              <td>{`Оценка: ${item.evaluation_film}`}</td>
              <td>{`Продолжительность фильма: ${item.duration_film.hours} часа ${item.duration_film.minutes} минут`}</td>
              <td>{`Возрасное ограничение: ${item.age_restriction_film}`}</td>
              <td>{item.has_translation_film}</td>
              <td>{item.see_Film}</td>
              <td><img src={item.photo_film} alt={`Фото ${item.name_film}`} /></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainPage;
