const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.get("/", gameController.games);
router.get("/:id", gameController.gamesDetail);

module.exports = router;
