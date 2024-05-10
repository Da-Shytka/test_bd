import React, { useEffect, useContext, useState } from 'react';
import { FilmContext } from "../context/FilmContext";

const MainPage = () => {
  const { getSelectedGenres, data, updateSelectedFilms } = useContext(FilmContext); // Извлекаем функцию updateSelectedFilms из контекста
  const [filteredFirstData, setFilteredFirstData] = useState([]);
  const [filteredSecondData, setFilteredSecondData] = useState([]);
  const [firstSearchTerm, setFirstSearchTerm] = useState("");
  const [secondSearchTerm, setSecondSearchTerm] = useState("");
  const [selectedFirstFilm, setSelectedFirstFilm] = useState(null); // Состояние для хранения выбранного первого фильма
  const [selectedSecondFilm, setSelectedSecondFilm] = useState(null); // Состояние для хранения выбранного второго фильма
  const [selectedFilms, setSelectedFilms] = useState([]);


  useEffect(() => {
    getSelectedGenres()
  }, []);

  const handleGenerateFilms = () => {
    // Фильтруем фильмы по выбранным жанрам
    setSelectedFilms(data); // Сохраняем отфильтрованные фильмы в состояние
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSelectedGenres();
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    fetchData();
  }, [getSelectedGenres]);

  useEffect(() => {
    if (!firstSearchTerm) {
      setFilteredFirstData(data);
    } else {
      const filtered = data.filter(item => item.name_film && item.name_film.toLowerCase().startsWith(firstSearchTerm.toLowerCase()));
      setFilteredFirstData(filtered);
    }
  }, [data, firstSearchTerm]);
  
  useEffect(() => {
    if (!secondSearchTerm) {
      setFilteredSecondData(data);
    } else {
      const filtered = data.filter(item => item.name_film && item.name_film.toLowerCase().startsWith(secondSearchTerm.toLowerCase()));
      setFilteredSecondData(filtered);
    }
  }, [data, secondSearchTerm]);

  const handleFirstInputChange = (event) => {
    setFirstSearchTerm(event.target.value);
  };

  const handleSecondInputChange = (event) => {
    setSecondSearchTerm(event.target.value);
  };

  const handleFilmSelect = (event) => {
    const selectedFilmName = event.target.value;
    const firstFilm = filteredFirstData.find(item => item.name_film === selectedFilmName);
    setSelectedFirstFilm(firstFilm);
    // Вызываем функцию updateSelectedFilms для обновления состояния выбранных фильмов
    updateSelectedFilms(firstFilm, selectedSecondFilm);
  };

  const handleSecondFilmSelect = (event) => {
    const selectedSecondFilmName = event.target.value;
    const secondFilm = filteredSecondData.find(item => item.name_film === selectedSecondFilmName);
    setSelectedSecondFilm(secondFilm);
    // Вызываем функцию updateSelectedFilms для обновления состояния выбранных фильмов
    updateSelectedFilms(selectedFirstFilm, secondFilm);
  };

  return (
    <>
      <h1>Выбор фильмов</h1>
      <div>
        <label>Выберите первый фильм:</label>
        <input
          type="text"
          list="films"
          placeholder="Выберите фильм"
          value={selectedFirstFilm ? selectedFirstFilm.name_film : firstSearchTerm}
          onChange={handleFirstInputChange}
          onBlur={handleFilmSelect} // Обработчик выбора первого фильма
        />
        <datalist id="films">
          {filteredFirstData.map((item, index) => (
            <option key={`${item.id_film}-${index}`} value={item.name_film} />
          ))}
        </datalist>
      </div>
      {selectedFirstFilm && ( // Показывать фотографию первого фильма только если выбран фильм
        <div>
          <h2>Первый фильм: {selectedFirstFilm.name_film}</h2>
          <img src={selectedFirstFilm.photo_film} alt={`Фото ${selectedFirstFilm.name_film}`} />
        </div>
      )}
      <div>
        <label>Выберите второй фильм:</label>
        <input
          type="text"
          list="secondFilms"
          placeholder="Выберите фильм"
          value={selectedSecondFilm ? selectedSecondFilm.name_film : secondSearchTerm}
          onChange={handleSecondInputChange}
          onBlur={handleSecondFilmSelect} // Обработчик выбора второго фильма
        />
        <datalist id="secondFilms">
          {filteredSecondData.map((item, index) => (
            <option key={`${item.id_film}-${index}`} value={item.name_film} />
          ))}
        </datalist>
      </div>
      {selectedSecondFilm && ( // Показывать фотографию второго фильма только если выбран фильм
        <div>
          <h2>Второй фильм: {selectedSecondFilm.name_film}</h2>
          <img src={selectedSecondFilm.photo_film} alt={`Фото ${selectedSecondFilm.name_film}`} />
        </div>
      )}
       <h1>Выбор фильмов</h1>
        <button onClick={handleGenerateFilms}>Сгенерировать</button>
        <h2>Сгенерированные фильмы:</h2>
        <ul>
          {selectedFilms.map((film, index) => (
            <li key={index}>{film.name_film}</li>
          ))}
        </ul>
    </>
  );
};

export default MainPage;
