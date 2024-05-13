import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FilmContext } from "../context/FilmContext";

const AboutFilmPage = () => {
    const { id } = useParams();
    const { data, getGenresForFilm, getActorsForFilm } = useContext(FilmContext);
    const [genresData, setGenresData] = useState([]);
    const [actorsData, setActorsData] = useState([]);
    const [film, setFilm] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const filmData = data.find(item => item.id_film === parseInt(id));
            setFilm(filmData);

            try {
                const genres = await getGenresForFilm(id);
                const actors = await getActorsForFilm(id);
                setGenresData(genres);
                setActorsData(actors);
            } catch (error) {
                console.error('Ошибка загрузки жанров:', error);
            }
        };

        fetchData();
    }, [id, data, getGenresForFilm, getActorsForFilm]);
    
    if (!film) {
        return <div>Loading...</div>;
    }

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
                    <p><span className="important">Жанры:</span> {genresData.length > 0 ? genresData.map(genre => genre).join(', ') : 'Жанры отсутствуют'}</p>
                    <p><span className="important">Актеры:</span> {actorsData.length > 0 ? actorsData.map(actor => actor).join(', ') : 'Актеры отсутствуют'}</p>
                </div>
            </div>
        </div>
    );
};

export default AboutFilmPage;
