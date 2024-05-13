import React, { useEffect, useContext, useState } from 'react';
import { FilmContext } from "../context/FilmContext";
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { handleFilmInfo, data, getGenresForFilm, getActorsForFilm } = useContext(FilmContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [genresData, setGenresData] = useState({});
  const [actorsData, setActorsData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFilmInfo();
        // Получаем данные о жанрах для каждого фильма и сохраняем их
        const genresPromises = data.map(film => getGenresForFilm(film.id_film));
        const actorsPromises = data.map(film => getActorsForFilm(film.id_film));
        const genres = await Promise.all(genresPromises);
        const actors = await Promise.all(actorsPromises);
        setGenresData(genres);
        setActorsData(actors);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [handleFilmInfo, data, getGenresForFilm, getActorsForFilm]);

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
                    <tr>{genresData[index] && genresData[index].length > 0 ? genresData[index].map(genre => genre).join(', ') : ''}</tr>
                    <tr>{`Рейтинг: ${item.rating_film}`}</tr>
                  </td>
                  <td>
                    <tr>{`Просмотрено: ${new Date(item.viewing_date_film).toLocaleDateString()}`}</tr>
                    <tr>{`Длительность: ${item.duration_film && `${item.duration_film.hours} часов ${item.duration_film.minutes} минут`}`}</tr>
                    <tr>{`Оценка: ${item.evaluation_film}`}</tr>
                    {/* <tr>{`КРАТКОЕ ОПИСАНИЕ`}</tr> */}
                  </td>
                  <td>
                    <tr>{actorsData[index] && actorsData[index].length > 0 ? actorsData[index].map(actor => actor).join(', ') : ''}</tr>
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
