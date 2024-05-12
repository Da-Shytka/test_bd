import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FilmContext } from "../context/FilmContext";

const AboutFilmPage = () => {
    const { id } = useParams();
    const { data } = useContext(FilmContext);
    const film = data.find(item => item.id_film === parseInt(id));

     return (
        <table>
        <tbody>
            <tr>
                <td>{film.name_film}</td>
                <td><img src={film.photo_film} alt={`Фото ${film.name_film}`} /></td>
                <td>{`Год: ${film.year_film}`}</td>
                <td>{`Страна: ${film.country_film}`}</td>
                <td>{`Дата просмотра: ${new Date(film.viewing_date_film).toLocaleDateString()}`}</td>
                <td>{`Рейтинг: ${film.rating_film}`}</td>
                <td>{`Оценка: ${film.evaluation_film}`}</td>
                <td>{film.duration_film && `Продолжительность фильма: ${film.duration_film.hours} часов ${film.duration_film.minutes} минут`}</td>
                <td>{`Возрасное ограничение: ${film.age_restriction_film}`}</td>
                <td>{film.has_translation_film}</td>
                <td>{film.see_Film}</td>
            </tr>
        </tbody>
    </table>
    );
};

export default AboutFilmPage;