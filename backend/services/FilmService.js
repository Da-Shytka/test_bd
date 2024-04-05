const FilmRepositorie = require("../repositories/FilmRepositorie");

class FilmService {
    // static async film ({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm }) {
    //     const filmId = await FilmRepositorie.createFilm ({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm });
    //     return filmId;
    // }
    static async film ({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm }) {
        const filmId = await FilmRepositorie.createFilm ({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm });
        return filmId;
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

    static async filmGenre({ filmId, genre }) { // Добавлено: filmId для указания конкретного фильма
        
        const genreIds = Array.isArray(genre) ? genre : [genre]; // Обработка массива жанров
        for (const genreId of genreIds) {
            // console.log(filmId)
            // console.log(genre)
            await FilmRepositorie.createFilmGenre({ filmId, genreId }); // Добавлено: Создание связи между фильмом и жанром
        }
        return filmId;
    }

}

module.exports = FilmService;