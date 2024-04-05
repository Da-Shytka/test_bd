import React, { useEffect, useContext } from 'react';
import { FilmContext } from "../context/FilmContext";
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { handleFilmInfo, data } = useContext(FilmContext);
  // const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFilmInfo();
        // console.log(data)
        // setData(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <h1>Моя коллекция фильмов</h1>
      <Link to="/film" key="link3">
        <button>Добавить фильм</button>
      </Link>

      <h1>Просмотренные фильмы:</h1>
      <button onClick={handleFilmInfo}>Обновить</button>
      <div className="table-container">
        <table className="modern-table">
          <tbody>
            {data && data.length > 0 && data.map(item => (
              <tr key={item.id_film}>
                <td>{item.name_film}</td>
                <td>{item.year_film}</td>
                <td>{item.country_film}</td>
                <td>{new Date(item.viewing_date_film).toLocaleDateString()}</td>
                <td>{item.rating_film}</td>
                <td>{item.evaluation_film}</td>
                <td>{item.duration_film && `${item.duration_film.hours}:${item.duration_film.minutes}`}</td>
                <td>{item.age_restriction_film}</td>
                <td>{item.has_translation_film}</td>
                <td>{item.see_Film}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MainPage;
