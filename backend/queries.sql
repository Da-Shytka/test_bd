-- таблица фильмов
CREATE TABLE film (
    id_film SERIAL PRIMARY KEY,
    name_film VARCHAR(255) NOT NULL,
    year_film INTEGER NOT NULL,
    country_film VARCHAR(100),
    viewing_date_film DATE,
    rating_film DECIMAL(3, 1),
    evaluation_film INTEGER,
    duration_film INTERVAL,
    age_restriction_film INTEGER,
    has_translation_film BOOLEAN,
    see_film BOOLEAN,
    photo_film VARCHAR(255)
);
INSERT INTO film (name_film, year_film, country_film, viewing_date_film, rating_film, evaluation_film, duration_film, age_restriction_film, has_translation_film, see_film, photo_film) VALUES 
('Побег из Шоушенка', 1994, 'США', '2024-04-16', 9.3, 4, '02:22:00', 16, true, true, 'f'),
('Крестный отец', 1972, 'США', '2024-04-17', 9.2, 5, '02:55:00', 16, true, false, 'f'),
('Темный рыцарь', 2008, 'США', '2024-04-17', 9.0, 4, '02:32:00', 14, true, false, 'f'),
('Форрест Гамп', 1994, 'США', '2024-04-17', 8.8, 4, '02:22:00', 12, true, false, 'f'),
('Начало', 2010, 'США', '2024-04-17', 8.8, 5, '02:28:00', 14, true, true, 'f');
SELECT * FROM film;
DROP TABLE IF EXISTS film;


-- таблица жанров
CREATE TABLE genre (
    name VARCHAR(100) PRIMARY KEY,
    description TEXT
);
INSERT INTO genre (name, description) VALUES
    ('Фантастика', 'Жанр научной фантастики описывает вымышленные миры, технологии и события, которые не существуют в реальной жизни.'),
    ('Фэнтези', 'Фэнтези представляет вымышленные миры, существ и магию.'),
    ('Детектив', 'Жанр детектива подразумевает исследование и разгадку преступлений.'),
    ('Романтика', 'Романтические произведения описывают взаимоотношения между людьми, часто с фокусом на любви и страсти.'),
    ('Приключения', 'Жанр приключений обычно содержит динамичные сюжеты, полные опасности и неожиданных поворотов.'),
    ('Ужасы', 'Ужасы создают атмосферу страха и тревоги, часто включая элементы сверхъестественного или ужасающих ситуаций.');
SELECT * FROM genre;
DROP TABLE IF EXISTS genre;


-- таблица жанров и фильмов
CREATE TABLE film_genre (
    id SERIAL PRIMARY KEY,
    id_film INTEGER REFERENCES film(id_film),
    id_genre VARCHAR(100) REFERENCES genre(name),
    rating DECIMAL(3, 1),
    CONSTRAINT unique_film_genre UNIQUE (id_film, id_genre)
);
SELECT * FROM film_genre;
DROP TABLE IF EXISTS film_genre;


-- таблица актеров
CREATE TABLE actor (
    actor_id SERIAL PRIMARY KEY,
    actor_photo VARCHAR(255),
    actor_name VARCHAR(255),
    actor_dob DATE,
    actor_social_media VARCHAR(255)
);
SELECT * FROM actor;
DROP TABLE IF EXISTS actor;


-- таблица актеров и фильмов
CREATE TABLE film_actor (
    actor_id INTEGER REFERENCES actor(actor_id),
    film_id INTEGER REFERENCES film(id_film),
    actor_name_in_film VARCHAR(255),
    PRIMARY KEY (actor_id, film_id)
);
SELECT * FROM film_actor;
DROP TABLE IF EXISTS film_actor;


-- таблица режиссеров
CREATE TABLE director (
    director_id SERIAL PRIMARY KEY,
    director_photo VARCHAR(255),
    director_name VARCHAR(255),
    director_dob DATE,
    director_social_media VARCHAR(255),
    director_role VARCHAR(50)
);
SELECT * FROM director;
DROP TABLE IF EXISTS director;


-- таблица режиссеров и фильмов
CREATE TABLE film_director (
    film_id INTEGER REFERENCES film(id_film),
    director_id INTEGER REFERENCES director(director_id),
    role_director_in_film VARCHAR(100),
    PRIMARY KEY (director_id, film_id)
);
SELECT * FROM film_director;
DROP TABLE IF EXISTS film_director;


-- таблица жанров и режиссеров
CREATE TABLE genre_director (
    id_genre VARCHAR(100) REFERENCES genre(name),
    director_id INTEGER REFERENCES director(director_id),
    count_films_in_genre INTEGER,
    PRIMARY KEY (id_genre, director_id)
);
SELECT * FROM genre_director;
DROP TABLE IF EXISTS genre_director;