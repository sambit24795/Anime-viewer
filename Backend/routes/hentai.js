const express = require("express");
const hentaiController = require("../controllers/hentai");

const router = express.Router();

router.get("/popular", hentaiController.getPopularHentai);

module.exports = router;
