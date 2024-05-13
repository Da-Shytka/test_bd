import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { FilmContext } from "../context/FilmContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const FilmPage = () => {
  // Состояния для хранения данных о фильме
  const [nameFilm, setNameFilm] = useState('');
  const [yearFilm, setYearFilm] = useState('');
  const [countryFilm, setCountryFilm] = useState('');
  const [viewingDateFilm, setViewingDateFilm] = useState('');
  const [ratingFilm, setRatingFilm] = useState('');
  const [evaluationFilm, setEvaluationFilm] = useState('');
  const [durationFilm, setDurationFilm] = useState('');
  const [ageRestrictionFilm, setAgeRestrictionFilm] = useState('');
  const [hasTranslationFilm, setHasTranslationFilm] = useState(false);
  const [seeFilm] = useState(true);
  const [photoFilm, setPhotoFilm] = useState('');

  // Хук для перехода на другую страницу
  const navigate = useNavigate();

  // Контекст для обмена данными о фильмах и жанрах
  const { handleFilm, handleGenreInfo, handleActorInfo, handleDirectorInfo, data } = useContext(FilmContext);
  
  // Хук для управления формой
  const { handleSubmit } = useForm();

  // Состояние для выбранных жанров
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Состояния для хранения данных об актерах
  const [actors, setActors] = useState([]);

  // Состояния для хранения данных об режиссерах
  const [directors, setDirectors] = useState([]);

  // Эффект для получения информации о жанрах
  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleGenreInfo();
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    fetchData();
  }, [handleGenreInfo]);

  // Эффект для получения информации об актерах (вызываем метод handleActorInfo при монтировании компонента)
  useEffect(() => {
    const fetchActorInfo = async () => {
      try {
        await handleActorInfo(); // Вызываем метод handleActorInfo
      } catch (error) {
        console.error('Ошибка при получении данных об актерах:', error);
      }
    };
    fetchActorInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

    // Эффект для получения информации об режиссерах (вызываем метод handleDirectorInfo при монтировании компонента)
    useEffect(() => {
      const fetchctorInfo = async () => {
        try {
          await handleDirectorInfo(); // Вызываем метод handleDirectorInfo
        } catch (error) {
          console.error('Ошибка при получении данных об режиссерах:', error);
        }
      };
      fetchctorInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

  // Функция для обновления выбранных жанров
  const handleGenreChange = (genre) => {
    const index = selectedGenres.indexOf(genre);
    if (index === -1) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      const updatedGenres = [...selectedGenres];
      updatedGenres.splice(index, 1);
      setSelectedGenres(updatedGenres);
    }
  };

   // Функция для добавления нового актера
   const addActor = () => {
    setActors([...actors, { name: '', year: '', link: '', photo: '' }]);
  };

  // Функция для добавления нового режиссера
  const addDirector = () => {
    setDirectors([...directors, { name: '', year: '', link: '', role: 'Режиссер', photo: '' }]);
  };

  // Функция для удаления актера по индексу
  const removeActor = (index) => {
    const updatedActors = [...actors];
    updatedActors.splice(index, 1);
    setActors(updatedActors);
  };

  // Функция для удаления режиссера по индексу
  const removeDirector = (index) => {
    const updatedDirectors = [...directors];
    updatedDirectors.splice(index, 1);
    setDirectors(updatedDirectors);
  };

  const onSubmit = async (event) => {
    // Проверяем, заполнены ли какие-либо поля
    if (!nameFilm && !yearFilm && !countryFilm && !viewingDateFilm && !ratingFilm && !evaluationFilm && !durationFilm && !ageRestrictionFilm && !photoFilm && selectedGenres.length === 0 && actors.length === 0 && directors.length === 0) {
      // Если ни одно поле не заполнено, просто переходим на другую страницу
      navigate(`/`);
      return; // Завершаем выполнение функции
    }
  
    // Создаем массив данных об актерах для отправки
    const actorsData = actors.map(actor => ({
      name: actor.name,
      year: actor.year,
      link: actor.link,
      photo: actor.photo
    }));
  
    // Создаем массив данных о режиссерах для отправки
    const directorsData = directors.map(director => ({
      name: director.name,
      year: director.year,
      link: director.link,
      role: director.role,
      photo: director.photo
    }));
  
    // Отправляем данные в базу
    await handleFilm({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photoFilm, actors: actorsData, directors: directorsData }, selectedGenres);
    navigate(`/`);
  };

  return (
    <>
    <div className="container">
      <h1>Добавление фильма</h1>
      <div className="buttons-container">
      <Link to="/">
          <button>Назад</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Название фильма:
          <input type="text" value={nameFilm} onChange={(e) => setNameFilm(e.target.value)} />
        </label>
        <label>
          Год выпуска:
          <input type="number" value={yearFilm} onChange={(e) => setYearFilm(e.target.value)} />
        </label>
        <label>
          Страна:
          <input type="text" value={countryFilm} onChange={(e) => setCountryFilm(e.target.value)} />
        </label>
        <label>
          Дата просмотра:
          <input type="date" value={viewingDateFilm} onChange={(e) => setViewingDateFilm(e.target.value)} />
        </label>
        <label>
          Рейтинг:
          <input type="number" value={ratingFilm} onChange={(e) => setRatingFilm(e.target.value)} />
        </label>
        <label>
          Оценка:
          <input type="number" value={evaluationFilm} onChange={(e) => setEvaluationFilm(e.target.value)} />
        </label>
        <label>
          Продолжительность:
          <input type="text" value={durationFilm} onChange={(e) => setDurationFilm(e.target.value)} />
        </label>
        <label>
          Возрастное ограничение:
          <input type="number" value={ageRestrictionFilm} onChange={(e) => setAgeRestrictionFilm(e.target.value)} />
        </label>
        <label>
          Ссылка на фото:
          <input type="photo" value={photoFilm} onChange={(e) => setPhotoFilm(e.target.value)} />

        </label>
        <label>
          Есть перевод:
          <input type="checkbox" checked={hasTranslationFilm} onChange={(e) => setHasTranslationFilm(e.target.checked)} />
        </label>
        <label>
          Жанры:
        </label>
        {data && data.map((item, index) => (
          <label key={`${item.name}-${index}`}>
            <input
              type="checkbox"
              value={item.name}
              checked={selectedGenres.includes(item.name)}
              onChange={() => handleGenreChange(item.name)}
            />
            {item.name}
          </label>
        ))}
        {actors.map((actor, index) => (
          <div key={index} className="person-card">
            <label>
              Фото актера:
              <input type="text" value={actor.photo} onChange={(e) => {
                const updatedActors = [...actors];
                updatedActors[index].photo = e.target.value;
                setActors(updatedActors);
              }} />
            </label>
            <label>
              Имя актера:
              <input type="text" value={actor.name} onChange={(e) => {
                const updatedActors = [...actors];
                updatedActors[index].name = e.target.value;
                setActors(updatedActors);
              }} />
            </label>
            <label>
              Дата рождения актера:
              <input type="date" value={actor.year} onChange={(e) => {
                const updatedActors = [...actors];
                updatedActors[index].year = e.target.value;
                setActors(updatedActors);
              }} />
            </label>
            <label>
              Ссылка для связи с ним:
              <input type="text" value={actor.link} onChange={(e) => {
                const updatedActors = [...actors];
                updatedActors[index].link = e.target.value;
                setActors(updatedActors);
              }} />
            </label>
            <div className="buttons-container">
              <button type="button" onClick={() => removeActor(index)}>Удалить</button>
            </div>
          </div>
        ))}
        {directors.map((director, index) => (
          <div key={index} className="person-card">
            <label>
              Фото:
              <input type="text" value={director.photo} onChange={(e) => {
                const updatedDirectors = [...directors];
                updatedDirectors[index].photo = e.target.value;
                setDirectors(updatedDirectors);
              }} />
            </label>
            <label>
              Имя:
              <input type="text" value={director.name} onChange={(e) => {
                const updatedDirectors = [...directors];
                updatedDirectors[index].name = e.target.value;
                setDirectors(updatedDirectors);
              }} />
            </label>
            <label>
              Дата рождения:
              <input type="date" value={director.year} onChange={(e) => {
                const updatedDirectors = [...directors];
                updatedDirectors[index].year = e.target.value;
                setDirectors(updatedDirectors);
              }} />
            </label>
            <label>
              Ссылка для связи с ним:
              <input type="text" value={director.link} onChange={(e) => {
                const updatedDirectors = [...directors];
                updatedDirectors[index].link = e.target.value;
                setDirectors(updatedDirectors);
              }} />
            </label>
            <label>
              Кто:
              <select value={director.role} onChange={(e) => {
                const updatedDirectors = [...directors];
                updatedDirectors[index].role = e.target.value;
                setDirectors(updatedDirectors);
              }}>
                <option value="Режиссер">Режиссер</option>
                <option value="Сценарий">Сценарий</option>
                <option value="Продюсер">Продюсер</option>
                <option value="Оператор">Оператор</option>
                <option value="Композитор">Композитор</option>
                <option value="Художник">Художник</option>
                <option value="Монтаж">Монтаж</option>
              </select>
            </label>
            <div className="buttons-container">
              <button type="button" onClick={() => removeDirector(index)}>Удалить</button>
            </div>
          </div>
        ))}
        <div className="buttons-container">
          <button type="button" onClick={addActor}>Добавить актера</button>
        </div>
        <div className="buttons-container">
          <button type="button" onClick={addDirector}>Добавить человека по фильму</button>
        </div>
        <div className="buttons-container">
          <button type="submit">Сохранить</button>
        </div>
        
      </form>
      </div>
    </>
  );
};

export default FilmPage;
