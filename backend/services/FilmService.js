const FilmRepositorie = require("../repositories/FilmRepositorie");

class FilmService {

    static async film({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photoFilm, genre, actors }) {
        const filmId = await FilmRepositorie.createFilm({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, photoFilm, seeFilm});
        const genreIds = Array.isArray(genre) ? genre : [genre]; // Обработка массива жанров
        for (const genreId of genreIds) {
            await FilmRepositorie.createFilmGenre({ filmId, genreId }); // Создание связи между фильмом и жанром
        }
        const actorIds = await FilmService.createActors(actors);
        console.log("Service", actorIds)
        return { filmId, genreIds, actorIds };
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

    static async createActors(actors) {
        const actorIds = [];
        
        for (const actor of actors) {
          const actorId = await FilmRepositorie.createActor(actor);
          actorIds.push(actorId);
        }
      
        return actorIds;
    }
}

module.exports = FilmService;