import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FilmContext } from "../context/FilmContext";

const AboutFilmPage = () => {
    const { id } = useParams();
    const { data } = useContext(FilmContext);
    const film = data.find(item => item.id_film === parseInt(id));

    return (
        <div className="film-info-container">
            <h1>{film.name_film}</h1>
            <div className="film-details">
                <img src={film.photo_film} alt={`Фото ${film.name_film}`} />
                <div className="details">
                    <p><span className="important">Год:</span> {film.year_film}</p>
                    <p><span className="important">Страна:</span> {film.country_film}</p>
                    <p><span className="important">Дата просмотра:</span> {new Date(film.viewing_date_film).toLocaleDateString()}</p>
                    <p><span className="important">Рейтинг:</span> {film.rating_film}</p>
                    <p><span className="important">Оценка:</span> {film.evaluation_film}</p>
                    {film.duration_film && <p><span className="important">Продолжительность фильма:</span> {film.duration_film.hours} часов {film.duration_film.minutes} минут</p>}
                    <p><span className="important">Возрастное ограничение:</span> {film.age_restriction_film}</p>
                    <p><span className="important">Есть перевод:</span> {film.has_translation_film ? 'Да' : 'Нет'}</p>
                    <p><span className="important">Просмотрен:</span> {film.see_Film ? 'Да' : 'Нет'}</p>
                </div>
            </div>
        </div>
    );
};

export default AboutFilmPage;
