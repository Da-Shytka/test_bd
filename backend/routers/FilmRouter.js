const { Router } = require("express");
const FilmController = require("../controllers/FilmController");

const router = Router();

router.post("/films", FilmController.film);
router.get("/collection", FilmController.getFilmInfo);
router.get("/films", FilmController.getGenreInfo);

module.exports = router;