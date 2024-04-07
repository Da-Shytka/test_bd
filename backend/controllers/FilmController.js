const FilmService = require("../services/FilmService");
const { ErrorUtils } = require("../utils/Errors");

class FilmController {
  static async film(req, res) {
    const { nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photos, genre } = req.body;
    try {
      const { filmId, genre: filmGenre } = await FilmService.film({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photos, genre });
      return res.status(200).send('Film details updated successfully.');
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
      // console.log(filmData);
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
      // console.log(filmData);
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

}

module.exports = FilmController;