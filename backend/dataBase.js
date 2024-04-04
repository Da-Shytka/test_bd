const pg = require("pg");

const pool = new pg.Pool({
    user: "postgres",
    password: "3693",
    host: "localhost",
    port: 5432,
    database: "catalogFilms",
});

module.exports = pool;