const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  getCategories,
  createElement,
  getAllElements,
} = require("../controllers/webBuilderElement");

router.post("/categories", isAuthenticated, getCategories);
router.post("/create", isAuthenticated, createElement);
router.get("/elements", isAuthenticated, getAllElements);

module.exports = router;
