const profileController = require("../controllers/ProfileController");
const upload = require("../utils/multer");
const middlewareUpload = upload.single("file");
const router = require("express").Router();

router.get("/", profileController.profile);
router.patch("/", middlewareUpload, profileController.edit);

module.exports = router;
