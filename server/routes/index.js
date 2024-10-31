const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/google-login", AuthController.googleLogin);
router.post("/auth/discord/callback", AuthController.discordCallback);

router.use("/games", require("./game"));
router.use(authentication);
router.use("/fav", require("./favorite"));
router.use("/profile", require("./profile"));

router.use(errorHandler);

module.exports = router;
