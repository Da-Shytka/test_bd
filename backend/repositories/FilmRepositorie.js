const pool = require('../dataBase');

class FilmRepositorie {
  static async createFilm({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm }) {
    const values = [nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm];
    // Заменяем пустые значения на null
    for (let i = 0; i < values.length; i++) {
      if (values[i] === '') {
        values[i] = null;
      }
    }
    const response = await pool.query("INSERT INTO film (name_film, year_film, country_film, viewing_date_film, rating_film, evaluation_film, duration_film, age_restriction_film, has_translation_film, see_Film) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_film",
      values);
    const filmId = response.rows[0].id_film;
    return filmId;
  }

  static async getFilmInfo() {
    const response = await pool.query("SELECT * FROM film WHERE see_film = true");
    return response.rows;
  }

  static async getGenreInfo() {
    const response = await pool.query("SELECT name FROM genre");
    return response.rows;
  }
  
  static async createFilmGenre({ filmId, genreId }) {
    const response = await pool.query(
      "INSERT INTO film_genre (id_film, id_genre) VALUES ($1, $2) ON CONFLICT (id_film, id_genre) DO NOTHING",
      [filmId, genreId]
  );
  return response.rows;
  }

}

module.exports = FilmRepositorie;






// const pool = require('../dataBase');

// class FilmRepositorie {
//   static async createFilm({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm }) {
//       const response = await pool.query("INSERT INTO film (name_film, year_film, country_film, viewing_date_film, rating_film, evaluation_film, duration_film, age_restriction_film, has_translation_film) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_film",
//         [nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm]);
//       return response.rows[0].id_film; // Возвращаем id созданной записи
//   }
// }

// module.exports = FilmRepositorie;