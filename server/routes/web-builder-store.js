const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  getDatasetsByPage,
  updateDatasetsByPage,
  getCategoriesByPage,
  updateCategoryByPage
} = require("../controllers/webBuilderStore");

router.get("/dataset/:id", isAuthenticated, getDatasetsByPage);
router.post("/dataset/update/:id", isAuthenticated, updateDatasetsByPage)
router.get("/category/:id", isAuthenticated, getCategoriesByPage);
router.post("/category/update/:id", isAuthenticated, updateCategoryByPage);
module.exports = router;
