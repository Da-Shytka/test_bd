const FilmRepositorie = require("../repositories/FilmRepositorie");

class FilmService {

    static async film({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photoFilm, genre, actors, directors }) {
        const actorIdsStart = await FilmRepositorie.getActorInfo();
        const filmId = await FilmRepositorie.createFilm({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, photoFilm, seeFilm});
        await FilmRepositorie.createActor(actors);
        await FilmRepositorie.createDirector(directors);
        const actorIdsDifference = await FilmRepositorie.getActorInfo(); // Получаем массив идентификаторов актеров
        const actorIds = actorIdsDifference.filter(id => !actorIdsStart.includes(id));
        for (const actorId of actorIds) {
            await FilmRepositorie.createFilmActor({ filmId, actorId });
        }
        const genreIds = Array.isArray(genre) ? genre : [genre]; // Обработка массива жанров
        for (const genreId of genreIds) {
            await FilmRepositorie.createFilmGenre({ filmId, genreId }); // Создание связи между фильмом и жанром
        }
        
        return { filmId, genreIds, actors, directors, actorIds };
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
}

module.exports = FilmService;