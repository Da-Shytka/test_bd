import React, { useEffect, useContext, useState } from 'react';
import { FilmContext } from "../context/FilmContext";
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { handleFilmInfo, data, getGenresForFilm, getActorsForFilm, getDirectorsForFilm } = useContext(FilmContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [genresData, setGenresData] = useState({});
  const [actorsData, setActorsData] = useState({});
  const [directorsData, setDirectorsData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFilmInfo();
        // Получаем данные о жанрах для каждого фильма и сохраняем их
        const genresPromises = data.map(film => getGenresForFilm(film.id_film));
        const actorsPromises = data.map(film => getActorsForFilm(film.id_film));
        const directorsPromises = data.map(film => getDirectorsForFilm(film.id_film));
        const genres = await Promise.all(genresPromises);
        const actors = await Promise.all(actorsPromises);
        const directors = await Promise.all(directorsPromises);
        setGenresData(genres);
        setActorsData(actors);
        setDirectorsData(directors);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [handleFilmInfo, data, getGenresForFilm, getActorsForFilm, getDirectorsForFilm]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
    <div className="container">
      <h1>История просмотров</h1>
      <div className="buttons-container">
        <Link to="/">
          <button>Назад</button>
        </Link>
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
                <tr key={item.id_film}>
                  <td>
                    <Link to={`/film/${item.id_film}`}>
                      <img src={item.photo_film} alt={`Фото ${item.name_film}`} />
                    </Link>
                  </td>
                  <td>
                    <Link to={`/film/${item.id_film}`}>
                      <h2>{`${item.name_film}, ${item.age_restriction_film}+`}</h2>
                    </Link>
                    <div>{`${item.country_film}, ${item.year_film}`}</div>
                    <div>{genresData[index] && genresData[index].length > 0 ? genresData[index].join(', ') : ''}</div>
                    <div>{`Рейтинг: ${item.rating_film}`}</div>
                  </td>
                  <td>
                    <div>{`Просмотрено: ${new Date(item.viewing_date_film).toLocaleDateString()}`}</div>
                    <div>{`Длительность: ${item.duration_film && `${item.duration_film.hours} часов ${item.duration_film.minutes} минут`}`}</div>
                    <div>{`Оценка: ${item.evaluation_film}`}</div>
                  </td>
                  <td>
                  <div>
                    {actorsData[index] && actorsData[index].length > 0 ? (
                      <>
                        <div>Актеры:</div>
                        <div>{actorsData[index].join(', ')}</div>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                  <div>
                    {directorsData[index] && directorsData[index].length > 0 ? (
                      <>
                        <div>Команда по фильму:</div>
                        {directorsData[index].map(director => (
                          <div key={`${director.director_name}-${director.director_role}`}>
                            {director.director_role} - {director.director_name}
                          </div>
                        ))}
                      </>
                    ) : (
                      null
                    )}
                  </div>
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
