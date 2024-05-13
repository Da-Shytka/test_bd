const FilmService = require("../services/FilmService");
const { ErrorUtils } = require("../utils/Errors");

class FilmController {

  //Для получения данных о фильме
  static async film(req, res) {
    const { nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photoFilm, genre, actors, directors } = req.body;
    try {
      const { filmId, genre: filmGenre, actors: actorId, directors: directorId  } = await FilmService.film({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photoFilm, genre, actors, directors });
      return res.status(200).send('Film details updated successfully.');
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

  //Для получения жанров к фильму
  static async getGenresForFilm(req, res) { 
    try {
      const { filmId } = req.params;
      const userData = await FilmService.getGenresForFilm(filmId);
      if (!userData) {
        return res.sendStatus(404);
      }
      return res.json(userData);
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
}

  //Для получения актеров к фильму
  static async getActorsForFilm(req, res) { 
    try {
      const { filmId } = req.params;
      const userData = await FilmService.getActorsForFilm(filmId);
      if (!userData) {
        return res.sendStatus(404);
      }
      return res.json(userData);
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

    //Для получения людей по фильму
    static async getDirectorsForFilm(req, res) { 
      try {
        const { filmId } = req.params;
        const userData = await FilmService.getDirectorsForFilm(filmId);
        if (!userData) {
          return res.sendStatus(404);
        }
        return res.json(userData);
      } catch (err) {
        console.error(err);
        return ErrorUtils.catchError(res, err);
      }
    }
  
  static async getSelectGenresForFilms(req, res) {
    try {
      const { firstFilmId, secondFilmId } = req.query;
      const filmNames = await FilmService.getSelectGenresForFilms(firstFilmId, secondFilmId);
      if (!filmNames) {
        return res.sendStatus(404);
      }
      return res.json(filmNames);
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

  static async getGenresForFilms(req, res) {
    try {
      const userData = await FilmService.getGenresForFilms();
      if (!userData) {
        return res.sendStatus(404);
      }
      return res.json(userData);
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

  static async getFilmInfo(req, res) {
    try {
      const filmData = await FilmService.getFilmInfo();
      if (!filmData) {
        return res.sendStatus(404);
      }
      return res.json(filmData);
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

  static async getFilmInfoAll(req, res) {
    try {
      const filmData = await FilmService.getFilmInfoAll();
      if (!filmData) {
        return res.sendStatus(404);
      }
      return res.json(filmData);
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

  static async getGenreInfo(req, res) {
    try {
      const userData = await FilmService.getGenreInfo();
      if (!userData) {
        return res.sendStatus(404);
      }
      return res.json(userData);
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

  static async getActorInfo(req, res) {
    try {
      const userData = await FilmService.getActorInfo();
      if (!userData) {
        return res.sendStatus(404);
      }
      return res.json(userData);
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

  static async getDirectorInfo(req, res) {
    try {
      const userData = await FilmService.getDirectorInfo();
      if (!userData) {
        return res.sendStatus(404);
      }
      return res.json(userData);
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

}

module.exports = FilmController;