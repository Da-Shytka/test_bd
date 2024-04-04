import React, { useState } from 'react';
import { useContext } from "react";
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


  const navigate = useNavigate();
  const { handleSignUp } = useContext(FilmContext);
  const { handleSubmit } = useForm();

  const onSubmit = async (event) => {
    await handleSignUp({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm });
    //console.log( nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm );
    navigate(`/`);
    //console.log('Данные для сохранения:', { nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm });
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
        <button type="submit">Сохранить</button>
      </form>
    </>
  );
};


export default FilmPage;