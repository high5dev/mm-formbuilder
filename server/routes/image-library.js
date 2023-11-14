const router = require("express").Router();

const { addImageLibrary, getUserImages, delImageFromLibrary } = require("../controllers/imageLibrary");
const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, addImageLibrary);
router.get("/",isAuthenticated,getUserImages);
router.delete("/:id", isAuthenticated, delImageFromLibrary);


module.exports = router;