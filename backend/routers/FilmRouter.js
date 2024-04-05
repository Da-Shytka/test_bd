const { Router } = require("express");
const FilmController = require("../controllers/FilmController");

const router = Router();

router.post("/films", FilmController.film);
router.get("/collection", FilmController.getFilmInfo);
router.get("/genres", FilmController.getGenreInfo);
router.post("/film-genre", FilmController.filmGenre);

module.exports = router;