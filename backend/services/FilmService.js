const FilmRepositorie = require("../repositories/FilmRepositorie");

class FilmService {
    static async film ({nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm }) {
        const { id_film } = await FilmRepositorie.createFilm ({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm });
        return id_film;
    }

    static async getFilmInfo() {
        const films = await FilmRepositorie.getFilmInfo();
        // console.log(films);
        return films;
    }

    static async getGenreInfo() {
        const genres = await FilmRepositorie.getGenreInfo();
        // console.log(films);
        return genres;
    }
}

module.exports = FilmService;