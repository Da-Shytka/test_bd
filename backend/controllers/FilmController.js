const FilmService = require("../services/FilmService");
const { ErrorUtils } = require("../utils/Errors");

class FilmController {
  static async film (req, res) {
    const { nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, genre } = req.body;
    try {
        const filmId = await FilmService.film ({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm });
        await FilmService.filmGenre({ filmId, genre}); // Передача filmId в filmGenre
        // console.log("filmId:", filmId); // Вывод filmId в консоль
        // console.log("genre: req.body.genre:", genre); // Вывод filmId в консоль
        return res.status(200).send('User details updated successfully.');
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

  static async filmGenre(req, res) {
    const { filmId, genre } = req.body; // Изменено: Получение идентификатора фильма и жанра из запроса
    try {
        await FilmService.filmGenre({ filmId, genre }); // Исправлено: Передача идентификатора фильма и жанра
        // console.log("genre:", genre); // Изменено: Вывод жанра в консоль
        // console.log("filmId:", filmId);
        return res.status(200).send('Film genre updated successfully.'); // Изменено: Сообщение об успешном обновлении
    } catch (err) {
        console.error(err);
        return ErrorUtils.catchError(res, err);
    }
  }


}

module.exports = FilmController;