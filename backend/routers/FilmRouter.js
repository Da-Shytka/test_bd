const { Router } = require("express");
const FilmController = require("../controllers/FilmController");

const router = Router();

router.post("/films", FilmController.film);
router.get("/collection", FilmController.getFilmInfo);
router.get("/collectionAll", FilmController.getFilmInfoAll);
router.get("/genres", FilmController.getGenreInfo);
router.get("/actors", FilmController.getActorInfo);

module.exports = router;