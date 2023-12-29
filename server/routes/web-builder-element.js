const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  getCategories,
  createElement,
  getAllElements,
  updateElement,
  deleteElement
} = require("../controllers/webBuilderElement");

router.post("/categories", isAuthenticated, getCategories);
router.delete("/delete/:id", isAuthenticated, deleteElement);
router.post("/create", isAuthenticated, createElement);
router.put("/edit/:id", isAuthenticated, updateElement)
router.get("/elements", isAuthenticated, getAllElements);

module.exports = router;
