const FilmRepositorie = require("../repositories/FilmRepositorie");

class FilmService {

    static async film({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photoFilm, genre, actors, directors }) {
        
        const filmId = await FilmRepositorie.createFilm({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, photoFilm, seeFilm});

        const actorIdsStart = await FilmRepositorie.getActorInfo(); //Бд актеров до заполнения
        const directorIdsStart = await FilmRepositorie.getDirectorInfo(); //Бд журналистов до заполнения

        await FilmRepositorie.createActor(actors); //Бд актеров заполняется
        await FilmRepositorie.createDirector(directors); //Бд журналистов заполняется

        const actorIdsDifference = await FilmRepositorie.getActorInfo(); // Получаем массив идентификаторов актеров
        const actorIds = actorIdsDifference.filter(id => !actorIdsStart.includes(id));
        for (const actorId of actorIds) {
            await FilmRepositorie.createFilmActor({ filmId, actorId });
        }

        const directorIdsDifference = await FilmRepositorie.getDirectorInfo(); // Получаем массив идентификаторов журналистов
        const directorIds = directorIdsDifference.filter(id => !directorIdsStart.includes(id));
        for (const directorId of directorIds) {
            await FilmRepositorie.createFilmDirector({ filmId, directorId });
        }

        const genreIds = Array.isArray(genre) ? genre : [genre]; // Обработка массива жанров
        for (const genreId of genreIds) {
            await FilmRepositorie.createFilmGenre({ filmId, genreId }); // Создание связи между фильмом и жанром
            for (const directorId of directorIds) {
                await FilmRepositorie.createGenreDirector({ genreId, directorId });
            }
        }
        
        return { filmId, genreIds, actors, directors, actorIds, directorIds };
    }

    static async getGenresForFilms() {
        const selectedGenres = await FilmRepositorie.getGenresForFilms(firstFilmId, secondFilmId);
        return selectedGenres;
    }

    static async getSelectGenresForFilms (firstFilmId, secondFilmId) {
        const filmNames = await FilmRepositorie.getSelectGenresForFilms(firstFilmId, secondFilmId);
        return filmNames;
    }

    static async getFilmInfo() {
        const films = await FilmRepositorie.getFilmInfo();
        return films;
    }

    static async getFilmInfoAll() {
        const films = await FilmRepositorie.getFilmInfoAll();
        return films;
    }

    static async getGenreInfo() {
        const genres = await FilmRepositorie.getGenreInfo();
        return genres;
    }

    static async getActorInfo() {
        const actors = await FilmRepositorie.getActorInfo();
        return actors;
    }

    static async getDirectorInfo() {
        const directors = await FilmRepositorie.getDirectorInfo();
        return directors;
    }
}

module.exports = FilmService;