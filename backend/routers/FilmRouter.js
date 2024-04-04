const { Router } = require("express");
const FilmController = require("../controllers/FilmController");

const router = Router();

router.post("/films", FilmController.film);

module.exports = router;