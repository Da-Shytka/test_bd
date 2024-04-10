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

  static async getActorInfo() {
    const response = await pool.query("SELECT actor_id FROM actor");
    const actorIds = response.rows.map(row => row.actor_id);
    return actorIds;
  }

  static async getDirectorInfo() {
    const response = await pool.query("SELECT director_id FROM director");
    const directorIds = response.rows.map(row => row.director_id);
    return directorIds;
  }
  
  static async createFilmGenre({ filmId, genreId }) {
    const response = await pool.query(
      "INSERT INTO film_genre (id_film, id_genre) VALUES ($1, $2) ON CONFLICT (id_film, id_genre) DO NOTHING",
      [filmId, genreId]
    );
    return response.rows;
  }

  static async createFilmActor({ filmId, actorId }) {
    const response = await pool.query(
      "INSERT INTO film_actor (actor_id, film_id) VALUES ($1, $2) ON CONFLICT (actor_id, film_id) DO NOTHING",
      [actorId, filmId]
    );
    return response.rows;
  }

  static async createFilmDirector({ filmId, directorId }) {
    const response = await pool.query(
      "INSERT INTO film_director (film_id, director_id) VALUES ($1, $2) ON CONFLICT (film_id, director_id) DO NOTHING",
      [filmId, directorId]
    );
    return response.rows;
  }

  static async createGenreDirector({ genreId, directorId }) {
    const response = await pool.query(
      "INSERT INTO genre_director (id_genre, director_id) VALUES ($1, $2) ON CONFLICT (id_genre, director_id) DO NOTHING",
      [genreId, directorId]
    );
    return response.rows;
  }

  static async createActor(actors) {
    const actorIds = []; // массив для хранения идентификаторов созданных актеров
    for (const actor of actors) {
      const { photo, name, year, link } = actor;
      const values = [photo, name, year, link];
      // Заменяем пустые значения на null
      for (let i = 0; i < values.length; i++) {
        if (values[i] === '') {
            values[i] = null;
        }
      }
      const response = await pool.query("INSERT INTO actor (actor_photo, actor_name, actor_dob, actor_social_media) VALUES ($1, $2, $3, $4) RETURNING actor_id", values);
      const actorId = response.rows[0].actor_id;
      actorIds.push(actorId); // добавляем идентификатор созданного актера в массив
    }
    return actorIds; // возвращаем массив идентификаторов созданных актеров
  }

  static async createDirector(directors) {
    const directorIds = []; // массив для хранения идентификаторов созданных актеров
    for (const director of directors) {
      const { photo, name, year, link } = director;
      const values = [photo, name, year, link];
      // Заменяем пустые значения на null
      for (let i = 0; i < values.length; i++) {
        if (values[i] === '') {
            values[i] = null;
        }
      }
      const response = await pool.query("INSERT INTO director (director_photo, director_name, director_dob, director_social_media) VALUES ($1, $2, $3, $4) RETURNING director_id", values);
      const directorId = response.rows[0].director_id;
      directorIds.push(directorId); // добавляем идентификатор созданного актера в массив
    }
    return directorIds; // возвращаем массив идентификаторов созданных актеров
  }
}

module.exports = FilmRepositorie;