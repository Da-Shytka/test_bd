import React, { useEffect, useContext } from 'react';
import { FilmContext } from "../context/FilmContext";
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { handleFilmInfo, data } = useContext(FilmContext);

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


  return (
    <>
      <h1>Моя коллекция фильмов</h1>
      <Link to="/film">
        <button>Добавить фильм</button>
      </Link>

      <h1>Просмотренные фильмы:</h1>
      <button onClick={handleFilmInfo}>Обновить</button>
      <div className="table-container">
        <table className="modern-table">
          <tbody>
            {data && data.length > 0 && data.map((item, index) => (
              <tr key={`${item.id_film}-${index}`}>
              <td>{item.name_film}</td>
              <td>{`Год: ${item.year_film}`}</td>
              <td>{`Страна: ${item.country_film}`}</td>
              <td>{`Дата просмотра: ${new Date(item.viewing_date_film).toLocaleDateString()}`}</td>
              <td>{`Рейтинг: ${item.rating_film}`}</td>
              <td>{`Оценка: ${item.evaluation_film}`}</td>
              <td>{item.duration_film && `Продолжительность фильма: ${item.duration_film.hours} часов ${item.duration_film.minutes} минут`}</td>
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
