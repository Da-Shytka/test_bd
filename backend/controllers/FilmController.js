const FilmService = require("../services/FilmService");
const { ErrorUtils } = require("../utils/Errors");


class FilmController {
  static async film (req, res) {
    const { nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm } = req.body;
    // console.log(req.body)

    try {
      // console.log("name_film:", nameFilm);
      // console.log("year_film:", yearFilm);
      // console.log("country_film:", countryFilm);
      // console.log("viewing_date_film:", viewingDateFilm);
      // console.log("rating_film:", ratingFilm);
      // console.log("evaluation_film:", evaluationFilm);
      // console.log("duration_film:", durationFilm);
      // console.log("age_restriction_film:", ageRestrictionFilm);
      // console.log("has_translation_film:", hasTranslationFilm);
      await FilmService.film ({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm });
      return res.status(200).send('User details updated successfully.');
    } catch (err) {
      // console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

  static async getFilmInfo(req, res) {
    try {
      const filmData = await FilmService.getFilmInfo();
      // console.log(filmData);
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
      // console.log(userData);
      if (!userData) {
        return res.sendStatus(404);
      }
      // console.log(userData);
      return res.json(userData);
    } catch (err) {
      console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }

}

module.exports = FilmController;