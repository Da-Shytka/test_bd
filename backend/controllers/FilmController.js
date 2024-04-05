const FilmService = require("../services/FilmService");
const { ErrorUtils } = require("../utils/Errors");


class FilmController {
  static async film (req, res) {
    const { nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm } = req.body;
    // console.log(req.body)
    try {
      // console.log("name_film:", nameFilm);
      await FilmService.film ({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm });
      return res.status(200).send('User details updated successfully.');
    } catch (err) {
      console.error(err);
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
    const { genre } = req.body; // Добавлено: Получение idFilm из запроса
    console.log(req.body);
    try {
        console.log("genre:", genre); // Добавлено: Вывод idFilm в консоль
        await FilmService.filmGenre({ genre }); // Исправлено: Передача идентификатора фильма и жанра
        return res.status(200).send('Film genre updated successfully.'); // Изменено: Сообщение об успешном обновлении
    } catch (err) {
        console.error(err);
        return ErrorUtils.catchError(res, err);
    }
  }
}

module.exports = FilmController;