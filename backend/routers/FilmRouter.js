const { Router } = require("express");
const FilmController = require("../controllers/FilmController");

const router = Router();

router.post("/films", FilmController.film);
router.get("/collection", FilmController.getFilmInfo);
router.get("/collectionAll", FilmController.getFilmInfoAll);
router.get("/genres", FilmController.getGenreInfo);
router.get("/actors", FilmController.getActorInfo);
router.get("/directors", FilmController.getDirectorInfo);
router.get("/getSelectGenresForFilms", FilmController.getSelectGenresForFilms);
router.get("/genres/:filmId", FilmController.getGenresForFilm);
router.get("/actors/:filmId", FilmController.getActorsForFilm);
router.get("/directors/:filmId", FilmController.getDirectorsForFilm);


module.exports = router;