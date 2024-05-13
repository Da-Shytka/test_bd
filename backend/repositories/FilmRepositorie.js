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

  static async getSelectGenresForFilms(firstFilmId, secondFilmId) {
     // Получаем список жанров для двух заданных фильмов
     const response = await pool.query(
       `WITH selected_genres AS (
           SELECT fg.id_genre
           FROM film_genre fg
           WHERE fg.id_film = $1 OR fg.id_film = $2
       ),
       film_genre_counts AS (
           SELECT f.id_film,
                  COUNT(DISTINCT fg.id_genre) AS genre_matches
           FROM film f
           JOIN film_genre fg ON f.id_film = fg.id_film
           WHERE f.id_film != $1 AND f.id_film != $2
                 AND fg.id_genre IN (SELECT * FROM selected_genres)
           GROUP BY f.id_film
       )
       SELECT f.id_film
       FROM film f
       JOIN film_genre_counts fgc ON f.id_film = fgc.id_film
       WHERE fgc.genre_matches = (
           SELECT MAX(genre_matches)
           FROM film_genre_counts
       )
       UNION
       SELECT f.id_film
       FROM film f
       JOIN film_genre_counts fgc ON f.id_film = fgc.id_film
       WHERE fgc.genre_matches = (
           SELECT MAX(genre_matches)
           FROM film_genre_counts
       )
       AND NOT EXISTS (
           SELECT 1
           FROM film_genre fg
           WHERE fg.id_film = f.id_film
                 AND fg.id_genre NOT IN (SELECT * FROM selected_genres)
       );`,
       [firstFilmId, secondFilmId]
     );
 
     // Преобразуем ответ в массив id_film фильма или фильмов
     const filmIds = response.rows.map(row => row.id_film);     
     
      // Формируем строку для подстановки в запрос
      const placeholders = filmIds.map((id, index) => `$${index + 1}`).join(', ');

      // Запрос на выборку названий фильмов по их ID
      const query = `
          SELECT name_film, photo_film
          FROM film
          WHERE id_film IN (${placeholders})
      `;

      // Выполняем запрос к базе данных
      const respo = await pool.query(query, filmIds);

      // Преобразуем ответ в массив названий фильмов
      const films = respo.rows.map(row => ({ name: row.name_film, photoUrl: row.photo_film }));
      return films;
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


   //Для получения жанров к фильму
  static async getGenresForFilmById(filmId) {
    try {
        const response = await pool.query(
            `SELECT id_genre FROM film_genre WHERE id_film = $1`,
            [filmId]
        );
        const genres = response.rows.map(row => row.id_genre);
        return genres;
    } catch (error) {
        console.error('Error retrieving genres for film:', error);
        throw error;
    }
  }

  // Для получения имен актеров к фильму
  static async getActorsForFilmById(filmId) {
    try {
      const response = await pool.query(
        `SELECT film_actor.actor_id, actor.actor_name
         FROM film_actor
         JOIN actor ON film_actor.actor_id = actor.actor_id
         WHERE film_actor.film_id = $1`,
        [filmId]
      );
      const actors = response.rows.map(row => (row.actor_name));
      return actors;
    } catch (error) {
      console.error('Error retrieving actors for film:', error);
      throw error;
    }
  }

    // Для получения людей по к фильму
    static async getDirectorsForFilmById(filmId) {
      try {
        const response = await pool.query(
          `SELECT director.director_name, director.director_role
           FROM director
           JOIN film_director ON director.director_id = film_director.director_id
           WHERE film_director.film_id = $1`,
          [filmId]
        );
        const directors = response.rows.map(row => ({
          director_name: row.director_name,
          director_role: row.director_role
        }));
        return directors;
      } catch (error) {
        console.error('Error retrieving directors for film:', error);
        throw error;
      }
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
      const { photo, name, year, link, role } = director;
      const values = [photo, name, year, link, role];
      // Заменяем пустые значения на null
      for (let i = 0; i < values.length; i++) {
        if (values[i] === '') {
            values[i] = null;
        }
      }
      const response = await pool.query(
        "INSERT INTO director (director_photo, director_name, director_dob, director_social_media, director_role) VALUES ($1, $2, $3, $4, $5) RETURNING director_id", values);
      const directorId = response.rows[0].director_id;
      directorIds.push(directorId); // добавляем идентификатор созданного актера в массив
    }
    return directorIds; // возвращаем массив идентификаторов созданных актеров
  }
}

module.exports = FilmRepositorie;