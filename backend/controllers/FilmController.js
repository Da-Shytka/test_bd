const FilmService = require("../services/FilmService");
const { ErrorUtils } = require("../utils/Errors");


class FilmController {
  static async film (req, res) {
    const { nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm } = req.body;
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

      await FilmService.film ({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm });
      return res.status(200).send('User details updated successfully.');
    } catch (err) {
      // console.error(err);
      return ErrorUtils.catchError(res, err);
    }
  }
}

module.exports = FilmController;