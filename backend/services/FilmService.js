const FilmRepositorie = require("../repositories/FilmRepositorie");

class FilmService {

    static async film({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photoFilm, genre, actors, directors }) {
        const filmId = await FilmRepositorie.createFilm({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, photoFilm, seeFilm});
        const genreIds = Array.isArray(genre) ? genre : [genre]; // Обработка массива жанров
        for (const genreId of genreIds) {
            await FilmRepositorie.createFilmGenre({ filmId, genreId }); // Создание связи между фильмом и жанром
        }
        await FilmRepositorie.createActor(actors);
        await FilmRepositorie.createDirector(directors);
        console.log("Service actors", actors)
        console.log("Service directors", directors)
        return { filmId, genreIds, actors, directors };
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
}

module.exports = FilmService;