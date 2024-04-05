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
    has_translation_film BOOLEAN
);
DROP TABLE IF EXISTS film;
SELECT * FROM film;





