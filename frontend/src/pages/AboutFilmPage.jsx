import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FilmContext } from "../context/FilmContext";
import ActorPopup from './ActorPopup';
import DirectorPopup from './DirectorPopup';
import { Link } from 'react-router-dom';


const AboutFilmPage = () => {
    const { id } = useParams();
    const { data, getGenresForFilm, getActorsForFilm, getDirectorsForFilm } = useContext(FilmContext);
    const [genresData, setGenresData] = useState([]);
    const [actorsData, setActorsData] = useState([]);
    const [directorsData, setDirectorsData] = useState([]);
    const [film, setFilm] = useState(null);
    const [showActorPopup, setShowActorPopup] = useState(false);
    const [showDirectorPopup, setShowDirectorPopup] = useState(false);
    const [popupActor, setPopupActor] = useState(null); // Состояние для хранения данных актера для всплывающего окна
    const [popupPerson, setPopupPerson] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const filmData = data.find(item => item.id_film === parseInt(id));
            setFilm(filmData);

            try {
                const genres = await getGenresForFilm(id);
                const actors = await getActorsForFilm(id);
                const directors = await getDirectorsForFilm(id);
                setGenresData(genres);
                setActorsData(actors);
                setDirectorsData(directors);
            } catch (error) {
                console.error('Ошибка загрузки жанров:', error);
            }
        };

        fetchData();
    }, [id, data, getGenresForFilm, getActorsForFilm, getDirectorsForFilm]);
    
    const handleActorMouseEnter = (actor) => {
        setPopupActor(actor);
        setShowActorPopup(true);
    };
    
    const handlePersonMouseEnter = (person) => {
        setPopupPerson(person);
        setShowDirectorPopup(true);
    };

    const handleMouseLeave = () => {
        setShowActorPopup(false);
        setShowDirectorPopup(false);
    };


    if (!film) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
        <div className="film-info-container">
            <div className="buttons-container">
            <Link to="/">
                <button>Назад</button>
                </Link>
            </div>
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
                    <p><span className="important">Жанры:</span> {genresData && genresData.length > 0 ? genresData.map(genre => genre).join(', ') : 'Жанры отсутствуют'}</p>
                    <p>
                        <span className="important">Актеры:</span> {actorsData && actorsData.length > 0 ? actorsData.map(actor =>
                            <span key={actor.actor_id}
                                onMouseEnter={() => handleActorMouseEnter(actor)}
                                onMouseLeave={handleMouseLeave}
                                className="actor-name">{actor.actor_name}; </span>
                        ) : 'Актеры отсутствуют'}
                    </p>
                    <p>
                        <span className="important">Режиссеры:</span> 
                        {directorsData && directorsData.length > 0 ? directorsData.map(director => (
                            <span key={director.director_id}
                                onMouseEnter={() => handlePersonMouseEnter(director)}
                                onMouseLeave={handleMouseLeave}
                                className="director-name">
                                {director.director_name} - {director.director_role};{' '}
                            </span>
                        )) : 'Режиссеры отсутствуют'}
                    </p>
                </div>
            </div>
            {showActorPopup && <ActorPopup actor={popupActor} />}
            {showDirectorPopup && <DirectorPopup director={popupPerson} />}
        </div>
        </div>
    );
};

export default AboutFilmPage;
