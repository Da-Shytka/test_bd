const FilmRepositorie = require("../repositories/FilmRepositorie");

class FilmService {
    static async film ({nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm }) {
        const { id_film } = await FilmRepositorie.createFilm ({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm });
        return id_film;
    }
}

module.exports = FilmService;