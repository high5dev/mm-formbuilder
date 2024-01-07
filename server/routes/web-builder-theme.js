const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createTheme,
  updateTheme,
  addThemeColor
} = require("../controllers/webBuilderTheme");

router.post("/create", isAuthenticated, createTheme);
router.put("/update/:id", isAuthenticated, updateTheme);
router.post("/add-color/:id", isAuthenticated, addThemeColor);

module.exports = router;
