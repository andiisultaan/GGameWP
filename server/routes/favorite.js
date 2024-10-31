const FavController = require("../controllers/FavController");
const router = require("express").Router();

router.get("/", FavController.read);
router.post("/:GameId", FavController.add);
router.delete("/:GameId", FavController.delete);

module.exports = router;
