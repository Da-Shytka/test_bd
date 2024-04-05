import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { FilmContext } from "../context/FilmContext";
import { useNavigate } from "react-router-dom";

const FilmPage = () => {
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

  const navigate = useNavigate();
  const { handleFilm } = useContext(FilmContext);
  const { handleSubmit } = useForm();
  const onSubmit = async (event) => {
    await handleFilm({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm });
    navigate(`/`);
    //console.log( nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm );
    //console.log('Данные для сохранения:', { nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm });
  };


  const [selectedGenres, setSelectedGenres] = useState([]);
  const { handleGenreInfo, data } = useContext(FilmContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleGenreInfo();
        // console.log(data)
        // setData(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);


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


  return (
    <>
      <h1>Фильм</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Название фильма:
          <input type="text" value={nameFilm} onChange={(e) => setNameFilm(e.target.value)} />
        </label>
        <br />
        <label>
          Год выпуска:
          <input type="number" value={yearFilm} onChange={(e) => setYearFilm(e.target.value)} />
        </label>
        <br />
        <label>
          Страна:
          <input type="text" value={countryFilm} onChange={(e) => setCountryFilm(e.target.value)} />
        </label>
        <br />
        <label>
          Дата просмотра:
          <input type="date" value={viewingDateFilm} onChange={(e) => setViewingDateFilm(e.target.value)} />
        </label>
        <br />
        <label>
          Рейтинг:
          <input type="number" value={ratingFilm} onChange={(e) => setRatingFilm(e.target.value)} />
        </label>
        <br />
        <label>
          Оценка:
          <input type="number" value={evaluationFilm} onChange={(e) => setEvaluationFilm(e.target.value)} />
        </label>
        <br />
        <label>
          Продолжительность:
          <input type="text" value={durationFilm} onChange={(e) => setDurationFilm(e.target.value)} />
        </label>
        <br />
        <label>
          Возрастное ограничение:
          <input type="number" value={ageRestrictionFilm} onChange={(e) => setAgeRestrictionFilm(e.target.value)} />
        </label>
        <br />
        <label>
          Есть перевод:
          <input type="checkbox" checked={hasTranslationFilm} onChange={(e) => setHasTranslationFilm(e.target.checked)} />
        </label>
        <br />
        <label>
          Жанры:
        </label>
        <br />
        {data && data.map(item => (
          <label key={item.name}>
            <input
              type="checkbox"
              value={item.name}
              checked={selectedGenres.includes(item.name)}
              onChange={() => handleGenreChange(item.name)}
            />
            {item.name}
          </label>
        ))}
        <br />
        <button type="submit">Сохранить</button>
      </form>
      
    </>
  );
};


export default FilmPage;
