const pool = require('../dataBase');

class FilmRepositorie {
  static async createFilm({ nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photoFilm }) {
    const values = [nameFilm, yearFilm, countryFilm, viewingDateFilm, ratingFilm, evaluationFilm, durationFilm, ageRestrictionFilm, hasTranslationFilm, seeFilm, photoFilm ];
    // Заменяем пустые значения на null
    for (let i = 0; i < values.length; i++) {
      if (values[i] === '') {
        values[i] = null;
      }
    }
    const response = await pool.query("INSERT INTO film (name_film, year_film, country_film, viewing_date_film, rating_film, evaluation_film, duration_film, age_restriction_film, has_translation_film, see_Film, photo_film) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_film",
    values);
    const filmId = response.rows[0].id_film;
    return filmId;
  }

  static async getFilmInfo() {
    const response = await pool.query("SELECT * FROM film WHERE see_film = true");
    return response.rows;
  }

  static async getFilmInfoAll() {
    const response = await pool.query("SELECT * FROM film");
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

  static async createActor({ actor_photo, actor_name, actor_dob, actor_social_media }) {
    const values = [actor_photo, actor_name, actor_dob, actor_social_media];
    // Заменяем пустые значения на null
    for (let i = 0; i < values.length; i++) {
      if (values[i] === '') {
        values[i] = null;
      }
    }
    const response = await pool.query("INSERT INTO actor (actor_photo, actor_name, actor_dob, actor_social_media) VALUES ($1, $2, $3, $4) RETURNING actor_id",
      values);
    const actorId = response.rows[0].actor_id;
    return actorId;
  }

}

module.exports = FilmRepositorie;