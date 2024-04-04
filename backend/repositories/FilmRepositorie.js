const pool = require('../dataBase');

class FilmRepositorie {
  static async createFilm({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm }) {
      const response = await pool.query("INSERT INTO film (name_film, year_film, country_film, viewing_date_film, rating_film, evaluation_film, duration_film, age_restriction_film, has_translation_film) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_film",
        [nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm]);
      return response.rows[0].id_film; // Возвращаем id созданной записи
  }
}

module.exports = FilmRepositorie;