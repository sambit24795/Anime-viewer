const express = require("express");
const animeController = require("../controllers/anime");

const router = express.Router();

router.get("/ongoing", animeController.getOngoingAnimes);

router.get("/episode", animeController.getEpisode);

router.get("/popular", animeController.getPopularAnimes);

router.get("/search", animeController.getSearchedAnime);

module.exports = router;
